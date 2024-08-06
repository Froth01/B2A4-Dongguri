package com.B2A4.storybook.domain.file.exception;


import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class ImageProcessingException extends MainException {

    public static final MainException EXCEPTION = new ImageProcessingException();

    private ImageProcessingException() {
        super(ErrorCode.IMAGE_PROCESSING);
    }
}