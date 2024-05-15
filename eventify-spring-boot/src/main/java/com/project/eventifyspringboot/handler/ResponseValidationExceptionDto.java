package com.project.eventifyspringboot.handler;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@Accessors(chain = true)
public class ResponseValidationExceptionDto {
    private LocalDateTime timestamp;
    private int status;
    private String message;
    private int code;
    private List<InvalidFieldDto> errors;
}
