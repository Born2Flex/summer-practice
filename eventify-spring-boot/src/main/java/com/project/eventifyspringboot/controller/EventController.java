package com.project.eventifyspringboot.controller;

import com.project.eventifyspringboot.dto.event.EventShortDto;
import com.project.eventifyspringboot.dto.event.comment.CommentCreationDto;
import com.project.eventifyspringboot.dto.event.comment.CommentDto;
import com.project.eventifyspringboot.dto.event.EventCreationDto;
import com.project.eventifyspringboot.dto.event.EventDto;
import com.project.eventifyspringboot.handler.dto.ApiErrorDto;
import com.project.eventifyspringboot.security.AuthDetails;
import com.project.eventifyspringboot.service.EventService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${rest.prefix}/events")
@Tag(name = "Events", description = "Event management endpoints")
@SecurityRequirement(name = "jwt")
@ApiResponse(responseCode = "401", content = {@Content})
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

    @PostMapping("/{eventId}/comment")
    @ResponseStatus(value = HttpStatus.CREATED)
    @Operation(summary = "Create a new comment for event.", description = "Create a new comment for event.")
    @ApiResponse(responseCode = "201", description = "Comment created successfully",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = CommentDto.class))})
    @ApiResponse(responseCode = "400", description = "Invalid comment data", content = {@Content})
    public CommentDto createComment(@AuthenticationPrincipal AuthDetails authDetails, @PathVariable String eventId,
                                    @RequestBody @Valid CommentCreationDto comment) {
        return eventService.createComment(authDetails, eventId, comment);
    }

    @GetMapping("/{eventId}")
    @Operation(summary = "Get event by id.", description = "Get event by id.")
    @ApiResponse(responseCode = "200", description = "Event found",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = EventDto.class))})
    @ApiResponse(responseCode = "404", description = "Event not found", content = {@Content})
    public EventDto getEventById(@PathVariable String eventId) {
        return eventService.getEventById(eventId);
    }

    @GetMapping
    @Operation(summary = "Get all events.", description = "Get all events.")
    @ApiResponse(responseCode = "200", description = "Interviews found",
            content = {@Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = EventShortDto.class)))})
    public List<EventShortDto> getEvents() {
        return eventService.getAllEvents();
    }

    @PatchMapping("/{eventId}/participate")
    @Operation(summary = "Submit participation in event", description = "Submit participation in event")
    @ApiResponse(responseCode = "200", description = "Participation submitted successfully",
            content = {@Content(schema = @Schema(implementation = Boolean.class), mediaType = "application/json")})
    public boolean submitParticipation(@AuthenticationPrincipal AuthDetails authDetails, @PathVariable String eventId) {
        return eventService.submitParticipation(authDetails, eventId);
    }
}
