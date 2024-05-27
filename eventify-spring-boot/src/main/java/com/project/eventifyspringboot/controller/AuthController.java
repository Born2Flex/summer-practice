package com.project.eventifyspringboot.controller;

import com.project.eventifyspringboot.dto.AuthenticationRequest;
import com.project.eventifyspringboot.dto.JwtResponseDto;
import com.project.eventifyspringboot.dto.RegisterRequest;
import com.project.eventifyspringboot.handler.ApiErrorDto;
import com.project.eventifyspringboot.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "${rest.prefix}/auth", produces = "application/json")
@Tag(name = "Auth", description = "Authentication management endpoints!")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(value = HttpStatus.CREATED)
    @Operation(summary = "Registers a new user.")
    @ApiResponse(responseCode = "201",
            content = {@Content(schema = @Schema(implementation = JwtResponseDto.class), mediaType = "application/json")})
    @ApiResponse(responseCode = "400",
            content = {@Content(schema = @Schema(implementation = ApiErrorDto.class), mediaType = "application/json")})
    public JwtResponseDto registerUser(@RequestBody @Valid RegisterRequest registerRequest) {
        return authService.registerUser(registerRequest);
    }

    @PostMapping("/login")
    @Operation(summary = "Get an user authentication tokens.")
    @ApiResponse(responseCode = "200",
            content = {@Content(schema = @Schema(implementation = JwtResponseDto.class), mediaType = "application/json")})
    @ApiResponse(responseCode = "401",
            content = {@Content(schema = @Schema(implementation = ApiErrorDto.class), mediaType = "application/json")})
    public JwtResponseDto login(@RequestBody AuthenticationRequest request) {
        return authService.authenticateUser(request);
    }
}
