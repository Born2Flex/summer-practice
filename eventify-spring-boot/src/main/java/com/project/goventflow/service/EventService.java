package com.project.goventflow.service;

import com.project.goventflow.domain.dto.event.EventSearchParams;
import com.project.goventflow.domain.dto.event.EventShortDto;
import com.project.goventflow.domain.dto.event.EventUpdateDto;
import com.project.goventflow.domain.dto.event.comment.CommentCreationDto;
import com.project.goventflow.domain.dto.event.comment.CommentDto;
import com.project.goventflow.domain.dto.event.EventCreationDto;
import com.project.goventflow.domain.dto.event.EventDto;
import com.project.goventflow.domain.entity.Comment;
import com.project.goventflow.domain.entity.Event;
import com.project.goventflow.domain.entity.User;
import com.project.goventflow.domain.enumeration.EventAvailability;
import com.project.goventflow.domain.enumeration.EventType;
import com.project.goventflow.service.mapper.CommentMapper;
import com.project.goventflow.service.mapper.EventMapper;
import com.project.goventflow.repository.CommentRepository;
import com.project.goventflow.repository.EventRepository;
import com.project.goventflow.config.security.AuthDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.Document;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Metrics;
import org.springframework.data.geo.Point;
import org.springframework.data.geo.Circle;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class EventService {
    private final EmbeddingService embeddingService;
    private final EventRepository eventRepository;
    private final CommentRepository commentRepository;
    private final EventMapper eventMapper;
    private final CommentMapper commentMapper;
    private final MongoTemplate template;
    private final MailingService mailingService;
    private final EventCriteriaBuilder eventCriteriaBuilder;

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

        query.addCriteria(eventCriteriaBuilder.nearSphereFilter(
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

    public List<EventShortDto> vectorSearchEvents(EventSearchParams params) {
        Criteria criteria = eventCriteriaBuilder.buildBaseCriteria(params);

        Criteria geoCriteria = eventCriteriaBuilder.withinSphereFilter(
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
                        .append("index", "event-search")
                        .append("path", "embedding")
                        .append("queryVector", embedding)
                        .append("numCandidates", 20)
                        .append("limit", 10)
                ),
                Aggregation.match(finalMatchCriteria)
        );
        List<Event> events = template.aggregate(aggregation, Event.class).getMappedResults();
        return eventMapper.toListDto(events);
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
}
