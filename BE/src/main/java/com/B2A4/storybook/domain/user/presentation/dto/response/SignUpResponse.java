package com.B2A4.storybook.domain.user.presentation.dto.response;


import com.B2A4.storybook.domain.oauth.domain.OauthServerType;
import com.B2A4.storybook.domain.user.domain.vo.UserInfoVO;

public record SignUpResponse(
        Long userId,
        String name,
        String email,
        String nickname,
        String profileImageUrl,
        OauthServerType oauthServerType,
        boolean isFirst
) {
    public SignUpResponse(UserInfoVO userInfoVO, boolean status) {
        this(userInfoVO.id(), userInfoVO.name(), userInfoVO.email(), userInfoVO.nickname(), userInfoVO.profileImageUrl(), userInfoVO.oauthServerType(), status);
    }
}