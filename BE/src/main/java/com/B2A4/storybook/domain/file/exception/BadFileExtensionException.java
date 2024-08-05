package com.B2A4.storybook.domain.file.exception;


import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class BadFileExtensionException extends MainException {

    public static final MainException EXCEPTION = new BadFileExtensionException();
    private BadFileExtensionException() {
        super(ErrorCode.BAD_FILE_EXTENSION);
    }
}