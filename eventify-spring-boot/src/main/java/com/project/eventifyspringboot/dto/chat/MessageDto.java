package com.project.eventifyspringboot.dto.chat;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MessageDto {
    private String senderId;
    private String message;
    private LocalDateTime dateTime;
}
