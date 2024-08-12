package com.B2A4.storybook.domain.comment.presentation.dto.response;

import com.B2A4.storybook.domain.comment.domain.vo.CommentInfoVO;

import java.time.LocalDateTime;

public record CommentResponse(
        Long commentId,
        Long userId,
        Long storybookId,
        String comment,
        LocalDateTime created
) {
    public CommentResponse(CommentInfoVO commentInfoVO) {
        this(commentInfoVO.commentId(), commentInfoVO.userId(), commentInfoVO.storybookId(), commentInfoVO.comment()
        , commentInfoVO.created());
    }
}
