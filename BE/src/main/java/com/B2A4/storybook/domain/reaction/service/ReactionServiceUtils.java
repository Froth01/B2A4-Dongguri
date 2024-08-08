package com.B2A4.storybook.domain.reaction.service;

import com.B2A4.storybook.domain.reaction.presentation.dto.request.CreateReactionRequest;
import com.B2A4.storybook.domain.reaction.presentation.dto.request.DeleteReactionRequest;
import com.B2A4.storybook.domain.reaction.presentation.dto.response.ReactionResponse;

public interface ReactionServiceUtils {
    ReactionResponse createReaction(CreateReactionRequest createReactionRequest);

    void deleteReaction(DeleteReactionRequest deleteReactionRequest);
}
