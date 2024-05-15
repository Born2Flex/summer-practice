package com.project.eventifyspringboot.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CommentCreationDto {
//    private String id;
//    private int f;
    @NotBlank
    private String comment;
}
