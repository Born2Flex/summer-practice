package com.project.eventifyspringboot.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("users")
public class UserEntity {
    @Id
    private String id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
}
