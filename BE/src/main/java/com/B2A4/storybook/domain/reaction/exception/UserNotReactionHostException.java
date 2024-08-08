package com.B2A4.storybook.domain.reaction.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class UserNotReactionHostException extends MainException {

    public static final MainException EXCEPTION = new UserNotReactionHostException();

    private UserNotReactionHostException() {
        super(ErrorCode.USER_NOT_REACTION_HOST);
    }
}
