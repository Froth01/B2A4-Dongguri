package com.B2A4.storybook.domain.report.domain.vo;

import com.B2A4.storybook.domain.report.domain.ContentType;
import com.B2A4.storybook.domain.report.domain.ReportType;

public record ReportInfoVo(
        Long reportId,
        Long contentId,
        ContentType contentType,
        ReportType reportType,
        Long attackerId,
        String reportReason
) {
}
