package com.project.eventifyspringboot.dto.event;

import com.project.eventifyspringboot.dto.user.UserShortDto;
import lombok.Data;

import java.util.List;

@Data
public class EventParticipantsDto {
    private Integer currentParticipants;
    private Integer maxParticipants;
    private List<UserShortDto> participants;
}
