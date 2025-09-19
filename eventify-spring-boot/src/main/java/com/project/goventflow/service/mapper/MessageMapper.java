package com.project.goventflow.service.mapper;

import com.project.goventflow.domain.dto.chat.MessageDto;
import com.project.goventflow.domain.entity.Message;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MessageMapper {
    Message toMessage(MessageDto messageDto);
}
