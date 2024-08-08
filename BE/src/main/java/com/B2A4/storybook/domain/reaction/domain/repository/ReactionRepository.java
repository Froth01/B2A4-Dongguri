package com.B2A4.storybook.domain.reaction.domain.repository;

import com.B2A4.storybook.domain.reaction.domain.Reaction;
import com.B2A4.storybook.domain.reaction.domain.ReactionType;
import com.B2A4.storybook.domain.storybook.domain.Storybook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReactionRepository extends JpaRepository<Reaction, Long> {
    boolean existsByStorybookAndReactionType(Storybook storybook, ReactionType reactionType);
}
