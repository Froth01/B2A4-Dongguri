package com.B2A4.storybook.domain.follow.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class UserNotFollowHostException extends MainException {

    public static final MainException EXCEPTION = new UserNotFollowHostException();

    private UserNotFollowHostException() {
        super(ErrorCode.USER_NOT_FOLLOW_HOST);
    }
}
