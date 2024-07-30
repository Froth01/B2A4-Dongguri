package com.B2A4.storybook.global.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class ExpiredTokenException extends MainException {

    public static final MainException EXCEPTION = new ExpiredTokenException();

    private ExpiredTokenException() {
        super(ErrorCode.EXPIRED_TOKEN);
    }
}
