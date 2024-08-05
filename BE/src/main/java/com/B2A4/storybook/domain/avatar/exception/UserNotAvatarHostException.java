package com.B2A4.storybook.domain.avatar.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class UserNotAvatarHostException extends MainException {

    public final static MainException EXCEPTION = new UserNotAvatarHostException();

    private UserNotAvatarHostException() {
        super(ErrorCode.USER_NOT_AVATAR_HOST);
    }
}
