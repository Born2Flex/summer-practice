package com.project.eventifyspringboot.service;

import com.project.eventifyspringboot.dto.event.comment.CommentCreationDto;
import com.project.eventifyspringboot.dto.event.comment.CommentDto;
import com.project.eventifyspringboot.dto.event.EventCreationDto;
import com.project.eventifyspringboot.dto.event.EventDto;
import com.project.eventifyspringboot.entity.CommentEntity;
import com.project.eventifyspringboot.entity.EventEntity;
import com.project.eventifyspringboot.mapper.CommentMapper;
import com.project.eventifyspringboot.mapper.EventMapper;
import com.project.eventifyspringboot.repository.CommentRepository;
import com.project.eventifyspringboot.repository.EventRepository;
import com.project.eventifyspringboot.security.AuthDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class EventService {
    private final EventRepository eventRepository;
    private final CommentRepository commentRepository;
    private final EventMapper eventMapper;
    private final CommentMapper commentMapper;

    public EventDto createEvent(AuthDetails authDetails, EventCreationDto eventCreationDto) {
        EventEntity eventEntity = eventMapper.toEntity(eventCreationDto);
        eventEntity.setHost(authDetails.getUser());
        eventEntity = eventRepository.save(eventEntity);
        return eventMapper.toDto(eventEntity);
    }

    public CommentDto createComment(AuthDetails authDetails, String eventId, CommentCreationDto comment) {
        EventEntity event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "No event with such id"));
        CommentEntity commentEntity = CommentEntity.builder()
                .userEntity(authDetails.getUser())
                .eventEntity(event)
                .comment(comment.getComment())
                .build();
        return commentMapper.toDto(commentRepository.save(commentEntity));
    }

    public EventDto getEventById(String eventId) {
        EventEntity event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Event not found"));
        return eventMapper.toDto(event);
    }

    public List<EventDto> getAllEvents() {
        List<EventEntity> eventEntities = eventRepository.findAll();
        return eventMapper.toListDto(eventEntities);
    }
}
