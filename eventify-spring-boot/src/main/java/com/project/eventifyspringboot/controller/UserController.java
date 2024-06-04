package com.project.eventifyspringboot.controller;

import com.project.eventifyspringboot.dto.user.UserDto;
import com.project.eventifyspringboot.dto.user.UserFullDto;
import com.project.eventifyspringboot.dto.user.UserUpdateDto;
import com.project.eventifyspringboot.security.AuthDetails;
import com.project.eventifyspringboot.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    @GetMapping("/me")
    @Operation(summary = "Get information about authorized user.")
    @ApiResponse(responseCode = "200",
            content = {@Content(schema = @Schema(implementation = UserFullDto.class), mediaType = "application/json")})
    public UserFullDto getMe(@AuthenticationPrincipal AuthDetails authDetails) {
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

    @PutMapping
    @Operation(summary = "Update user info")
    public UserDto updateUser(@AuthenticationPrincipal AuthDetails authDetails, @RequestBody @Valid UserUpdateDto userDto) {
        return userService.updateUser(authDetails, userDto);
    }
}
