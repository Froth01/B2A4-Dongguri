package com.B2A4.storybook.domain.storybook.presentation.dto.response;

import com.B2A4.storybook.domain.keyword.domain.Keyword;
import com.B2A4.storybook.domain.storybook.domain.Genre;
import com.B2A4.storybook.domain.storybook.domain.vo.StorybookInfoVO;

import java.util.List;

public record StorybookResponse(
        Long storybookId,
        Genre genre,
        String content,
        String originalImageUrl,
        String transformedImageUrl,
        String voiceRecording,
        boolean isTodayKeyword,
        List<String> keywords
) {
//    public Storybook(StorybookInfoVO storybookInfoVO, List<String> keywords)
}
