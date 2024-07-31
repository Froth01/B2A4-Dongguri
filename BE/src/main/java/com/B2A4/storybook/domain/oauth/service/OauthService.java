package com.B2A4.storybook.domain.oauth.service;

import com.B2A4.storybook.domain.oauth.authcode.AuthCodeRequestUrlProviderComposite;
import com.B2A4.storybook.domain.oauth.client.OauthMemberClientComposite;
import com.B2A4.storybook.domain.oauth.domain.OauthServerType;
import com.B2A4.storybook.domain.oauth.domain.repository.OauthMemberRepository;
import com.B2A4.storybook.global.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class OauthService {

    private final AuthCodeRequestUrlProviderComposite authCodeRequestUrlProviderComposite;
    private final OauthMemberClientComposite oauthMemberClientComposite;
    private final OauthMemberRepository oauthMemberRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public String getAuthCodeRequestUrl(OauthServerType oauthServerType) {
        return authCodeRequestUrlProviderComposite.provide(oauthServerType);
    }
}
