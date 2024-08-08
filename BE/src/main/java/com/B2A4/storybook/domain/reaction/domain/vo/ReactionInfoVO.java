package com.B2A4.storybook.domain.reaction.domain.vo;

import com.B2A4.storybook.domain.reaction.domain.ReactionType;

public record ReactionInfoVO(
        Long reactionId,
        ReactionType reactionType
) {
}
