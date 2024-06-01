package com.project.eventifyspringboot.repository;

import com.project.eventifyspringboot.entity.Event;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EventRepository extends MongoRepository<Event, String> {
}
