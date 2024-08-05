package com.B2A4.storybook.domain.avatar.presentation.dto.request;

import com.B2A4.storybook.domain.avatar.domain.AvatarLevel;

public record ChangeDisplayAvatarRequest(
        Long avatarId,
        AvatarLevel avatarLevel
) {
}
