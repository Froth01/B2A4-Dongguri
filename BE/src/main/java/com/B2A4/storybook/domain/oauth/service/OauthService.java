package com.B2A4.storybook.domain.oauth.service;

import com.B2A4.storybook.domain.oauth.authcode.AuthCodeRequestUrlProviderComposite;
import com.B2A4.storybook.domain.oauth.client.OauthMemberClientComposite;
import com.B2A4.storybook.domain.oauth.domain.OauthMember;
import com.B2A4.storybook.domain.oauth.domain.OauthServerType;
import com.B2A4.storybook.domain.oauth.domain.repository.OauthMemberRepository;
import com.B2A4.storybook.domain.oauth.presentation.dto.response.OauthLoginResponse;
import com.B2A4.storybook.domain.user.domain.RefreshToken;
import com.B2A4.storybook.domain.user.domain.User;
import com.B2A4.storybook.domain.user.domain.repository.RefreshTokenRepository;
import com.B2A4.storybook.domain.user.domain.repository.UserRepository;
import com.B2A4.storybook.global.exception.InvalidTokenException;
import com.B2A4.storybook.global.exception.RefreshTokenExpiredException;
import com.B2A4.storybook.global.security.JwtTokenProvider;
import com.B2A4.storybook.global.utils.user.UserUtils;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class OauthService {

    private final AuthCodeRequestUrlProviderComposite authCodeRequestUrlProviderComposite;
    private final UserRepository userRepository;
    private final OauthMemberClientComposite oauthMemberClientComposite;
    private final OauthMemberRepository oauthMemberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserUtils userUtils;

    public String getAuthCodeRequestUrl(OauthServerType oauthServerType) {
        return authCodeRequestUrlProviderComposite.provide(oauthServerType);
    }

    public OauthLoginResponse login(OauthServerType oauthServerType, String authCode, HttpServletResponse response) {
        OauthMember oauthMember = oauthMemberClientComposite.fetch(oauthServerType, authCode);
        OauthMember saved = oauthMemberRepository.findByOauthServerTypeAndEmail(oauthMember.getOauthServerType(), oauthMember.getEmail())
                .orElseGet(() -> oauthMemberRepository.save(oauthMember));
        Optional<User> savedUser = userRepository.findByOauthServerTypeAndEmail(saved.getOauthServerType(), saved.getEmail());

        if (!savedUser.isPresent()) {
            return new OauthLoginResponse(saved.getOauthMemberInfo(), null);
        }

        String accessToken = jwtTokenProvider.generateAccessToken(savedUser.get().getId());
        String refreshToken = jwtTokenProvider.generateRefreshToken(savedUser.get().getId());

        refreshTokenRepository.findByUserId(savedUser.get().getId())
                .ifPresent(refreshTokenRepository::delete);

        refreshTokenRepository.save(new RefreshToken(refreshToken, savedUser.get().getId()));

        jwtTokenProvider.setHeaderAccessToken(response, accessToken);
        jwtTokenProvider.setHeaderRefreshToken(response, refreshToken);

        return new OauthLoginResponse(saved.getOauthMemberInfo(), savedUser.get().getUserInfo());
    }

    @Transactional
    public void tokenRefresh(HttpServletResponse response, String requestRefreshToken) {
        RefreshToken getRefreshToken = refreshTokenRepository.findByRefreshToken(requestRefreshToken).orElseThrow(() -> RefreshTokenExpiredException.EXCEPTION);

        Long userId = jwtTokenProvider.parseRefreshToken(requestRefreshToken);

        if (!userId.equals(getRefreshToken.getUserId())) {
            throw InvalidTokenException.EXCEPTION;
        }

        User user = userUtils.getUserById(userId);

        String accessToken = jwtTokenProvider.generateAccessToken(user.getId());
        String refreshToken = jwtTokenProvider.generateRefreshToken(user.getId());

        refreshTokenRepository.deleteByRefreshToken(requestRefreshToken);
        refreshTokenRepository.save(new RefreshToken(refreshToken, userId));

        jwtTokenProvider.setHeaderAccessToken(response, accessToken);
        jwtTokenProvider.setHeaderRefreshToken(response, refreshToken);

    }
}
