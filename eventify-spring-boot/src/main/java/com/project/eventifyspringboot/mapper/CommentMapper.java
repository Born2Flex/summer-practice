package com.project.eventifyspringboot.mapper;

import com.project.eventifyspringboot.dto.event.comment.CommentCreationDto;
import com.project.eventifyspringboot.dto.event.comment.CommentDto;
import com.project.eventifyspringboot.entity.Comment;
import com.project.eventifyspringboot.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CommentMapper {
//    @Mapping(target = "id", ignore = true)
    @Mapping(target = "text", source = "commentDto.text")
    @Mapping(target = "user", source = "user")
    Comment toEntity(CommentCreationDto commentDto, User user);
    CommentDto toDto(Comment comment);
}
