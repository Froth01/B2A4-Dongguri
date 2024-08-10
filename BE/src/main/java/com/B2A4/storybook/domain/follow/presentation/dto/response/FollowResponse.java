package com.B2A4.storybook.domain.follow.presentation.dto.response;

import com.B2A4.storybook.domain.user.domain.vo.UserInfoVO;

public record FollowResponse(
        Long followId,
        Long userId,
        String nickname,
        String profileImageUrl,
        boolean isFollow
) {
    public FollowResponse(Long followId, UserInfoVO userInfoVO, boolean isFollow) {
        this(
                followId,
                userInfoVO.userId(),
                userInfoVO.nickname(),
                userInfoVO.profileImageUrl(),
                isFollow
        );
    }
}
