package com.B2A4.storybook.domain.report.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class ReportNotFoundException extends MainException {

    public static final MainException EXCEPTION = new ReportNotFoundException();

    private ReportNotFoundException() {
        super(ErrorCode.REPORT_NOT_FOUND);
    }
}
