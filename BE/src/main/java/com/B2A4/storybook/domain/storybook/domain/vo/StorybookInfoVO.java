package com.B2A4.storybook.domain.storybook.domain.vo;

import com.B2A4.storybook.domain.storybook.domain.Genre;
import com.B2A4.storybook.domain.user.domain.User;
import com.B2A4.storybook.domain.user.domain.vo.UserInfoVO;

public record StorybookInfoVO(
        Long id,
        UserInfoVO user,
        Genre genre,
        String content,
        String originalImageUrl,
        String transformedImageUrl,
        String transparentImageUrl,
        String voiceRecordingUrl,
        boolean isTodayKeyword
) {
}
