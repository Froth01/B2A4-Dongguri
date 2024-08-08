package com.B2A4.storybook.domain.report.presentation.dto.request;

import com.B2A4.storybook.domain.report.domain.ContentType;
import com.B2A4.storybook.domain.report.domain.ReportType;

public record CreateReportRequest(
        Long contentId,
        ContentType contentType,
        ReportType reportType,
        String reportReason,
        Long attackerId
) {
}
