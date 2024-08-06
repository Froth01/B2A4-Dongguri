package com.B2A4.storybook.domain.storyWorld.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class UserNotStoryWorldHostException extends MainException {

    public final static MainException EXCEPTION = new UserNotStoryWorldHostException();

    private UserNotStoryWorldHostException() {
        super(ErrorCode.USER_NOT_STORY_WORLD_HOST);
    }
}
