package com.B2A4.storybook.domain.reactionCount.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class ReactionCountNotFoundException extends MainException {

    public static final MainException EXCEPTION = new ReactionCountNotFoundException();

    private ReactionCountNotFoundException() {
        super(ErrorCode.REACTION_COUNT_NOT_FOUND);
    }
}
