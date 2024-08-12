package com.B2A4.storybook.domain.comment.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class UserNotCommentHostException extends MainException {

    public static final MainException EXCEPTION = new UserNotCommentHostException();

    private UserNotCommentHostException() {
        super(ErrorCode.COMMENT_NOT_FOUND);
    }
}
