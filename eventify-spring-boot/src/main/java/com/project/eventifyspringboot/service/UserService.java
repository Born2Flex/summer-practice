package com.project.eventifyspringboot.service;

import com.project.eventifyspringboot.dto.UserDto;
import com.project.eventifyspringboot.mapper.UserMapper;
import com.project.eventifyspringboot.repository.UserRepository;
import com.project.eventifyspringboot.security.AuthDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserMapper userMapper;

    public UserDto getMe(AuthDetails authDetails) {
        return userMapper.toUserDto(authDetails.getUser());
    }
}
