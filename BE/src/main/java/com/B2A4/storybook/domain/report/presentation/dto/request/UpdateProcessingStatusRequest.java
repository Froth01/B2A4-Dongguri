package com.B2A4.storybook.domain.report.presentation.dto.request;

import com.B2A4.storybook.domain.report.domain.ProcessingStatus;

public record UpdateProcessingStatusRequest(
        ProcessingStatus processingStatus
) {
}
