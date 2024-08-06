package com.B2A4.storybook.domain.storybook.exception;

import com.B2A4.storybook.domain.avatar.exception.AvatarNotFoundException;
import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class StorybookNotFoundException extends MainException {

    public static final MainException EXCEPTION = new StorybookNotFoundException();

    private StorybookNotFoundException() {
        super(ErrorCode.STORYBOOK_NOT_FOUND);
    }
}
