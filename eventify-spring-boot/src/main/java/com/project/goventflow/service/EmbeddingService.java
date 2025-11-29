package com.project.goventflow.service;

import com.project.goventflow.domain.entity.Event;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.vertexai.embedding.text.VertexAiTextEmbeddingModel;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmbeddingService {
    private final VertexAiTextEmbeddingModel embeddingModel;

    public float[] embedText(String text) {
        return embeddingModel.embed(text);
    }

    public float[] embedEvent(Event event) {
        String text = eventToText(event);
        return embeddingModel.embed(text);
    }

    private String eventToText(Event event) {
        return String.format(
                "%s. %s. This event is in %s category and is held in %s location",
                safe(event.getTitle()),
                safe(event.getDescription()),
                safe(String.valueOf(event.getEventType())),
                safe(event.getLocationName())
        );
    }

    private String safe(String s) {
        return (s == null || s.isBlank()) ? "" : s.trim();
    }
}