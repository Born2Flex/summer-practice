package com.project.eventifyspringboot.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("events")
public class EventEntity {
    @Id
    private String id;
    private String title;
    @DocumentReference
    private UserEntity host;
    private EventType eventType;
    private String description;
    private GeoJsonPoint location;
    private LocalDateTime startDateTime;
}
