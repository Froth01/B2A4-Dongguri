package com.B2A4.storybook.global.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class RefreshTokenExpiredException extends MainException {

    public static final MainException EXCEPTION = new RefreshTokenExpiredException();

    private RefreshTokenExpiredException() {
        super(ErrorCode.REGISTER_EXPIRED_TOKEN);
    }
}
