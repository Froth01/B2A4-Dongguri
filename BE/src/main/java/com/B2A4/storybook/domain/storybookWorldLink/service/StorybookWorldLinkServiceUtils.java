package com.B2A4.storybook.domain.storybookWorldLink.service;

import com.B2A4.storybook.domain.storyWorld.domain.StoryWorld;
import com.B2A4.storybook.domain.storyWorld.presentation.dto.response.StoryWorldStorybookResponse;

import java.util.List;

public interface StorybookWorldLinkServiceUtils {
    List<StoryWorldStorybookResponse> createStorybookWorldLink(StoryWorld storyWorld, List<Long> storybookIds);

    List<StoryWorldStorybookResponse> getStorybookList(StoryWorld storyWorld);
}
