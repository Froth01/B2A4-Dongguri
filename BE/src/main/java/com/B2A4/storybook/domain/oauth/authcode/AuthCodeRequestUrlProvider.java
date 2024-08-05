package com.B2A4.storybook.domain.oauth.authcode;

import com.B2A4.storybook.domain.oauth.domain.OauthServerType;

public interface AuthCodeRequestUrlProvider {

    OauthServerType supportServer();

    String provide();
}
