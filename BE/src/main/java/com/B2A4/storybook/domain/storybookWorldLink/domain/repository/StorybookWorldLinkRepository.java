package com.B2A4.storybook.domain.storybookWorldLink.domain.repository;

import com.B2A4.storybook.domain.storyWorld.domain.StoryWorld;
import com.B2A4.storybook.domain.storybookWorldLink.domain.StorybookWorldLink;
import com.B2A4.storybook.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StorybookWorldLinkRepository extends JpaRepository<StorybookWorldLink, Long> {
    void deleteAllByStoryWorld(StoryWorld storyWorld);

    List<StorybookWorldLink> findAllByStoryWorld(StoryWorld storyWorld);
}
