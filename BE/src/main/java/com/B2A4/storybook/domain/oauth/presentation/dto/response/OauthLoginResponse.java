package com.B2A4.storybook.domain.oauth.presentation.dto.response;

import com.B2A4.storybook.domain.oauth.domain.OauthServerType;
import com.B2A4.storybook.domain.oauth.domain.vo.OauthMemberInfoVO;
import com.B2A4.storybook.domain.user.domain.vo.UserInfoVO;

public record OauthLoginResponse(
        String email,
        String name,
        OauthServerType oauthServerType,
        UserInfoVO userInfoVO
) {
    public OauthLoginResponse (OauthMemberInfoVO oauthMemberInfoVO, UserInfoVO userInfoVO) {
        this(oauthMemberInfoVO.email(), oauthMemberInfoVO.name(), oauthMemberInfoVO.oauthServerType(), userInfoVO);
    }
}
