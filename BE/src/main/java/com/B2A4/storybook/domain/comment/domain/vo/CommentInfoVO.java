package com.B2A4.storybook.domain.comment.domain.vo;

import java.time.LocalDateTime;

public record CommentInfoVO(
        Long commentId,
        Long userId,
        Long storybookId,
        String comment,
        LocalDateTime created
) {
}
