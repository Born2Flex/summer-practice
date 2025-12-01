package com.project.goventflow.web.controller;

import com.project.goventflow.config.security.AuthDetails;
import com.project.goventflow.domain.dto.event.RAGAnswerDto;
import com.project.goventflow.service.RAGChatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "${rest.prefix}/ai-chat", produces = "application/json")
@Tag(name = "RAG chat", description = "RAG chat endpoints")
@SecurityRequirement(name = "jwt")
@AllArgsConstructor
@Slf4j
public class RAGChatController {
    private final RAGChatService chatService;

    @PostMapping("/ask")
    @Operation(summary = "Ask RAG model.")
    @ApiResponse(responseCode = "200",
            content = {@Content(schema = @Schema(implementation = RAGAnswerDto.class), mediaType = "application/json")})
    @ApiResponse(responseCode = "404", content = {@Content})
    public RAGAnswerDto ask(@AuthenticationPrincipal AuthDetails authDetails,
                            @RequestParam(name = "messageText") String messageText,
                            @RequestParam(name = "longitude") Double longitude,
                            @RequestParam(name = "latitude") Double latitude
                            ) {
        return chatService.ask(authDetails, messageText, longitude, latitude);
    }

    @DeleteMapping("/clear")
    @Operation(summary = "Clear RAG model memory for specific user.")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiResponse(responseCode = "204", description = "Memory cleared successfully")
    public void clearChat(@AuthenticationPrincipal AuthDetails authDetails) {
        chatService.clearChat(authDetails);
    }
}
