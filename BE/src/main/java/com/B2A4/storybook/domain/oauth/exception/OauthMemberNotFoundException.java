package com.B2A4.storybook.domain.oauth.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class OauthMemberNotFoundException extends MainException {

    public static final MainException EXCEPTION = new OauthMemberNotFoundException();

    private OauthMemberNotFoundException() {
        super(ErrorCode.OAUTH_MEMBER_NOT_FOUND);
    }
}
