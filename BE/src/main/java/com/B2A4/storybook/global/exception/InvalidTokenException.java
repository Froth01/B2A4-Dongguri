package com.B2A4.storybook.global.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class InvalidTokenException extends MainException {

    public static final MainException EXCEPTION = new InvalidTokenException();

    private InvalidTokenException() {
        super(ErrorCode.INVALID_TOKEN);
    }
}
