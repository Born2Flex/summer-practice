package com.project.eventifyspringboot.dto.chat;

import com.project.eventifyspringboot.dto.user.UserShortDto;
import com.project.eventifyspringboot.entity.Message;
import lombok.Data;

import java.util.List;

@Data
public class ChatDto {
    private String id;
    private List<UserShortDto> participants;
    private List<Message> messages;
}
