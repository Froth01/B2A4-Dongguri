package com.B2A4.storybook.domain.dailyKeyword.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class DailyKeywordNotFoundException extends MainException {

    public static final MainException EXCEPTION = new DailyKeywordNotFoundException();

    private DailyKeywordNotFoundException() {
        super(ErrorCode.DAILY_KEYWORD_NOT_FOUND);
    }
}
