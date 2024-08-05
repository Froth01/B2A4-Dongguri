package com.B2A4.storybook.domain.oauth.presentation.dto.response;

import com.B2A4.storybook.domain.oauth.domain.OauthServerType;
import com.B2A4.storybook.domain.oauth.domain.vo.OauthMemberInfoVO;

public record OauthLoginResponse(
        String email,
        String name,
        OauthServerType oauthServerType,
        Boolean isFirst
) {
    public OauthLoginResponse (OauthMemberInfoVO oauthMemberInfoVO, Boolean status) {
        this(oauthMemberInfoVO.email(), oauthMemberInfoVO.name(), oauthMemberInfoVO.oauthServerType(), status);
    }
}
