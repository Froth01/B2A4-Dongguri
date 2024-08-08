package com.B2A4.storybook.domain.dailyKeyword.service;

import com.B2A4.storybook.domain.dailyKeyword.domain.DailyKeyword;
import com.B2A4.storybook.domain.dailyKeyword.domain.repository.DailyKeywordRepository;
import com.B2A4.storybook.domain.dailyKeyword.exception.DailyKeywordNotFoundException;
import com.B2A4.storybook.domain.dailyKeyword.presentation.dto.response.DailyKeywordResponse;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DailyKeywordService {

    private final DailyKeywordRepository dailyKeywordRepository;

    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul")
    @Transactional
    public void scheduledCreateDailyKeyword() {
        createDailyKeyword();
    }


    @PostConstruct
    public void init() {
        createDailyKeyword();
        log.info("서버 시작 호출");
    }

    public DailyKeywordResponse getDailyKeyword() {
        LocalDate now = LocalDate.now();

        LocalDateTime startOfDay = now.atStartOfDay();
        LocalDateTime endOfDay = now.atTime(23, 59, 59, 999999999);

        DailyKeyword dailyKeyword = dailyKeywordRepository.findByCreatedDateBetween(startOfDay, endOfDay)
                .orElseThrow(() -> DailyKeywordNotFoundException.EXCEPTION);

        return new DailyKeywordResponse(dailyKeyword.getDailyKeywordInfoVO());
    }

    private void createDailyKeyword() {
        LocalDate now = LocalDate.now();

        LocalDateTime startOfDay = now.atStartOfDay();
        LocalDateTime endOfDay = now.atTime(23, 59, 59, 999999999);

        if (!dailyKeywordRepository.existsByCreatedDateBetween(startOfDay, endOfDay)) {
            DailyKeyword dailyKeyword = DailyKeyword.createDailyKeyword();

            dailyKeywordRepository.save(dailyKeyword);

            log.info("오늘의 키워드 생성");
        }
    }
}
