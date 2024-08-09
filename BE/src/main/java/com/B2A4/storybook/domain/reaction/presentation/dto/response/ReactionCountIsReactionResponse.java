package com.B2A4.storybook.domain.reaction.presentation.dto.response;

import com.B2A4.storybook.domain.reactionCount.presentation.dto.response.ReactionCountResponse;

public record ReactionCountIsReactionResponse(
        int funCount,
        boolean isFunReaction,
        int happyCount,
        boolean isHappyReaction,
        int sadCount,
        boolean isSadReaction,
        int joyCount,
        boolean isJoyReaction
) {
    public ReactionCountIsReactionResponse(ReactionCountResponse response, boolean isFunReaction, boolean isHappyReaction, boolean isSadReaction, boolean isJoyReaction) {
        this(response.funCount(), isFunReaction, response.happyCount(), isHappyReaction, response.sadCount(), isSadReaction,
                response.joyCount(), isJoyReaction);
    }
}
