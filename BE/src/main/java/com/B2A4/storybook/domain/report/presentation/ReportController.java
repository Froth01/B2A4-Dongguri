package com.B2A4.storybook.domain.report.presentation;

import com.B2A4.storybook.domain.report.presentation.dto.request.CreateReportRequest;
import com.B2A4.storybook.domain.report.presentation.dto.request.UpdateProcessingStatusRequest;
import com.B2A4.storybook.domain.report.presentation.dto.response.ReportResponse;
import com.B2A4.storybook.domain.report.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @Operation(summary = "신고하기")
    @PostMapping
    public ReportResponse createReport(@RequestBody CreateReportRequest createReportRequest) {
        return reportService.createReport(createReportRequest);
    }

    @Operation(summary = "신고 처리하기")
    @PatchMapping("/{reportId}")
    public void updateProcessingStatus(@PathVariable Long reportId, @RequestBody UpdateProcessingStatusRequest updateProcessingStatusRequest) {
        reportService.updateProcessingStatus(reportId, updateProcessingStatusRequest);
    }
}
