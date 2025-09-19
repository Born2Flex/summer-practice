package com.project.goventflow.domain.dto.chat;

import com.project.goventflow.domain.dto.user.UserShortDto;
import com.project.goventflow.domain.entity.Message;
import lombok.Data;

import java.util.List;

@Data
public class ChatDto {
    private String id;
    private List<UserShortDto> participants;
    private List<Message> messages;
}
