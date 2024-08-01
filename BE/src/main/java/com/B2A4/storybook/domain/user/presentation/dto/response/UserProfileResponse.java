package com.B2A4.storybook.domain.user.presentation.dto.response;

import com.B2A4.storybook.domain.oauth.domain.OauthServerType;
import com.B2A4.storybook.domain.user.domain.vo.UserInfoVO;

public record UserProfileResponse(
        Long id,
        String name,
        String email,
        String nickname,
        String profileImageUrl,
        OauthServerType oauthServerType
) {
    public UserProfileResponse(UserInfoVO userInfo) {
        this(userInfo.id(), userInfo.name(), userInfo.email(), userInfo.nickname(), userInfo.profileImageUrl(), userInfo.oauthServerType());
    }
}
