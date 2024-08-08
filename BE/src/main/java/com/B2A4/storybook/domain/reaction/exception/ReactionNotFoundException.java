package com.B2A4.storybook.domain.reaction.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class ReactionNotFoundException extends MainException {

    public static final MainException EXCEPTION = new ReactionNotFoundException();

    private ReactionNotFoundException() {
        super(ErrorCode.REACTION_NOT_FOUND);
    }
}
