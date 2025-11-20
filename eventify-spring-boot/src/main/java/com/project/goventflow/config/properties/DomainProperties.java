package com.project.goventflow.config.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "domain")
public class DomainProperties {
    private String back;
    private String front;
}
