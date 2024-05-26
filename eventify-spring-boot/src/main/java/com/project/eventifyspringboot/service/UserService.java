package com.project.eventifyspringboot.service;

import com.project.eventifyspringboot.dto.UserDto;
import com.project.eventifyspringboot.entity.UserEntity;
import com.project.eventifyspringboot.mapper.UserMapper;
import com.project.eventifyspringboot.repository.UserRepository;
import com.project.eventifyspringboot.security.AuthDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserMapper userMapper;
    private final UserRepository userRepository;

    public UserEntity findById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public UserDto getMe(AuthDetails authDetails) {
        return userMapper.toUserDto(authDetails.getUser());
    }
}
