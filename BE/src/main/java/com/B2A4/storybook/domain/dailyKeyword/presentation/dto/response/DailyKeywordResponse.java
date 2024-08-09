package com.B2A4.storybook.domain.dailyKeyword.presentation.dto.response;

import com.B2A4.storybook.domain.dailyKeyword.domain.vo.DailyKeywordInfoVO;

public record DailyKeywordResponse(
        String placeKeyword,
        String characterKeyword,
        String genreKeyword
) {
    public DailyKeywordResponse(DailyKeywordInfoVO dailyKeywordInfoVO) {
        this(dailyKeywordInfoVO.placeKeyword().getType(), dailyKeywordInfoVO.characterKeyword().getType(), dailyKeywordInfoVO.genreKeyword().getName());
    }
}
