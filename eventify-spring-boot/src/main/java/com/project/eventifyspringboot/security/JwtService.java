package com.project.eventifyspringboot.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.expiration-time-minutes}")
    private long expirationTime;

    public boolean isExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    public String getUserId(String token) {
        return getClaims(token).getSubject();
    }

    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String generateToken(String id) {
        Date issuedDateTime = new Date(System.currentTimeMillis());
        Date expirationDateTime = new Date(System.currentTimeMillis() + expirationTime * 60 * 1000);
        return Jwts.builder()
                .subject(id)
                .issuedAt(issuedDateTime)
                .expiration(expirationDateTime)
                .signWith(getSigningKey()).compact();
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
