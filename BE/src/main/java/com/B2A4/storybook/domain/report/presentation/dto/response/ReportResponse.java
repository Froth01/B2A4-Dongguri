package com.B2A4.storybook.domain.report.presentation.dto.response;

import com.B2A4.storybook.domain.report.domain.ContentType;
import com.B2A4.storybook.domain.report.domain.ReportType;
import com.B2A4.storybook.domain.report.domain.vo.ReportInfoVo;

public record ReportResponse(
        Long reportId,
        Long contentId,
        ContentType contentType,
        ReportType reportType,
        Long attackerId,
        String reportReason
) {
    public ReportResponse (ReportInfoVo reportInfoVo) {
        this(reportInfoVo.reportId(), reportInfoVo.contentId(), reportInfoVo.contentType(), reportInfoVo.reportType(),
                reportInfoVo.attackerId(), reportInfoVo.reportReason());
    }
}
