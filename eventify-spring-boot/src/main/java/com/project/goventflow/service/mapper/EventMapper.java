package com.project.goventflow.service.mapper;

import com.project.goventflow.domain.dto.event.*;
import com.project.goventflow.domain.entity.Event;
import com.project.goventflow.domain.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = {UserMapper.class})
public abstract class EventMapper {
    @Mapping(target = "tags", ignore = true)
    public abstract Event toEntity(EventCreationDto eventDto);

    @Mapping(target = "currentParticipants", source = "participants", qualifiedByName = "getAmountOfParticipants")
    public abstract EventDto toDto(Event event);

    @Mapping(target = "currentParticipants", source = "participants", qualifiedByName = "getAmountOfParticipants")
    public abstract EventShortDto toShortDto(Event event);

    @Mapping(target = "currentParticipants", source = "participants", qualifiedByName = "getAmountOfParticipants")
    public abstract EventSearchDto toSearchDto(Event event);

    public abstract List<EventShortDto> toListDto(List<Event> eventEntities);

    public abstract List<EventSearchDto> toSearchListDto(List<Event> eventEntities);

    @Mapping(target = "currentParticipants", source = "participants", qualifiedByName = "getAmountOfParticipants")
    public abstract EventParticipantsDto toParticipantsDto(Event event);

    @Named("getAmountOfParticipants")
    protected int getAmountOfParticipants(List<User> users) {
        return users == null ? 0 : users.size();
    }

    public abstract Event updateEvent(@MappingTarget Event event, EventUpdateDto eventDto);
}
