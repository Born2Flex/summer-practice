package com.project.goventflow.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "refresh_tokens")
public class RefreshToken {
    @Id
    private String id;
    private String userId;
    private String token;
    private LocalDateTime expirationDate;
    private boolean revoked;
    
    public RefreshToken(String userId, String token, LocalDateTime expirationDate) {
        this.userId = userId;
        this.token = token;
        this.expirationDate = expirationDate;
        this.revoked = false;
    }
    
    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expirationDate);
    }
}
