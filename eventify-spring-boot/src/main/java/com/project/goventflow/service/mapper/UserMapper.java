package com.project.goventflow.service.mapper;

import com.project.goventflow.domain.dto.auth.RegisterRequest;
import com.project.goventflow.domain.dto.user.UserFullDto;
import com.project.goventflow.domain.dto.user.UserShortDto;
import com.project.goventflow.domain.dto.user.UserDto;
import com.project.goventflow.domain.dto.user.UserUpdateDto;
import com.project.goventflow.domain.entity.User;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public abstract class UserMapper {
    protected PasswordEncoder passwordEncoder;

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Mapping(target = "password", source = "password", qualifiedByName = "encodePassword")
    public abstract User toEntity(RegisterRequest registerRequest);

    public abstract UserDto toUserDto(User user);

    public abstract UserShortDto toShortUserDto(User user);

    public abstract UserFullDto toUserFullDto(User user);

    public abstract void updateUserEntity(UserUpdateDto userDto, @MappingTarget User user);

    @Named("encodePassword")
    protected String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }
}
