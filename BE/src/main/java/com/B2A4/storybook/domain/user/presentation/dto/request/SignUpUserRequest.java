package com.B2A4.storybook.domain.user.presentation.dto.request;

import com.B2A4.storybook.domain.oauth.domain.OauthServerType;

public record SignUpUserRequest(String name, String email, String nickname, String profileImageUrl, OauthServerType oauthServerType) {
}