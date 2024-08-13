package com.B2A4.storybook.domain.comment.presentation.dto.response;

import com.B2A4.storybook.domain.comment.domain.vo.CommentInfoVO;
import com.B2A4.storybook.domain.user.domain.vo.UserInfoVO;

import java.time.LocalDateTime;

public record CommentResponse(
        Long commentId,
        Long storybookId,
        String comment,
        LocalDateTime created,
        Long userId,
        String nickname,
        String profileImageUrl

) {
    public CommentResponse(CommentInfoVO commentInfoVO, UserInfoVO userInfoVO) {
        this(commentInfoVO.commentId(), commentInfoVO.storybookId(), commentInfoVO.comment()
        , commentInfoVO.created(), userInfoVO.userId(), userInfoVO.nickname(), userInfoVO.profileImageUrl());
    }
}
