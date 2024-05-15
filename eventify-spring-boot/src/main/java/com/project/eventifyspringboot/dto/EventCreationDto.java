package com.project.eventifyspringboot.dto;

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
    private GeoJsonPoint location;
    private LocalDateTime startDateTime;
}
