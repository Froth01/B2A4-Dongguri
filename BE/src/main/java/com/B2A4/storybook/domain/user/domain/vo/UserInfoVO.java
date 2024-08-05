package com.B2A4.storybook.domain.user.domain.vo;

import com.B2A4.storybook.domain.oauth.domain.OauthServerType;

public record UserInfoVO(
        Long id,
        String name,
        String email,
        String nickname,
        String profileImageUrl,
        OauthServerType oauthServerType
) {
}
