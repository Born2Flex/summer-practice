package com.project.eventifyspringboot.entity;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    private String text;
    @Field(name = "user_id")
    @DocumentReference
    private User user;
}
