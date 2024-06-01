package com.project.eventifyspringboot.dto.event;

import com.project.eventifyspringboot.enumeration.EventAvailability;
import com.project.eventifyspringboot.enumeration.EventType;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.geo.Point;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class EventCreationDto {
    @NotBlank
    private String title;
    @NotBlank
    private String description;
    private EventAvailability availability;
    private Integer maxParticipants;
    private Double entranceFee;
    private EventType eventType;
    @NotBlank
    private String locationName;
    @NotNull
    private Point location;
    @Future
    private LocalDateTime startDateTime;
    @NotNull
    private String imgUrl;
}
