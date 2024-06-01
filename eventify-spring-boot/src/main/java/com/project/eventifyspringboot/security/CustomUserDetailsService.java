package com.project.eventifyspringboot.security;

import com.project.eventifyspringboot.entity.User;
import com.project.eventifyspringboot.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Can`t find user by email: " + username));
        return new AuthDetails(user);
    }

    public static AuthDetails getDetails(Principal principal) {
        return (AuthDetails) (((UsernamePasswordAuthenticationToken) principal).getPrincipal());
    }
}