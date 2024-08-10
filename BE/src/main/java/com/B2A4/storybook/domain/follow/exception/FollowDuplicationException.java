package com.B2A4.storybook.domain.follow.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class FollowDuplicationException extends MainException {

    public static final MainException EXCEPTION = new FollowDuplicationException();

    private FollowDuplicationException() {
            super(ErrorCode.FOLLOW_DUPLICATION);
    }
}
