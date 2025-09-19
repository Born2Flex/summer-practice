package com.project.goventflow.service.mapper;

import com.project.goventflow.domain.dto.chat.ChatDto;
import com.project.goventflow.domain.dto.chat.ChatShortDto;
import com.project.goventflow.domain.entity.Chat;
import com.project.goventflow.domain.entity.User;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = {UserMapper.class})
public abstract class ChatMapper {
    @Mapping(target = "participant", source = "participants", qualifiedByName = "getParticipant")
    public abstract ChatShortDto toShortDto(Chat chat, @Context String participantId);
    public abstract List<ChatShortDto> toShortDtoList(List<Chat> chats, @Context String participantId);

    public abstract ChatDto toChatDto(Chat chat);

    @Named("getParticipant")
    protected User getParticipant(List<User> participants, @Context String participantId) {
        return participants.stream().filter(x -> !x.getId().equals(participantId)).findFirst().orElseThrow();
    }
}
