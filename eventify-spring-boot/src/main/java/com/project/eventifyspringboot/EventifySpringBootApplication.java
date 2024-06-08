package com.project.eventifyspringboot;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication
public class EventifySpringBootApplication {

    public static void main(String[] args) {
        SpringApplication.run(EventifySpringBootApplication.class, args);
    }

    @PostConstruct
    public void init() {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
    }
}
