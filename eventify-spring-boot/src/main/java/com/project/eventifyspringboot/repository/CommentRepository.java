package com.project.eventifyspringboot.repository;

import com.project.eventifyspringboot.entity.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommentRepository extends MongoRepository<Comment, String> {
    Integer countCommentsByUserId(String userId);
}
