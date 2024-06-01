package com.project.eventifyspringboot.dto.event;

import com.project.eventifyspringboot.dto.event.comment.CommentDto;
import com.project.eventifyspringboot.dto.user.UserShortDto;
import com.project.eventifyspringboot.enumeration.EventAvailability;
import com.project.eventifyspringboot.enumeration.EventType;
import lombok.Data;
import org.springframework.data.geo.Point;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class EventDto {
    private String id;
    private String title;
    private UserShortDto host;
    private EventAvailability availability;
    private Integer maxParticipants;
    private Double entranceFee;
    private EventType eventType;
    private String description;
    private String locationName;
    private Point location;
    private LocalDateTime startDateTime;
    private List<CommentDto> comments;
    private String imgUrl;
    private List<UserShortDto> participants;
}
