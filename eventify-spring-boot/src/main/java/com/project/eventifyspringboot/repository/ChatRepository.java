package com.project.eventifyspringboot.repository;

import com.project.eventifyspringboot.entity.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ChatRepository extends MongoRepository<Chat, String> {
    @Query("{ participants: {$elemMatch: {$eq: ObjectId(?0)}}}")
    List<Chat> findChatsByParticipantId(String userId);
}
