package com.B2A4.storybook.global.utils.user;

import com.B2A4.storybook.domain.user.domain.User;
import com.B2A4.storybook.domain.user.domain.repository.UserRepository;
import com.B2A4.storybook.global.exception.UserNotFoundException;
import com.B2A4.storybook.global.utils.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserUtilsImpl implements UserUtils{

    private final UserRepository userRepository;

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> UserNotFoundException.EXCEPTION);
    }

    @Override
    public User getUserFromSecurityContext() {
        Long currentUserId = SecurityUtils.getCurrentUserId();
        User user = getUserById(currentUserId);

        return user;
    }

    @Override
    public User getUserEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> UserNotFoundException.EXCEPTION);}
}
