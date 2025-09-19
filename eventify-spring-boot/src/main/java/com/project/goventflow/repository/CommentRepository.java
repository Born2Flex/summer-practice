package com.project.goventflow.repository;

import com.project.goventflow.domain.entity.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommentRepository extends MongoRepository<Comment, String> {
    Integer countCommentsByUserId(String userId);
}
