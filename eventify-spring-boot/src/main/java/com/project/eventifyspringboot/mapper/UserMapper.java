package com.project.eventifyspringboot.mapper;

import com.project.eventifyspringboot.dto.RegisterRequest;
import com.project.eventifyspringboot.dto.UserDto;
import com.project.eventifyspringboot.entity.UserEntity;
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
    public abstract UserEntity toEntity(RegisterRequest registerRequest);

    public abstract UserDto toUserDto(UserEntity userEntity);

    @Named("encodePassword")
    protected String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }
}
