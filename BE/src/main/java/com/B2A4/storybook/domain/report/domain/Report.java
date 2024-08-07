package com.B2A4.storybook.domain.report.domain;

import com.B2A4.storybook.domain.report.domain.vo.ReportInfoVo;
import com.B2A4.storybook.global.database.BaseEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static com.B2A4.storybook.domain.report.domain.ProcessingStatus.RECEIPT;
import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Report extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "report_id")
    private Long id;

    private Long contentId;

    @Enumerated(STRING)
    private ContentType contentType;

    @Enumerated(STRING)
    private ReportType reportType;

    @Enumerated(STRING)
    private ProcessingStatus processingStatus;

    private Long attackerId;

    private String reportReason;

    @Builder
    public Report(Long contentId, ContentType contentType, ReportType reportType,
                  ProcessingStatus processingStatus, Long attackerId, String reportReason) {
        this.contentId = contentId;
        this.contentType = contentType;
        this.reportType = reportType;
        this.processingStatus = processingStatus;
        this.attackerId = attackerId;
        this.reportReason = reportReason;
    }

    public static Report createReport(Long contentId, ContentType contentType, ReportType reportType,
                                      Long attackerId, String reportReason) {
        return builder()
                .contentId(contentId)
                .contentType(contentType)
                .reportType(reportType)
                .processingStatus(RECEIPT)
                .attackerId(attackerId)
                .reportReason(reportReason)
                .build();
    }

    public ReportInfoVo getReportInfoVo() {
        return new ReportInfoVo(id, contentId, contentType, reportType, attackerId, reportReason);
    }

    public void updateProcessingStatus(ProcessingStatus processingStatus) {
        this.processingStatus = processingStatus;
    }
}
