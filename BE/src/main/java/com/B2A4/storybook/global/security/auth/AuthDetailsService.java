package com.B2A4.storybook.global.security.auth;

import com.B2A4.storybook.domain.user.domain.User;
import com.B2A4.storybook.domain.user.domain.repository.UserRepository;
import com.B2A4.storybook.global.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        User user =
                userRepository
                        .findById(Long.valueOf(id))
                        .orElseThrow(() -> UserNotFoundException.EXCEPTION);
        return new AuthDetails(user.getId().toString());
    }
}
