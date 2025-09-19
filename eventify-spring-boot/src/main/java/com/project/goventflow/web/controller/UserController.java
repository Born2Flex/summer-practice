package com.project.goventflow.web.controller;

import com.project.goventflow.domain.dto.user.UserDto;
import com.project.goventflow.domain.dto.user.UserFullDto;
import com.project.goventflow.domain.dto.user.UserShortDto;
import com.project.goventflow.domain.dto.user.UserUpdateDto;
import com.project.goventflow.config.security.AuthDetails;
import com.project.goventflow.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "${rest.prefix}/users", produces = "application/json")
@Tag(name = "Users", description = "User management endpoints")
@SecurityRequirement(name = "jwt")
@ApiResponse(responseCode = "401", content = {@Content})
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;
    private final SimpMessagingTemplate template;

    @GetMapping("/me")
    @Operation(summary = "Get information about authorized user.")
    @ApiResponse(responseCode = "200",
            content = {@Content(schema = @Schema(implementation = UserFullDto.class), mediaType = "application/json")})
    public UserFullDto getMe(@AuthenticationPrincipal AuthDetails authDetails) {
        template.convertAndSendToUser(authDetails.getUser().getId(), "/notifications", "{БАЗА, ТОБТО БАЗА}");
        return userService.getUserInfo(authDetails.getUser().getId());
    }

    @GetMapping("/{userId}")
    @Operation(summary = "Get information about user by id.")
    @ApiResponse(responseCode = "200",
            content = {@Content(schema = @Schema(implementation = UserFullDto.class), mediaType = "application/json")})
    @ApiResponse(responseCode = "404", content = {@Content})
    public UserFullDto getUserById(@PathVariable String userId) {
        return userService.getUserInfo(userId);
    }

    @GetMapping("/short/{userId}")
    @Operation(summary = "Get short info about user by id.")
    @ApiResponse(responseCode = "200",
            content = {@Content(schema = @Schema(implementation = UserShortDto.class), mediaType = "application/json")})
    @ApiResponse(responseCode = "404", content = {@Content})
    public UserShortDto getShortUserById(@PathVariable String userId) {
        return userService.getShortUserInfo(userId);
    }

    @PutMapping("/{userId}")
    @Operation(summary = "Update user info")
    @ApiResponse(responseCode = "200",
            content = {@Content(schema = @Schema(implementation = UserDto.class), mediaType = "application/json")})
    @ApiResponse(responseCode = "403", content = {@Content})
    public UserDto updateUser(@AuthenticationPrincipal AuthDetails authDetails, @PathVariable String userId,
                              @RequestBody @Valid UserUpdateDto userDto) {
        return userService.updateUser(authDetails, userId, userDto);
    }
}
