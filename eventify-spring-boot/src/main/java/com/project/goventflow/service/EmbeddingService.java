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
        return  "Title:" +  event.getTitle() + '\n' +
                "Description:" +  event.getDescription() + '\n' +
                "Event type:" +  event.getEventType() + '\n' +
                "Location name:" +  event.getLocationName() + '\n';
    }
}
