package com.B2A4.storybook.domain.storyWorld.presentation.dto.response;

import com.B2A4.storybook.domain.storyWorld.domain.BackgroundType;
import com.B2A4.storybook.domain.storyWorld.domain.vo.StoryWorldInfoVO;

import java.util.List;

public record StoryWorldResponse(
        Long storyWorldId,
        BackgroundType backgroundType,
        String backgroundUrl,
        List<StoryWorldStorybookResponse> storybooks
) {
    public StoryWorldResponse(StoryWorldInfoVO storyWorldInfoVO, List<StoryWorldStorybookResponse> storyWorldStorybookResponseList) {
        this(storyWorldInfoVO.storyWorldId(), storyWorldInfoVO.backgroundType(), storyWorldInfoVO.customBackgroundUrl(), storyWorldStorybookResponseList);
    }
}
