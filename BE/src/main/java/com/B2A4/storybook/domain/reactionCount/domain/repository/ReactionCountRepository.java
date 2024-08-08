package com.B2A4.storybook.domain.reactionCount.domain.repository;

import com.B2A4.storybook.domain.reactionCount.domain.ReactionCount;
import com.B2A4.storybook.domain.storybook.domain.Storybook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReactionCountRepository extends JpaRepository<ReactionCount, Long> {

    Optional<ReactionCount> findByStorybook(Storybook storybook);
}
