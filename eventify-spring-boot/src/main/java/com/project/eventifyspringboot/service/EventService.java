package com.project.eventifyspringboot.service;

import com.project.eventifyspringboot.dto.event.EventParticipantsDto;
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
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "No event with such id"));
        Comment commentEntity = commentMapper.toEntity(comment, authDetails.getUser());
        Comment savedComment = commentRepository.save(commentEntity);
        event.getComments().add(savedComment);
        eventRepository.save(event);
        return commentMapper.toDto(savedComment);
    }

    public EventDto getEventById(String eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Event not found"));
        return eventMapper.toDto(event);
    }

    public List<EventShortDto> getAllEvents() {
        List<Event> eventEntities = eventRepository.findAll();
        return eventMapper.toListDto(eventEntities);
    }

    public EventParticipantsDto submitParticipation(AuthDetails authDetails, String eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Event not found"));
        List<User> participants = event.getParticipants();
        if (participants.contains(authDetails.getUser())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Participant already exists");
        }
        if (event.getMaxParticipants() != null && event.getMaxParticipants() == participants.size()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Reached max num of Participants");
        }
        event.getParticipants().add(authDetails.getUser());
        return eventMapper.toParticipantsDto(eventRepository.save(event));
    }

    public List<EventShortDto> searchEvents(List<EventType> type, List<EventAvailability> availability,
                                            LocalDateTime from, LocalDateTime to,
                                            List<String> tags, String searchValue, int eventRadius,
                                            double longitude, double latitude) {
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

        Point location = new Point(longitude, latitude);
        Distance distance = new Distance(eventRadius, Metrics.KILOMETERS);
        query.addCriteria(Criteria.where("location").nearSphere(location).maxDistance(distance.getNormalizedValue()));

        List<Event> events = template.find(query, Event.class);
        return eventMapper.toListDto(events);
    }

    private List<String> normalizeTags(List<String> tags) {
        return tags.stream().map(String::toLowerCase).toList();
    }
}
