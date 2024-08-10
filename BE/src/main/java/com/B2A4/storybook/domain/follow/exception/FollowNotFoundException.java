package com.B2A4.storybook.domain.follow.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class FollowNotFoundException extends MainException {

    public static final MainException EXCEPTION = new FollowNotFoundException();

    private FollowNotFoundException() {
        super(ErrorCode.FOLLOW_NOT_FOUND);
    }
}
