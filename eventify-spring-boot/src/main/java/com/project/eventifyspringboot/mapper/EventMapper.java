package com.project.eventifyspringboot.mapper;

import com.project.eventifyspringboot.dto.event.EventCreationDto;
import com.project.eventifyspringboot.dto.event.EventDto;
import com.project.eventifyspringboot.dto.event.EventShortDto;
import com.project.eventifyspringboot.entity.Event;
import com.project.eventifyspringboot.entity.User;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = {UserMapper.class})
public abstract class EventMapper {
    public abstract Event toEntity(EventCreationDto eventDto);
    @Mapping(target = "currentParticipants", source = "participants", qualifiedByName = "getAmountOfParticipants")
    public abstract EventDto toDto(Event event);
    @Mapping(target = "currentParticipants", source = "participants", qualifiedByName = "getAmountOfParticipants")
    public abstract EventShortDto toShortDto(Event event);
    public abstract List<EventShortDto> toListDto(List<Event> eventEntities);

    @Named("getAmountOfParticipants")
    protected int getAmountOfParticipants(List<User> users) {
        return users.size();
    }
}
