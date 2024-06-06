package com.project.eventifyspringboot.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("chats")
public class Chat {
    @Id
    private String id;
    private Message lastMessage;
    @DocumentReference(collection = "users", lazy = true)
    private List<User> participants;
    private List<Message> messages;
}
