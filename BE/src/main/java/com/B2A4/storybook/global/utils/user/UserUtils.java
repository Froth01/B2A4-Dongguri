package com.B2A4.storybook.global.utils.user;

import com.B2A4.storybook.domain.user.domain.User;

public interface UserUtils {
    User getUserById(Long id);

    User getUserFromSecurityContext();

    User getUserEmail(String email);
}
