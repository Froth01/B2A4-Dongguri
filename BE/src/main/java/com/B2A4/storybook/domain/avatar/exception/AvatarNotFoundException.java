package com.B2A4.storybook.domain.avatar.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class AvatarNotFoundException extends MainException {

    public static final MainException EXCEPTION = new AvatarNotFoundException();

    private AvatarNotFoundException() {
        super(ErrorCode.AVATAR_NOT_FOUND);
    }
}
