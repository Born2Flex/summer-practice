package com.project.eventifyspringboot.mapper;

import com.project.eventifyspringboot.dto.event.EventCreationDto;
import com.project.eventifyspringboot.dto.event.EventDto;
import com.project.eventifyspringboot.entity.EventEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface EventMapper {
    EventEntity toEntity(EventCreationDto eventDto);
    EventDto toDto(EventEntity eventEntity);
    List<EventDto> toListDto(List<EventEntity> eventEntities);
}
