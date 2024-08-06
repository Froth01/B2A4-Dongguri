package com.B2A4.storybook.domain.storybook.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class UserNotStorybookHostException extends MainException {

    public static final MainException EXCEPTION = new UserNotStorybookHostException();

    private UserNotStorybookHostException() {
        super(ErrorCode.USER_NOT_STORYBOOK_HOST);
    }
}
