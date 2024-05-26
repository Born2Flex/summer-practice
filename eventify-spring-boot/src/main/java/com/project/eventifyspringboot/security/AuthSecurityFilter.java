package com.project.eventifyspringboot.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.eventifyspringboot.handler.ApiErrorDto;
import com.project.eventifyspringboot.service.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class AuthSecurityFilter extends OncePerRequestFilter {
    private static final String BEARER_PREFIX = "Bearer ";
    private static final String AUTH_HEADER = "Authorization";
    private final JwtService jwtService;
    private final UserService userService;
    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("Request to uri - {}", request.getRequestURI());
        String authHeader = request.getHeader(AUTH_HEADER);
        if (authHeader == null || authHeader.isBlank() || !authHeader.startsWith(BEARER_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }
        String token = authHeader.substring(BEARER_PREFIX.length());
        try {
            String id = jwtService.getUserId(token);
            putUserInContext(request, response, filterChain, id);
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT token", e);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            ApiErrorDto apiErrorDto = new ApiErrorDto(LocalDateTime.now(), 401, "JWT token expired", 6);
            response.getWriter().write(objectMapper.writeValueAsString(apiErrorDto));
            response.getWriter().flush();
        }
    }

    private void putUserInContext(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain, String id) throws IOException, ServletException {
        try {
            AuthDetails authDetails = new AuthDetails(userService.findById(id));
            SecurityContextHolder.getContext()
                    .setAuthentication(new UsernamePasswordAuthenticationToken(authDetails, null, authDetails.getAuthorities()));
            filterChain.doFilter(request, response);
        } catch (ResponseStatusException e) {
            log.info("User with id {} not found", id, e);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }
}
