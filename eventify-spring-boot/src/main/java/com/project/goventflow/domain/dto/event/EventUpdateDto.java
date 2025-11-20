package com.project.goventflow.domain.dto.event;

import com.project.goventflow.domain.enumeration.EventAvailability;
import com.project.goventflow.domain.enumeration.EventType;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.geo.Point;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class EventUpdateDto {
    private String title;
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
    private String imgUrl;
}
