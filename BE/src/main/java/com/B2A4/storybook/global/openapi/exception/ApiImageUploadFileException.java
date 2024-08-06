package com.B2A4.storybook.global.openapi.exception;


import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class ApiImageUploadFileException extends MainException {

    public static final MainException EXCEPTION = new ApiImageUploadFileException();

    private ApiImageUploadFileException() {
        super(ErrorCode.API_IMAGE_UPLOAD_FILE);
    }
}