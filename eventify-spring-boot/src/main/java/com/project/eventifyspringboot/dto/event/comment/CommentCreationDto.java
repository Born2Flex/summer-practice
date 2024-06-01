package com.project.eventifyspringboot.dto.event.comment;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CommentCreationDto {
    @NotBlank
    private String text;
}
