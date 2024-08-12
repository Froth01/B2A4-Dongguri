package com.B2A4.storybook.domain.comment.presentation.dto.request;

public record CreateCommentRequest(
        Long storybookId,
        String content
) {
}
