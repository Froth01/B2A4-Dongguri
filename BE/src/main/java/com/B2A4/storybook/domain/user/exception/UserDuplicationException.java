package com.B2A4.storybook.domain.user.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class UserDuplicationException extends MainException {

    public static final MainException EXCEPTION = new UserDuplicationException();

    private UserDuplicationException() {
        super(ErrorCode.USER_DUPLICATION);
    }
}
