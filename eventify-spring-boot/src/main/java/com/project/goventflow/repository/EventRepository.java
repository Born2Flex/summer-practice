package com.project.goventflow.repository;

import com.project.goventflow.domain.entity.Event;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findEventsByHost_Id(String hostId);
    
    List<Event> findEventsByStartDateTimeAfter(LocalDateTime startDateTime);
}
