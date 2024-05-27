package com.project.eventifyspringboot.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.eventifyspringboot.handler.ApiErrorDto;
import com.project.eventifyspringboot.service.UserService;
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
        if (authHeader == null || !authHeader.startsWith(BEARER_PREFIX)) {
            log.info("No bearer header");
            filterChain.doFilter(request, response);
            return;
        }
        String token = authHeader.substring(BEARER_PREFIX.length());
        try {
            if (!jwtService.isExpired(token)) {
                String id = jwtService.getUserId(token);
                log.info("User id - {}", id);

                AuthDetails authDetails = new AuthDetails(userService.findById(id));
                SecurityContextHolder.getContext()
                        .setAuthentication(new UsernamePasswordAuthenticationToken(authDetails, null, authDetails.getAuthorities()));
                filterChain.doFilter(request, response);
            } else {
                log.info("Token expired");
                setApiErrorResponse(response, "Token expired", 6);
            }
        } catch (Exception e) {
            log.info("Invalid token");
            setApiErrorResponse(response, "Invalid token", 7);
        }
    }

    private void setApiErrorResponse(HttpServletResponse response, String message, int errorCode) throws IOException {
        ApiErrorDto apiError = new ApiErrorDto(LocalDateTime.now(), HttpStatus.UNAUTHORIZED.value(), message, errorCode);
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType("application/json");
        response.getWriter().write(objectMapper.writeValueAsString(apiError));
        response.getWriter().flush();
    }
}
