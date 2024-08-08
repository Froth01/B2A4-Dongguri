package com.B2A4.storybook.domain.reactionCount.presentation.dto.response;

import com.B2A4.storybook.domain.reactionCount.domain.vo.ReactionCountInfoVO;

public record ReactionCountResponse(
        Long id,
        int funCount,
        int happyCount,
        int sadCount,
        int joyCount
) {
    public ReactionCountResponse(ReactionCountInfoVO reactionCountInfoVO) {
        this(reactionCountInfoVO.id(), reactionCountInfoVO.funCount(), reactionCountInfoVO.happyCount(),
                reactionCountInfoVO.sadCount(), reactionCountInfoVO.joyCount());
    }
}
