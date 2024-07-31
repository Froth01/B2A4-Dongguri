package com.B2A4.storybook.domain.oauth.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class UserInfoNotFoundException extends MainException {

    public static final MainException EXCEPTION = new UserInfoNotFoundException();

    private UserInfoNotFoundException() {
        super(ErrorCode.USER_INFO_NOT_FOUND);
    }
}
