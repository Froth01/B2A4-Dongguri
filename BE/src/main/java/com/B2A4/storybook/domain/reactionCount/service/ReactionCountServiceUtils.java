package com.B2A4.storybook.domain.reactionCount.service;

import com.B2A4.storybook.domain.reaction.domain.ReactionType;
import com.B2A4.storybook.domain.reactionCount.domain.ReactionCount;
import com.B2A4.storybook.domain.reactionCount.presentation.dto.response.ReactionCountResponse;

public interface ReactionCountServiceUtils {
    void createReactionCount(Long storybookId);
    void addReactionCount(Long storybookIdk, ReactionType reactionType);

    void subReactionCount(Long storybookId, ReactionType reactionType);
    ReactionCountResponse getReactionCount(Long storybookId);

    ReactionCount queryReactionCountByStorybook(Long storybookId);
}
