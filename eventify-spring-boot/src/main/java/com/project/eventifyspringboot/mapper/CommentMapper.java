package com.project.eventifyspringboot.mapper;

import com.project.eventifyspringboot.dto.CommentDto;
import com.project.eventifyspringboot.entity.CommentEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CommentMapper {
    CommentDto toDto(CommentEntity comment);
}
