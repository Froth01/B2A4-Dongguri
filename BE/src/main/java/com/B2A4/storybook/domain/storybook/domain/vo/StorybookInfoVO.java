package com.B2A4.storybook.domain.storybook.domain.vo;

import com.B2A4.storybook.domain.storybook.domain.Genre;
import com.B2A4.storybook.domain.user.domain.vo.UserInfoVO;

import java.time.LocalDateTime;

public record StorybookInfoVO(
        Long storybookId,
        UserInfoVO user,
        Genre genre,
        String content,
        String originalImageUrl,
        String transformedImageUrl,
        String transparentImageUrl,
        String voiceRecordingUrl,
        boolean isTodayKeyword,
        LocalDateTime createdDate,
        LocalDateTime lastModifyDate
) {
}
