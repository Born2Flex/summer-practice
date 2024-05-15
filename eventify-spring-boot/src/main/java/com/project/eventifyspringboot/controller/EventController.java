package com.project.eventifyspringboot.controller;

import com.project.eventifyspringboot.dto.CommentCreationDto;
import com.project.eventifyspringboot.dto.CommentDto;
import com.project.eventifyspringboot.dto.EventCreationDto;
import com.project.eventifyspringboot.dto.EventDto;
import com.project.eventifyspringboot.security.AuthDetails;
import com.project.eventifyspringboot.service.EventService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${rest.prefix}/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    @Operation(summary = "Create a new event.", description = "Create a new event.")
    @ApiResponse(responseCode = "201", description = "Event created successfully",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = EventDto.class))})
    @ApiResponse(responseCode = "400", description = "Invalid event data", content = {@Content})
    public EventDto createEvent(@AuthenticationPrincipal AuthDetails authDetails, @RequestBody @Valid EventCreationDto event) {
        return eventService.createEvent(authDetails, event);
    }

    @PostMapping("{eventId}/comment")
    @ResponseStatus(value = HttpStatus.CREATED)
    @Operation(summary = "Create a new comment for event.", description = "Create a new comment for event.")
    @ApiResponse(responseCode = "201", description = "Comment created successfully",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = CommentDto.class))})
    @ApiResponse(responseCode = "400", description = "Invalid comment data", content = {@Content})
    public CommentDto createComment(@AuthenticationPrincipal AuthDetails authDetails, @PathVariable String eventId,
                                    @RequestBody @Valid CommentCreationDto comment) {
        return eventService.createComment(authDetails, eventId, comment);
    }

    @GetMapping
    @Operation(summary = "Get all events.", description = "Get all events.")
    @ApiResponse(responseCode = "200", description = "Interviews found",
            content = {@Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = EventDto.class)))})
    public List<EventDto> getEvents() {
        return eventService.getAllEvents();
    }
}
