package com.project.eventifyspringboot.service;

import com.project.eventifyspringboot.dto.event.EventShortDto;
import com.project.eventifyspringboot.dto.user.UserDto;
import com.project.eventifyspringboot.dto.user.UserFullDto;
import com.project.eventifyspringboot.dto.user.UserShortDto;
import com.project.eventifyspringboot.dto.user.UserUpdateDto;
import com.project.eventifyspringboot.entity.User;
import com.project.eventifyspringboot.mapper.UserMapper;
import com.project.eventifyspringboot.repository.UserRepository;
import com.project.eventifyspringboot.security.AuthDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final EventService eventService;

    public User findById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public UserFullDto getUserInfo(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        UserFullDto userFullDto = userMapper.toUserFullDto(user);
        List<EventShortDto> hostedEvents = eventService.getUserEvents(user.getId());
        userFullDto.setNumOfEvents(hostedEvents.size());
        userFullDto.setEvents(hostedEvents);
        userFullDto.setNumOfComments(eventService.getNumOfUserComments(user.getId()));
        // temporary decision
        userFullDto.setNumOfFriends(Math.abs(user.hashCode() % 100));
        return userFullDto;
    }

    public UserShortDto getShortUserInfo(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        return userMapper.toShortUserDto(user);
    }

    public UserDto updateUser(AuthDetails authDetails, String userId, UserUpdateDto userDto) {
        User user = authDetails.getUser();
        if (!userId.equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User id mismatch");
        }
        userMapper.updateUserEntity(userDto, user);
        return userMapper.toUserDto(userRepository.save(user));
    }
}
