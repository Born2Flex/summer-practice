package com.project.eventifyspringboot.service;

import com.project.eventifyspringboot.dto.auth.LoginRequest;
import com.project.eventifyspringboot.dto.auth.JwtResponseDto;
import com.project.eventifyspringboot.dto.auth.RegisterRequest;
import com.project.eventifyspringboot.entity.User;
import com.project.eventifyspringboot.mapper.UserMapper;
import com.project.eventifyspringboot.repository.UserRepository;
import com.project.eventifyspringboot.security.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public JwtResponseDto registerUser(RegisterRequest registerRequest) {
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already in use");
        }
        User user = userRepository.save(userMapper.toEntity(registerRequest));
        return new JwtResponseDto(user.getId(), jwtService.generateToken(user.getId()));
    }

    public JwtResponseDto authenticateUser(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }
        return new JwtResponseDto(user.getId(), jwtService.generateToken(user.getId()));
    }
}
