package com.project.eventifyspringboot.mapper;

import com.project.eventifyspringboot.dto.chat.MessageDto;
import com.project.eventifyspringboot.entity.Message;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MessageMapper {
    Message toMessage(MessageDto messageDto);
}
