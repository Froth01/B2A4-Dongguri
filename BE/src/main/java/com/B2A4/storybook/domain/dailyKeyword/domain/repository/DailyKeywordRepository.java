package com.B2A4.storybook.domain.dailyKeyword.domain.repository;

import com.B2A4.storybook.domain.dailyKeyword.domain.DailyKeyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Optional;

public interface DailyKeywordRepository extends JpaRepository<DailyKeyword, Long> {

    @Query("SELECT d FROM DailyKeyword d WHERE d.createdDate >= :start AND d.createdDate < :end")
    Optional<DailyKeyword> findByCreatedDateBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(d) > 0 FROM DailyKeyword d WHERE d.createdDate >= :start AND d.createdDate < :end")
    boolean existsByCreatedDateBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}
