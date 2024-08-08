package com.B2A4.storybook.domain.reaction.presentation.dto.request;

import com.B2A4.storybook.domain.reaction.domain.ReactionType;

public record DeleteReactionRequest(
        Long storybookId,
        ReactionType reactionType
) {
}
