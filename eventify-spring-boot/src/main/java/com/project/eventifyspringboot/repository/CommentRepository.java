package com.project.eventifyspringboot.repository;

import com.project.eventifyspringboot.entity.CommentEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommentRepository extends MongoRepository<CommentEntity, String> {
}
