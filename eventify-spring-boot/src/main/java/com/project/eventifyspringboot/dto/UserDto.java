package com.project.eventifyspringboot.dto;

import lombok.Data;

@Data
public class UserDto {
    private String id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
}
