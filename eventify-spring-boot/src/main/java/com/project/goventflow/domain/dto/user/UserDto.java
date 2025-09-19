package com.project.goventflow.domain.dto.user;

import lombok.Data;

@Data
public class UserDto {
    private String id;
    private String email;
    private String firstName;
    private String lastName;
    private String imgUrl;
    private String location;
    private String description;
}
