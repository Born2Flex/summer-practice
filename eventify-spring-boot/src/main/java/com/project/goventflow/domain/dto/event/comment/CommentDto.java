package com.project.goventflow.domain.dto.event.comment;

import com.project.goventflow.domain.dto.user.UserShortDto;
import lombok.Data;

@Data
public class CommentDto {
    private String text;
    private UserShortDto user;
}
