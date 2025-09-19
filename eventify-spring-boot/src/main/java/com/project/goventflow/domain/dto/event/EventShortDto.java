package com.project.goventflow.domain.dto.event;

import com.project.goventflow.domain.dto.user.UserShortDto;
import com.project.goventflow.domain.enumeration.EventAvailability;
import com.project.goventflow.domain.enumeration.EventType;
import lombok.Data;
import org.springframework.data.geo.Point;

import java.time.LocalDateTime;

@Data
public class EventShortDto {
    private String id;
    private String title;
    private UserShortDto host;
    private EventAvailability availability;
    private Integer currentParticipants;
    private Integer maxParticipants;
    private Double entranceFee;
    private EventType eventType;
    private String locationName;
    private Point location;
    private LocalDateTime startDateTime;
}
