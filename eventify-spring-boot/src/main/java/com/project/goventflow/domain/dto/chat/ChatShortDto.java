package com.project.goventflow.domain.dto.chat;

import com.project.goventflow.domain.dto.user.UserShortDto;
import com.project.goventflow.domain.entity.Message;
import lombok.Data;

@Data
public class ChatShortDto {
    private String id;
    private UserShortDto participant;
    private Message lastMessage;
}
