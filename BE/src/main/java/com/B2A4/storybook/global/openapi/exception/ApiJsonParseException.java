package com.B2A4.storybook.global.openapi.exception;


import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class ApiJsonParseException extends MainException {

    public static final MainException EXCEPTION = new ApiJsonParseException();

    private ApiJsonParseException() {
        super(ErrorCode.API_JSON_PARSE_ERROR);
    }
}