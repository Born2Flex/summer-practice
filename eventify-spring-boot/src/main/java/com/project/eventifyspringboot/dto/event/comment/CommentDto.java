package com.project.eventifyspringboot.dto.event.comment;

import com.project.eventifyspringboot.dto.user.UserShortDto;
import lombok.Data;

@Data
public class CommentDto {
    private String text;
    private UserShortDto user;
}
