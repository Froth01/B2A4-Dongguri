package com.B2A4.storybook.domain.oauth.domain.vo;

import com.B2A4.storybook.domain.oauth.domain.OauthServerType;

public record OauthMemberInfoVO(
        String email,
        String name,
        OauthServerType oauthServerType
) {
}
