package com.B2A4.storybook.domain.storybookWorldLink.service;

import com.B2A4.storybook.domain.storyWorld.domain.StoryWorld;
import com.B2A4.storybook.domain.storybook.domain.vo.StorybookInfoVO;

import java.util.List;

public interface StorybookWorldLinkServiceUtils {
    List<StorybookInfoVO> createStorybookWorldLink(StoryWorld storyWorld, List<Long> storybookIds);

    List<StorybookInfoVO> getStorybookList(StoryWorld storyWorld);
}
