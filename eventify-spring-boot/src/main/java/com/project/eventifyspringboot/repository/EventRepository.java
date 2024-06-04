package com.project.eventifyspringboot.repository;

import com.project.eventifyspringboot.entity.Event;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findEventsByHost_Id(String hostId);
}
