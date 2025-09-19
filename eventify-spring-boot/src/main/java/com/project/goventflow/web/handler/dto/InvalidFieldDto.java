package com.project.goventflow.web.handler.dto;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class InvalidFieldDto {
    private String field;
    private String message;
}
