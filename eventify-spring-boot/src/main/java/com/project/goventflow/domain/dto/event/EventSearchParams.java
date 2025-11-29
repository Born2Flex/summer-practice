package com.project.goventflow.domain.dto.event;

import com.project.goventflow.domain.enumeration.EventAvailability;
import com.project.goventflow.domain.enumeration.EventType;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventSearchParams {
    private List<EventType> eventType;
    private List<EventAvailability> availability;
    private LocalDateTime from;
    private LocalDateTime to;
    private List<String> tags;
    private String searchValue;
    private String query;
    private Integer eventDistance = 1000;
    private Double longitude;
    private Double latitude;
}
