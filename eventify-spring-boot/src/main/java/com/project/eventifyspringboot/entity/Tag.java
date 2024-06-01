package com.project.eventifyspringboot.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Tag {
    @Id
    private String id;
    private String tag;
}
