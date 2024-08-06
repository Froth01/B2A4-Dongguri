package com.B2A4.storybook.domain.file.exception;


import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class InvalidUrlException extends MainException {

    public static final MainException EXCEPTION = new InvalidUrlException();

    private InvalidUrlException() {
        super(ErrorCode.INVALID_URL);
    }
}