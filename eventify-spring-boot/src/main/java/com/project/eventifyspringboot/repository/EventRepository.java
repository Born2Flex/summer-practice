package com.project.eventifyspringboot.repository;

import com.project.eventifyspringboot.entity.EventEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EventRepository extends MongoRepository<EventEntity, String> {
}
