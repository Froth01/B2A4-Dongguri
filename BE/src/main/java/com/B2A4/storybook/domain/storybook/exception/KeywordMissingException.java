package com.B2A4.storybook.domain.storybook.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class KeywordMissingException extends MainException {

    public static final MainException EXCEPTION = new KeywordMissingException();

    private KeywordMissingException() {
        super(ErrorCode.KEYWORD_MISSING);
    }
}
