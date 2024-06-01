package com.project.eventifyspringboot.mapper;

import com.project.eventifyspringboot.dto.event.EventCreationDto;
import com.project.eventifyspringboot.dto.event.EventDto;
import com.project.eventifyspringboot.dto.event.EventShortDto;
import com.project.eventifyspringboot.entity.Event;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = {UserMapper.class})
public abstract class EventMapper {
    public abstract Event toEntity(EventCreationDto eventDto);
    public abstract EventDto toDto(Event event);
    public abstract EventShortDto toShortDto(Event event);
    public abstract List<EventShortDto> toListDto(List<Event> eventEntities);
}
