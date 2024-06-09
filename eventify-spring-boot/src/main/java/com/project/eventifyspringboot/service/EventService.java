package com.project.eventifyspringboot.service;

import com.project.eventifyspringboot.dto.event.EventShortDto;
import com.project.eventifyspringboot.dto.event.comment.CommentCreationDto;
import com.project.eventifyspringboot.dto.event.comment.CommentDto;
import com.project.eventifyspringboot.dto.event.EventCreationDto;
import com.project.eventifyspringboot.dto.event.EventDto;
import com.project.eventifyspringboot.entity.Comment;
import com.project.eventifyspringboot.entity.Event;
import com.project.eventifyspringboot.entity.User;
import com.project.eventifyspringboot.enumeration.EventAvailability;
import com.project.eventifyspringboot.enumeration.EventType;
import com.project.eventifyspringboot.mapper.CommentMapper;
import com.project.eventifyspringboot.mapper.EventMapper;
import com.project.eventifyspringboot.repository.CommentRepository;
import com.project.eventifyspringboot.repository.EventRepository;
import com.project.eventifyspringboot.security.AuthDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Metrics;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class EventService {
    private final EventRepository eventRepository;
    private final CommentRepository commentRepository;
    private final EventMapper eventMapper;
    private final CommentMapper commentMapper;
    private final MongoTemplate template;

    public EventDto createEvent(AuthDetails authDetails, EventCreationDto eventCreationDto) {
        Event event = eventMapper.toEntity(eventCreationDto);
        if (event.getAvailability() == EventAvailability.PAID && event.getEntranceFee() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Paid event should have entrance fee");
        }
        event.setHost(authDetails.getUser());
        event.setTags(normalizeTags(eventCreationDto.getTags()));
        event = eventRepository.save(event);
        return eventMapper.toDto(event);
    }

    public CommentDto createComment(AuthDetails authDetails, String eventId, CommentCreationDto comment) {
        Event event = getEventOrThrow(eventId);
        Comment commentEntity = commentMapper.toEntity(comment, authDetails.getUser());
        Comment savedComment = commentRepository.save(commentEntity);
        event.getComments().add(savedComment);
        eventRepository.save(event);
        return commentMapper.toDto(savedComment);
    }

    public EventDto getEventById(String eventId) {
        Event event = getEventOrThrow(eventId);
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
        Event event = getEventOrThrow(eventId);
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
        Event event = getEventOrThrow(eventId);
        if (!event.getHost().equals(authDetails.getUser())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is not event host");
        }
        eventRepository.delete(event);
    }

    public List<EventShortDto> searchEvents(List<EventType> type, List<EventAvailability> availability,
                                            LocalDateTime from, LocalDateTime to,
                                            List<String> tags, String searchValue, int eventRadius,
                                            double latitude, double longitude) {
        Query query = new Query();

        if (type != null) {
            query.addCriteria(Criteria.where("eventType").in(type));
        }
        if (availability != null) {
            query.addCriteria(Criteria.where("availability").in(availability));
        }
        if (from != null || to != null) {
            Criteria criteria = Criteria.where("startDateTime");
            if (from != null) {
                criteria = criteria.gte(from);
            }
            if (to != null) {
                criteria = criteria.lte(to);
            }
            query.addCriteria(criteria);
        }
        if (tags != null) {
            query.addCriteria(Criteria.where("tags").elemMatch(Criteria.where("$in").is(normalizeTags(tags))));
        }
        if (searchValue != null) {
            query.addCriteria(Criteria.where("title").regex(searchValue));
        }

        Point location = new Point(latitude, longitude);
        Distance distance = new Distance(eventRadius, Metrics.KILOMETERS);
        query.addCriteria(Criteria.where("location").nearSphere(location).maxDistance(distance.getNormalizedValue()));

        List<Event> events = template.find(query, Event.class);
        return eventMapper.toListDto(events);
    }

    private List<String> normalizeTags(List<String> tags) {
        return tags.stream().map(String::toLowerCase).toList();
    }

    private Event getEventOrThrow(String eventId) {
        return eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Event not found"));
    }
}
