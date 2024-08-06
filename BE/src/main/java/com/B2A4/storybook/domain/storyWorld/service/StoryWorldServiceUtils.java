package com.B2A4.storybook.domain.storyWorld.service;

import com.B2A4.storybook.domain.storyWorld.domain.StoryWorld;
import com.B2A4.storybook.domain.user.domain.User;

public interface StoryWorldServiceUtils {

    StoryWorld createStoryWorld(User user);

    public StoryWorld queryStoryWorld(Long storyWorldId);

    public StoryWorld findByUser(User user);
}
