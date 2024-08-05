package com.B2A4.storybook.domain.avatar.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class DuplicateAvatarException extends MainException {

    public static final MainException EXCEPTION = new DuplicateAvatarException();

    private DuplicateAvatarException() {
        super(ErrorCode.DUPLICATE_AVATAR);
    }
}
