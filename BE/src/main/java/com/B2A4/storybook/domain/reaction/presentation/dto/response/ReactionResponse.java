package com.B2A4.storybook.domain.reaction.presentation.dto.response;

import com.B2A4.storybook.domain.reaction.domain.ReactionType;
import com.B2A4.storybook.domain.reaction.domain.vo.ReactionInfoVO;

public record ReactionResponse(
        Long reactionId,
        ReactionType reactionType
) {
    public ReactionResponse(ReactionInfoVO reactionInfoVO) {
        this(reactionInfoVO.reactionId(), reactionInfoVO.reactionType());
    }
}
