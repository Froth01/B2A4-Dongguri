package com.B2A4.storybook.domain.user.presentation.dto.response;

import com.B2A4.storybook.domain.user.domain.vo.UserInfoVO;

public record UserBasicProfileResponse(
        Long userId,
        String nickname,
        String profileImageUrl,
        boolean isFollow
) {
    public UserBasicProfileResponse(UserInfoVO userInfo, boolean isFollow) {
        this(userInfo.userId(), userInfo.nickname(), userInfo.profileImageUrl(), isFollow);
    }
}
