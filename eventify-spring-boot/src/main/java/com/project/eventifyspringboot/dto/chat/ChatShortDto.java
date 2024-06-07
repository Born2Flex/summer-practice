package com.project.eventifyspringboot.dto.chat;

import com.project.eventifyspringboot.dto.user.UserShortDto;
import com.project.eventifyspringboot.entity.Message;
import lombok.Data;

@Data
public class ChatShortDto {
    private String id;
    private UserShortDto participant;
    private Message lastMessage;
}
