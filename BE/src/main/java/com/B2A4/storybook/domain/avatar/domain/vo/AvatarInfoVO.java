package com.B2A4.storybook.domain.avatar.domain.vo;

import com.B2A4.storybook.domain.avatar.domain.AvatarLevel;
import com.B2A4.storybook.domain.avatar.domain.AvatarType;

public record AvatarInfoVO(
        Long avatarId,
        String name,
        int exp,
        boolean isRepresentative,
        AvatarType avatarType,
        AvatarLevel avatarLevel,
        AvatarLevel displayLevel
) {
}
