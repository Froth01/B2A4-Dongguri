package com.B2A4.storybook.domain.user.presentation.dto.response;

import com.B2A4.storybook.domain.user.domain.vo.UserInfoVO;

public record UserBasicProfileResponse(
        Long userId,
        String nickname,
        String profileImageUrl,
        int followingCount,
        int followerCount,
        boolean isFollow
) {
    public UserBasicProfileResponse(UserInfoVO userInfo, int followingCount, int followerCount, boolean isFollow) {
        this(userInfo.userId(), userInfo.nickname(), userInfo.profileImageUrl(), followingCount, followerCount, isFollow);
    }
}
