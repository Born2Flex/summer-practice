package com.project.goventflow.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.goventflow.config.security.AuthDetails;
import com.project.goventflow.domain.dto.event.EventSearchDto;
import com.project.goventflow.domain.dto.event.EventSearchParams;
import com.project.goventflow.domain.dto.event.RAGAnswerDto;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.messages.*;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RAGChatService {
    private final EventService eventService;
    private final ChatMemory chatMemory;
    private final ChatModel chatModel;

    public RAGAnswerDto ask(AuthDetails authDetails, String messageText, Double longitude, Double latitude) {
        String userId = authDetails.getUser().getId();
        UserMessage message = new UserMessage(messageText);
        List<Message> chatHistory = chatMemory.get(userId);
        if (chatHistory.isEmpty()) {
            chatHistory = new ArrayList<>();
        }

        List<Message> userHistory = chatMemory.get(userId).stream().filter(mes -> mes.getMessageType() == MessageType.USER).toList();

        int window = Math.min(3, userHistory.size());
        List<Message> context = new ArrayList<>(userHistory.subList(userHistory.size() - window, userHistory.size()));
        context.add(message);
        context.add(new UserMessage(
                """
                 Based on given previous user requests, formulate JSON containing meaningful search query for events and corresponding filters. If no value can be extracted, do not mention its key in JSON.
                 
                 Here are values list that are desired to be extracted in JSON.
                 
                    String query;
                    List<EventType> eventType;
                    List<EventAvailability> availability;
                    LocalDateTime from;
                    LocalDateTime to;
                    Integer eventDistance; # Specify distance only if user talks about it.
                    
                    Event types:     CONFERENCE,
                                     WORKSHOP,
                                     WEBINAR,
                                     CONCERT,
                                     EXHIBITION,
                                     NETWORKING,
                                     SEMINAR,
                                     HACKATHON,
                                     CHARITY,
                                     FESTIVAL,
                                     DISCUSSION,
                                     LECTURE,
                                     FUNDRAISER,
                                     BIRTHDAY,
                                     GAMING,
                                     PARTY,
                                     HEALTH
                                     
                    Event availability variants:     PUBLIC,
                                                     PAID,
                                                     PRIVATE
                        
                 Remember that keys except **query** can be omitted if no reasonable value can be found by analysing user messages;
                 
                 Expand abbreviations in query value. Build queries like: events about artificial intelligence, neural networks.
                 
                 **Return ONLY valid JSON.**
                 **Output must be strict JSON, no extra text.**
                 **Do not write markup symbols in answer.**
                 **Be careful to remove unnecessary filters or words from query when user asks for something more general without connection to past questions.**
                """
        ));

        ChatResponse jsonResponse = chatModel.call(new Prompt(context));

        String rawJSON = jsonResponse.getResult().getOutput().getText();

        int start = rawJSON.indexOf("{");
        int end = rawJSON.lastIndexOf("}");

        String filterJSON = "";
        if (start != -1 && end != -1 && end > start) {
            filterJSON = rawJSON.substring(start, end+1);
        }

        System.out.println(filterJSON);

        ObjectMapper mapper = new ObjectMapper();
        EventSearchParams params = null;
        try {
            params = mapper.readValue(filterJSON, EventSearchParams.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        params.setLatitude(latitude);
        params.setLongitude(longitude);

        List<EventSearchDto> events = eventService.vectorSearchEvents(params);

        chatHistory.add(new SystemMessage("You are RAG-assistant for events platform. Do not insert information not mentioned in retrieved data."));

        chatHistory.add(new UserMessage(
                """
                User asked this question as search query for events: "%s".
    
                This is list of events found by vector search in database (do not make list of them in the answer):
                %s
    
                Please, create friendly and useful answer based on events list.
                
                **DO NOT** write events list, however, you can mention the most relevant events and give your recommendations.
                **DO NOT** paste links.
                **DO NOT** mention internal confidential data.
               """.formatted(message, events)
        ));

        Prompt prompt = new Prompt(chatHistory);

        ChatResponse response = chatModel.call(prompt);
        String answer = response.getResult().getOutput().getText();

        chatMemory.add(userId, message);
        chatMemory.add(userId, new AssistantMessage(answer));

        return new RAGAnswerDto(answer, events);
    }

    public void clearChat(AuthDetails authDetails) {
        String userId = authDetails.getUser().getId();
        chatMemory.clear(userId);
    }
}
