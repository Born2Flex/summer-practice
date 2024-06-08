package com.project.eventifyspringboot.entity;

import com.project.eventifyspringboot.enumeration.EventAvailability;
import com.project.eventifyspringboot.enumeration.EventType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("events")
public class Event {
    @Id
    private String id;
    private String title;
    private String description;
    @DocumentReference
    private User host;
    private EventAvailability availability;
    private EventType eventType;
    private List<String> tags;
    @DocumentReference(collection = "users", lazy = true)
    private List<User> participants;
    private Integer maxParticipants;
    private Double entranceFee;
    private String locationName;
    @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE)
    private Point location;
    private LocalDateTime startDateTime;
//    @DocumentReference(collection = "comments", lazy = true)
    private List<Comment> comments;
    private String imgUrl;
}
