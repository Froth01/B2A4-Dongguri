package com.B2A4.storybook.domain.oauth.client;

import com.B2A4.storybook.domain.oauth.domain.OauthMember;
import com.B2A4.storybook.domain.oauth.domain.OauthServerType;

public interface OauthMemberClient {

    OauthServerType supportServer();

    OauthMember fetch(String code);
}