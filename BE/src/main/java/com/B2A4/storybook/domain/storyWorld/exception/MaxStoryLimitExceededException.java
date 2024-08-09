package com.B2A4.storybook.domain.storyWorld.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class MaxStoryLimitExceededException extends MainException {

    public static final MainException EXCEPTION = new MaxStoryLimitExceededException();

    private MaxStoryLimitExceededException() {
        super(ErrorCode.MAX_STORY_LIMIT_EXCEEDED);
    }
}
