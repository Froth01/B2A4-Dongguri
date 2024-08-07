package com.B2A4.storybook.domain.report.service;

import com.B2A4.storybook.domain.report.domain.ProcessingStatus;
import com.B2A4.storybook.domain.report.domain.Report;
import com.B2A4.storybook.domain.report.domain.repository.ReportRepository;
import com.B2A4.storybook.domain.report.exception.ReportNotFoundException;
import com.B2A4.storybook.domain.report.presentation.dto.request.CreateReportRequest;
import com.B2A4.storybook.domain.report.presentation.dto.request.UpdateProcessingStatusRequest;
import com.B2A4.storybook.domain.report.presentation.dto.response.ReportResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReportService {

    private final ReportRepository reportRepository;

    @Transactional
    public ReportResponse createReport(CreateReportRequest createReportRequest) {
        Report report = Report.createReport(
                createReportRequest.contentId(),
                createReportRequest.contentType(),
                createReportRequest.reportType(),
                createReportRequest.attackerId(),
                createReportRequest.reportReason()
        );

        reportRepository.save(report);

        return new ReportResponse(report.getReportInfoVo());
    }

    @Transactional
    public void updateProcessingStatus(Long reportId, UpdateProcessingStatusRequest request) {
        Report report = reportRepository.findById(reportId).orElseThrow(() -> ReportNotFoundException.EXCEPTION);
        ProcessingStatus processingStatus = request.processingStatus();

        report.updateProcessingStatus(processingStatus);
    }
}
