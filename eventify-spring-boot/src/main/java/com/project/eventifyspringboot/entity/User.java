package com.project.eventifyspringboot.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Document("users")
public class User {
    @Id
    @EqualsAndHashCode.Include
    private String id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String description;
    private String location;
    private String imgUrl;
//  Attended Events ...
}
