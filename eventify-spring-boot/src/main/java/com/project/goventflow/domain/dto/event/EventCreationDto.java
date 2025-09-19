package com.project.goventflow.domain.dto.event;

import com.project.goventflow.domain.enumeration.EventAvailability;
import com.project.goventflow.domain.enumeration.EventType;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.geo.Point;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class EventCreationDto {
    @NotBlank
    @Length(min = 3, max = 36)
    private String title;
    @NotBlank
    @Length(max = 1024)
    private String description;
    private EventAvailability availability;
    private Integer maxParticipants;
    private Double entranceFee;
    private EventType eventType;
    private List<String> tags;
    @NotBlank
    @Length(max = 128)
    private String locationName;
    @NotNull
    private Point location;
    @Future
    private LocalDateTime startDateTime;
    private String imgUrl;
}
