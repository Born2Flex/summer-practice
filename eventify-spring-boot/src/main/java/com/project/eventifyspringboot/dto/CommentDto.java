package com.project.eventifyspringboot.dto;

import com.project.eventifyspringboot.entity.UserEntity;
import lombok.Data;

@Data
public class CommentDto {
    private String id;
    private String comment;
    private UserEntity userEntity;
}
