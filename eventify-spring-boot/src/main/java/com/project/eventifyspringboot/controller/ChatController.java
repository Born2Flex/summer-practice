package com.project.eventifyspringboot.controller;

import com.project.eventifyspringboot.dto.chat.ChatDto;
import com.project.eventifyspringboot.dto.chat.ChatShortDto;
import com.project.eventifyspringboot.dto.chat.MessageDto;
import com.project.eventifyspringboot.security.AuthDetails;
import com.project.eventifyspringboot.service.ChatService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "Chat", description = "Chat endpoints")
@SecurityRequirement(name = "jwt")
@AllArgsConstructor
@Slf4j
public class ChatController {
    private final ChatService chatService;
    private final SimpMessagingTemplate template;
    // /app/chat/{chatId}
    @MessageMapping("/chat/{chatId}")
    public void addChatMessage(@DestinationVariable String chatId, @Payload MessageDto message) {
        // /chat/{chatId}/messages
        template.convertAndSendToUser(chatId, "/messages", chatService.addChatMessage(chatId, message));
        log.info("Sending message to chat {}", chatId);
    }

    @GetMapping("/rest/chats")
    public ResponseEntity<List<ChatShortDto>> getChats(@AuthenticationPrincipal AuthDetails authDetails) {
        return ResponseEntity.ok(chatService.findChatsByUserId(authDetails.getUser().getId()));
    }

    @GetMapping("/rest/chats/{chatId}")
    public ResponseEntity<ChatDto> getChatById(@AuthenticationPrincipal AuthDetails authDetails, @PathVariable String chatId) {
        return ResponseEntity.ok(chatService.findChatById(authDetails, chatId));
    }

    @PostMapping("/rest/chats/new/{participantId}")
    public ResponseEntity<ChatDto> createChat(@AuthenticationPrincipal AuthDetails authDetails, @PathVariable String participantId) {
        return ResponseEntity.ok(chatService.createChat(authDetails.getUser().getId(), participantId));
    }
}
