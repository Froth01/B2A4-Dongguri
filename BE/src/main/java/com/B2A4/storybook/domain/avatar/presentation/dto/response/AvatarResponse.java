package com.B2A4.storybook.domain.avatar.presentation.dto.response;

import com.B2A4.storybook.domain.avatar.domain.AvatarLevel;
import com.B2A4.storybook.domain.avatar.domain.AvatarType;
import com.B2A4.storybook.domain.avatar.domain.vo.AvatarInfoVO;

public record AvatarResponse(
        Long avatarId,
        String name,
        int exp,
        boolean isRepresentative,
        AvatarType avatarType,
        AvatarLevel avatarLevel,
        AvatarLevel displayLevel
) {
    public AvatarResponse(AvatarInfoVO avatarInfoVO) {
        this(avatarInfoVO.avatarId(), avatarInfoVO.name(), avatarInfoVO.exp(), avatarInfoVO.isRepresentative(),
                avatarInfoVO.avatarType(), avatarInfoVO.avatarLevel(), avatarInfoVO.displayLevel());
    }
}
