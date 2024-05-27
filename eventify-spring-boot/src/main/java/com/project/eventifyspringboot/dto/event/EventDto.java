package com.project.eventifyspringboot.dto.event;

import com.project.eventifyspringboot.entity.EventType;
import com.project.eventifyspringboot.entity.UserEntity;
import lombok.Data;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import java.time.LocalDateTime;

@Data
public class EventDto {
    private String id;
    private String title;
    private EventType eventType;
    private UserEntity host;
    private String description;
    private GeoJsonPoint location;
    private LocalDateTime startDateTime;
}
