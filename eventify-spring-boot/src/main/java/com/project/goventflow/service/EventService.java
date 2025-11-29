package com.project.goventflow.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.goventflow.config.security.AuthDetails;
import com.project.goventflow.domain.dto.event.*;
import com.project.goventflow.domain.dto.event.comment.CommentCreationDto;
import com.project.goventflow.domain.dto.event.comment.CommentDto;
import com.project.goventflow.domain.dto.generate.EventGenerationParams;
import com.project.goventflow.domain.entity.Comment;
import com.project.goventflow.domain.entity.Event;
import com.project.goventflow.domain.entity.User;
import com.project.goventflow.domain.enumeration.EventAvailability;
import com.project.goventflow.repository.CommentRepository;
import com.project.goventflow.repository.EventRepository;
import com.project.goventflow.repository.UserRepository;
import com.project.goventflow.service.mapper.CommentMapper;
import com.project.goventflow.service.mapper.EventMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.Document;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class EventService {
    public static final String DEFAULT_HOST_ID = "692b20485d48888820945648";
    private final EmbeddingService embeddingService;
    private final EventRepository eventRepository;
    private final CommentRepository commentRepository;
    private final EventMapper eventMapper;
    private final CommentMapper commentMapper;
    private final MongoTemplate template;
    private final MailingService mailingService;
    private final EventCriteriaBuilder eventCriteriaBuilder;
    private final ChatModel chatModel;
    private final UserRepository userRepository;

    public EventDto createEvent(AuthDetails authDetails, EventCreationDto eventCreationDto) {
        Event event = eventMapper.toEntity(eventCreationDto);
        if (event.getAvailability() == EventAvailability.PAID && event.getEntranceFee() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Paid event should have entrance fee");
        }
        event.setHost(authDetails.getUser());
        event.setTags(normalizeTags(eventCreationDto.getTags()));
        event.setEmbedding(embeddingService.embedEvent(event));
        event = eventRepository.save(event);
        return eventMapper.toDto(event);
    }

    public EventDto updateEvent(AuthDetails authDetails, String eventId, EventUpdateDto eventDto) {
        Event event = getEventOrElseThrow(eventId);
        validateHostIsManagingEvent(authDetails, event);
        Event updatedEvent = eventMapper.updateEvent(event, eventDto);
        mailingService.sendEventUpdateNotification(event);
        event.setEmbedding(embeddingService.embedEvent(event));
        eventRepository.save(updatedEvent);
        return eventMapper.toDto(updatedEvent);
    }

    public CommentDto createComment(AuthDetails authDetails, String eventId, CommentCreationDto comment) {
        Event event = getEventOrElseThrow(eventId);
        Comment commentEntity = commentMapper.toEntity(comment, authDetails.getUser());
        Comment savedComment = commentRepository.save(commentEntity);
        event.getComments().add(savedComment);
        eventRepository.save(event);
        return commentMapper.toDto(savedComment);
    }

    public EventDto getEventById(String eventId) {
        Event event = getEventOrElseThrow(eventId);
        return eventMapper.toDto(event);
    }

    public List<EventShortDto> getUserEvents(String userId) {
        List<Event> events = eventRepository.findEventsByHost_Id(userId);
        return eventMapper.toListDto(events);
    }

    public Integer getNumOfUserComments(String userId) {
        return commentRepository.countCommentsByUserId(userId);
    }

    public List<EventShortDto> getActualEvents() {
        List<Event> eventEntities = eventRepository.findEventsByStartDateTimeAfter(LocalDateTime.now(ZoneOffset.UTC));
        return eventMapper.toListDto(eventEntities);
    }

    public void submitParticipation(AuthDetails authDetails, String eventId) {
        Event event = getEventOrElseThrow(eventId);
        User user = authDetails.getUser();
        List<User> participants = event.getParticipants();

        if (participants.contains(user)) {
            log.info("User id = {} relinquish participation in Event id = {}", user.getId(), eventId);
            participants.remove(user);
        } else {
            if (event.getMaxParticipants() != null && event.getMaxParticipants().equals(participants.size())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Reached max number of Participants");
            }
            participants.add(user);
            log.info("User id = {} submitted participation in Event id = {}", user.getId(), eventId);
        }
        eventRepository.save(event);
    }

    public void deleteEvent(AuthDetails authDetails, String eventId) {
        Event event = getEventOrElseThrow(eventId);
        validateHostIsManagingEvent(authDetails, event);
        eventRepository.delete(event);
    }

    public List<EventShortDto> searchEvents(EventSearchParams params) {
        Query query = new Query();

        Criteria baseCriteria = eventCriteriaBuilder.buildBaseCriteria(params);
        query.addCriteria(baseCriteria);

        query.addCriteria(eventCriteriaBuilder.withinSphereFilter(
                params.getLatitude(),
                params.getLongitude(),
                params.getEventDistance()
        ));

        if (params.getSearchValue() != null) {
            query.addCriteria(Criteria.where("title").regex(params.getSearchValue()));
        }

        List<Event> events = template.find(query, Event.class);
        return eventMapper.toListDto(events);
    }

    public List<EventSearchDto> vectorSearchEvents(EventSearchParams params) {
        Criteria criteria = eventCriteriaBuilder.buildBaseCriteria(params);

        System.out.println(params.getEventDistance());

        Criteria geoCriteria = eventCriteriaBuilder.withinSphereFilter(
                // Reverted order for Point params x and y
                params.getLatitude(),
                params.getLongitude(),
                params.getEventDistance()
        );

        Criteria finalMatchCriteria = new Criteria().andOperator(criteria, geoCriteria);

        float[] queryVector = embeddingService.embedText(params.getQuery());

        List<Double> embedding = new ArrayList<>();
        for (float f : queryVector) {
            embedding.add((double) f);
        }

        TypedAggregation<Event> aggregation = TypedAggregation.newAggregation(
                Event.class,
                context -> new Document("$vectorSearch", new Document()
                        .append("index", "vector-search-events")
                        .append("path", "embedding")
                        .append("queryVector", embedding)
                        .append("numCandidates", 20)
                        .append("limit", 20)
                ),
                context -> new Document("$addFields",
                        new Document("score", new Document("$meta", "vectorSearchScore"))
                ),
                Aggregation.match(Criteria.where("score").gte(0.85)),
                Aggregation.match(finalMatchCriteria),
                Aggregation.sort(Sort.by(Sort.Direction.DESC, "score")),
                Aggregation.limit(7)
        );
        List<Event> events = template.aggregate(aggregation, Event.class).getMappedResults();
        return eventMapper.toSearchListDto(events);
    }

    private List<String> normalizeTags(List<String> tags) {
        return tags.stream().map(String::toLowerCase).toList();
    }

    private Event getEventOrElseThrow(String eventId) {
        return eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Event not found"));
    }

    private void validateHostIsManagingEvent(AuthDetails authDetails, Event event) {
        if (!authDetails.getUser().getId().equals(event.getHost().getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User is not event host");
        }
    }

    public void reembedAllEvents() {
        eventRepository.findAll().stream()
                .map(this::reembedEvent)
                .forEach(eventRepository::save);
    }

    private Event reembedEvent(Event event) {
        event.setEmbedding(embeddingService.embedEvent(event));
        log.info("Reembedded event id = {}", event.getId());
        return event;
    }

    public void generateEvents(EventGenerationParams params) {
        for (int i = 0; i < params.getNumberOfEvents(); i++) {
            Event event = null;

            String prompt = """
             Generate JSON describing ONE event entity. Strictly follow JSON example structure.
             For location generate real adresses in Chisinau city, Moldova in format: Strada Mihai Eminescu 23, MD-2012 Chișinău, MD.
             For location choose corresponding to location name coordinates: x means latitude, y means longitude.
             Make description in details, choose meaningful titles.
             Start datetime set to one of days in December.
             
             JSON structure template:
                {
                    "title": "string",
                    "description": "string",
                    "availability": "PUBLIC",
                    "currentParticipants": 0,
                    "maxParticipants": 0,
                    "entranceFee": 0.1,
                    "eventType": "CONFERENCE",
                    "locationName": "string",
                    "location": {
                    "x": 0.1,
                    "y": 0.1
                    },
                    "startDateTime": "2025-11-29T21:28:32.264Z"
                }
                
                Event types:     CONFERENCE,
                                 WORKSHOP,
                                 WEBINAR,
                                 CONCERT,
                                 EXHIBITION,
                                 NETWORKING,
                                 SEMINAR,
                                 HACKATHON,
                                 CHARITY,
                                 FESTIVAL,
                                 DISCUSSION,
                                 LECTURE,
                                 FUNDRAISER,
                                 BIRTHDAY,
                                 GAMING,
                                 PARTY,
                                 HEALTH
                                 
                Event availability variants:     PUBLIC,
                                                 PAID,
                                                 PRIVATE
                    
             **Return ONLY valid JSON.**
             **Output must be strict JSON, no extra text.**
             **Do not write markup symbols in answer.**
            """;

            ChatResponse response = chatModel.call(new Prompt(prompt));

            String rawJSON = response.getResult().getOutput().getText();

            int start = rawJSON.indexOf("{");
            int end = rawJSON.lastIndexOf("}");

            String json = "";
            if (start != -1 && end != -1 && end > start) {
                json = rawJSON.substring(start, end+1);
            }

            ObjectMapper event_mapper = new ObjectMapper();
            try {
                event = event_mapper.readValue(json, Event.class);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }

            User defaultHost = userRepository.findById(DEFAULT_HOST_ID)
                    .orElseThrow(() -> new RuntimeException("Default host not found"));
            event.setHost(defaultHost);
            eventRepository.save(event);
        }
    }
}
