package com.B2A4.storybook.domain.storyWorld.presentation.dto.response;

import com.B2A4.storybook.domain.storyWorld.domain.BackgroundType;
import com.B2A4.storybook.domain.storyWorld.domain.vo.StoryWorldInfoVO;

public record StoryWorldResponse(
        Long storyWorldId,
        BackgroundType backgroundType,
        String backgroundUrl
) {
    public StoryWorldResponse(StoryWorldInfoVO storyWorldInfoVO) {
        this(storyWorldInfoVO.storyWorldId(), storyWorldInfoVO.backgroundType(), storyWorldInfoVO.customBackgroundUrl());
    }
}
