package com.project.goventflow.domain.dto.event;

import com.project.goventflow.domain.dto.event.comment.CommentDto;
import com.project.goventflow.domain.dto.user.UserShortDto;
import com.project.goventflow.domain.enumeration.EventAvailability;
import com.project.goventflow.domain.enumeration.EventType;
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
    private Integer currentParticipants;
    private Integer maxParticipants;
    private Double entranceFee;
    private EventType eventType;
    private List<String> tags;
    private String description;
    private String locationName;
    private Point location;
    private LocalDateTime startDateTime;
    private List<CommentDto> comments;
    private String imgUrl;
    private List<UserShortDto> participants;
}
