package com.project.eventifyspringboot.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document("comments")
public class CommentEntity {
    @Id
    private String id;
    private String comment;
    @Field(name = "event_id")
    @DocumentReference
    private EventEntity eventEntity;
    @Field(name = "user_id")
    @DocumentReference
    private UserEntity userEntity;
}
