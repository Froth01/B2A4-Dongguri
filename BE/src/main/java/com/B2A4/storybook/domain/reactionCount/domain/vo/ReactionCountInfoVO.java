package com.B2A4.storybook.domain.reactionCount.domain.vo;

public record ReactionCountInfoVO(
        Long id,
        int funCount,
        int happyCount,
        int sadCount,
        int joyCount
) {
}
