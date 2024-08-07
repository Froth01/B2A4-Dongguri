package com.B2A4.storybook.domain.user.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class NicknameDuplicationException extends MainException {

    public static final MainException EXCEPTION = new NicknameDuplicationException();

    private NicknameDuplicationException() {
        super(ErrorCode.NICKNAME_DUPLICATION);
    }
}
