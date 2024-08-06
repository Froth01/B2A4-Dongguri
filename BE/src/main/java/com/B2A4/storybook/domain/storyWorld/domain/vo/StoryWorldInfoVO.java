package com.B2A4.storybook.domain.storyWorld.domain.vo;

import com.B2A4.storybook.domain.storyWorld.domain.BackgroundType;

public record StoryWorldInfoVO(
        Long storyWorldId,
        BackgroundType backgroundType,
        String customBackgroundUrl
) {
}
