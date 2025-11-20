package com.project.goventflow.domain.dto.mailing;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
public class EventUpdateMessageDto {
    private List<String> participantsEmails;
    private String eventTitle;
    private String eventUrl;
    private String imageUrl;

    public Map<String, Object> toMap() {
        return Map.of(
                "eventTitle", eventTitle,
                "eventUrl", eventUrl,
                "imageUrl", imageUrl
        );
    }
}
