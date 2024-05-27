package com.project.eventifyspringboot.dto.event;

import com.project.eventifyspringboot.entity.EventType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class EventCreationDto {
    private String title;
    private String description;
    private EventType eventType;
    private GeoJsonPoint location;
    private LocalDateTime startDateTime;
}
