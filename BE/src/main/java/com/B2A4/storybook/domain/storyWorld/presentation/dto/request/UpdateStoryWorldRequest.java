package com.B2A4.storybook.domain.storyWorld.presentation.dto.request;

import com.B2A4.storybook.domain.storyWorld.domain.BackgroundType;

public record UpdateStoryWorldRequest(
        BackgroundType backgroundType,
        String customBackgroundUrl
) {
}
