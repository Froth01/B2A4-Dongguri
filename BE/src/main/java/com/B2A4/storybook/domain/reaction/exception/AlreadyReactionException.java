package com.B2A4.storybook.domain.reaction.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class AlreadyReactionException extends MainException {

    public static final MainException EXCEPTION = new AlreadyReactionException();

    private AlreadyReactionException() {
        super(ErrorCode.REACTION_DUPLICATION);
    }
}
