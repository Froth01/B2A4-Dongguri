package com.B2A4.storybook.domain.dailyKeyword.domain.vo;

import com.B2A4.storybook.domain.dailyKeyword.domain.CharacterKeyword;
import com.B2A4.storybook.domain.dailyKeyword.domain.PlaceKeyword;
import com.B2A4.storybook.domain.storybook.domain.Genre;

public record DailyKeywordInfoVO(
        PlaceKeyword placeKeyword,
        CharacterKeyword characterKeyword,
        Genre genreKeyword
) {
}
