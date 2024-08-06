package com.B2A4.storybook.domain.storyWorld.domain.repository;

import com.B2A4.storybook.domain.storyWorld.domain.StoryWorld;
import com.B2A4.storybook.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface StoryWorldRepository extends JpaRepository<StoryWorld, Long> {

    Optional<StoryWorld> findByUser(User user);
}
