package com.B2A4.storybook.domain.user.presentation.dto.request;

import com.B2A4.storybook.domain.oauth.domain.OauthServerType;

public record UpdateUserRequest(
        String nickname,
        String profileImageUrl
) {
}
