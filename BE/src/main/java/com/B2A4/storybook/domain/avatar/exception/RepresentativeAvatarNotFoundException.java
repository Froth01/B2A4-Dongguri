package com.B2A4.storybook.domain.avatar.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class RepresentativeAvatarNotFoundException extends MainException {

    public static final MainException EXCEPTION = new RepresentativeAvatarNotFoundException();

    private RepresentativeAvatarNotFoundException() {
        super(ErrorCode.REPRESENTATIVE_AVATAR_NOT_FOUND);
    }
}
