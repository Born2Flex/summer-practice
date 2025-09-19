package com.project.goventflow.domain.dto.user;

import com.project.goventflow.domain.dto.event.EventShortDto;
import lombok.Data;

import java.util.List;

@Data
public class UserFullDto {
    private String id;
    private String email;
    private String firstName;
    private String lastName;
    private String description;
    private String location;
    private String imgUrl;
    private Integer numOfComments;
    private Integer numOfEvents;
    private List<EventShortDto> events;
    private Integer numOfFriends;
}
