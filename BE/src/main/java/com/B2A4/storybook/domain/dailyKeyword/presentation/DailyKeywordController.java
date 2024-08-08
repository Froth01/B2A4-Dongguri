package com.B2A4.storybook.domain.dailyKeyword.presentation;

import com.B2A4.storybook.domain.dailyKeyword.presentation.dto.response.DailyKeywordResponse;
import com.B2A4.storybook.domain.dailyKeyword.service.DailyKeywordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "오늘의 키워드", description = "오늘의 키워드 관련 API")
@RestController
@RequestMapping("/api/today-keyword")
@RequiredArgsConstructor
public class DailyKeywordController {

    private final DailyKeywordService dailyKeywordService;

    @Operation(summary = "오늘의 키워드 조회하기")
    @GetMapping
    public DailyKeywordResponse getDailyKeyword() {
        return dailyKeywordService.getDailyKeyword();
    }
}
