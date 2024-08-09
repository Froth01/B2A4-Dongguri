package com.B2A4.storybook.domain.storybook.presentation.dto.response;

import com.B2A4.storybook.domain.storybook.domain.Genre;
import com.B2A4.storybook.domain.storybook.domain.vo.StorybookInfoVO;

import java.time.LocalDateTime;
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
        LocalDateTime createdDate,
        LocalDateTime lastModifyDate,
        List<String> keywords,
        boolean isMine
) {
    public StorybookResponse(StorybookInfoVO storybookInfoVO, List<String> keywords, boolean isMine) {
        this(
                storybookInfoVO.storybookId(),
                storybookInfoVO.genre(),
                storybookInfoVO.content(),
                storybookInfoVO.originalImageUrl(),
                storybookInfoVO.transformedImageUrl(),
                storybookInfoVO.transparentImageUrl(),
                storybookInfoVO.voiceRecordingUrl(),
                storybookInfoVO.isTodayKeyword(),
                storybookInfoVO.createdDate(),
                storybookInfoVO.lastModifyDate(),
                keywords,
                isMine);
    }
}
