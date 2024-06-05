package com.project.eventifyspringboot.controller;

import com.project.eventifyspringboot.dto.chat.ChatDto;
import com.project.eventifyspringboot.dto.chat.ChatShortDto;
import com.project.eventifyspringboot.dto.chat.MessageDto;
import com.project.eventifyspringboot.security.AuthDetails;
import com.project.eventifyspringboot.service.ChatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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
        chatService.addChatMessage(chatId, message);
        log.info("Sending message to chat {}", chatId);
    }

    @GetMapping("/rest/chats")
    @Operation(summary = "Get all chats of user.")
    @ApiResponse(responseCode = "200", description = "Events found",
            content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = ChatShortDto.class))))
    public ResponseEntity<List<ChatShortDto>> getChats(@AuthenticationPrincipal AuthDetails authDetails) {
        return ResponseEntity.ok(chatService.findChatsByUserId(authDetails.getUser().getId()));
    }

    @GetMapping("/rest/chats/{chatId}")
    @ApiResponse(responseCode = "200",
            content = {@Content(schema = @Schema(implementation = ChatDto.class), mediaType = "application/json")})
    @ApiResponse(responseCode = "404", content = {@Content})
    public ResponseEntity<ChatDto> getChatById(@AuthenticationPrincipal AuthDetails authDetails, @PathVariable String chatId) {
        return ResponseEntity.ok(chatService.findChatById(authDetails, chatId));
    }

    @PostMapping("/rest/chats/new/{participantId}")
    @ApiResponse(responseCode = "200",
            content = {@Content(schema = @Schema(implementation = ChatDto.class), mediaType = "application/json")})
    public ResponseEntity<ChatDto> createChat(@AuthenticationPrincipal AuthDetails authDetails, @PathVariable String participantId) {
        return ResponseEntity.ok(chatService.createChat(authDetails.getUser().getId(), participantId));
    }
}
