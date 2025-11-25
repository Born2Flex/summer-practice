package com.project.goventflow.service;

import com.project.goventflow.domain.dto.auth.LoginRequest;
import com.project.goventflow.domain.dto.auth.JwtResponseDto;
import com.project.goventflow.domain.dto.auth.RegisterRequest;
import com.project.goventflow.domain.dto.auth.RefreshTokenRequest;
import com.project.goventflow.domain.entity.RefreshToken;
import com.project.goventflow.domain.entity.User;
import com.project.goventflow.service.mapper.UserMapper;
import com.project.goventflow.repository.UserRepository;
import com.project.goventflow.config.security.JwtService;
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
    private final RefreshTokenService refreshTokenService;

    public JwtResponseDto registerUser(RegisterRequest registerRequest) {
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already in use");
        }
        User user = userRepository.save(userMapper.toEntity(registerRequest));
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());
        return new JwtResponseDto(user.getId(), jwtService.generateToken(user.getId()), refreshToken.getToken());
    }

    public JwtResponseDto authenticateUser(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());
        return new JwtResponseDto(user.getId(), jwtService.generateToken(user.getId()), refreshToken.getToken());
    }

    public JwtResponseDto refreshToken(RefreshTokenRequest request) {
        String requestRefreshToken = request.getRefreshToken();
        
        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUserId)
                .map(userId -> {
                    String token = jwtService.generateToken(userId);
                    return new JwtResponseDto(userId, token, requestRefreshToken);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Refresh token is not in database!"));
    }
}
