package com.B2A4.storybook.domain.report.domain.repository;

import com.B2A4.storybook.domain.report.domain.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {
}
