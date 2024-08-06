package com.B2A4.storybook.domain.storybook.presentation.dto.response;

import com.B2A4.storybook.domain.storybook.domain.Genre;
import com.B2A4.storybook.domain.storybook.domain.vo.StorybookInfoVO;

import java.util.List;

public record StorybookResponse(
        Long storybookId,
        Genre genre,
        String content,
        String originalImageUrl,
        String transformedImageUrl,
        String transparentImageUrl,
        String voiceRecording,
        boolean isTodayKeyword,
        List<String> keywords,
        boolean isMine
) {
    public StorybookResponse(StorybookInfoVO storybookInfoVO, List<String> keywords, boolean isMine) {
        this(storybookInfoVO.id(), storybookInfoVO.genre(), storybookInfoVO.content(), storybookInfoVO.originalImageUrl()
                , storybookInfoVO.transformedImageUrl(), storybookInfoVO.transparentImageUrl(), storybookInfoVO.voiceRecordingUrl()
                , storybookInfoVO.isTodayKeyword(), keywords, isMine);
    }
}
