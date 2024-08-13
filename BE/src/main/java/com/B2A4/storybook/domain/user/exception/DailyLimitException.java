package com.B2A4.storybook.domain.user.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class DailyLimitException extends MainException {

    public static final MainException EXCEPTION = new DailyLimitException();

    private DailyLimitException() {
        super(ErrorCode.DAILY_COUNT_LIMIT);
    }
}
