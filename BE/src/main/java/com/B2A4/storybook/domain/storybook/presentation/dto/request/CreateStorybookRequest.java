package com.B2A4.storybook.domain.storybook.presentation.dto.request;

import com.B2A4.storybook.domain.storybook.domain.Genre;

import java.util.List;

public record CreateStorybookRequest(
        Genre genre,
        List<String> keyword,
        String content,
        String originalImageUrl,
        String transformedImageUrl,
        String voiceRecording,
        boolean isTodayKeyword
) {
}
