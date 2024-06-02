package com.project.eventifyspringboot.dto.user;

import lombok.Data;

@Data
public class UserDto {
    private String id;
    private String email;
    private String firstName;
    private String lastName;
    private String imgUrl;
}