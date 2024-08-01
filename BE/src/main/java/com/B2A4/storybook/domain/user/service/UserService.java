package com.B2A4.storybook.domain.user.service;

import com.B2A4.storybook.domain.oauth.domain.repository.OauthMemberRepository;
import com.B2A4.storybook.domain.user.domain.RefreshToken;
import com.B2A4.storybook.domain.user.domain.User;
import com.B2A4.storybook.domain.user.domain.repository.RefreshTokenRepository;
import com.B2A4.storybook.domain.user.domain.repository.UserRepository;
import com.B2A4.storybook.domain.user.presentation.dto.request.CheckNicknameRequest;
import com.B2A4.storybook.domain.user.presentation.dto.request.SignUpUserRequest;
import com.B2A4.storybook.domain.user.presentation.dto.request.UpdateUserRequest;
import com.B2A4.storybook.domain.user.presentation.dto.response.CheckNicknameResponse;
import com.B2A4.storybook.domain.user.presentation.dto.response.SignUpResponse;
import com.B2A4.storybook.domain.user.presentation.dto.response.UserProfileResponse;
import com.B2A4.storybook.global.security.JwtTokenProvider;
import com.B2A4.storybook.global.utils.security.SecurityUtils;
import com.B2A4.storybook.global.utils.user.UserUtils;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;
    private final OauthMemberRepository oauthMemberRepository;
    private final UserUtils userUtils;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public SignUpResponse signUp(SignUpUserRequest signUpUserRequest, HttpServletResponse response) {
        User user = User.createUser(
                signUpUserRequest.name(),
                signUpUserRequest.email(),
                signUpUserRequest.nickname(),
                signUpUserRequest.profileImageUrl(),
                signUpUserRequest.oauthServerType()
        );
        userRepository.save(user);

        String accessToken = jwtTokenProvider.generateAccessToken(user.getId());
        String refreshToken = jwtTokenProvider.generateRefreshToken(user.getId());

        refreshTokenRepository.save(new RefreshToken(refreshToken, user.getId()));

        jwtTokenProvider.setHeaderRefreshToken(response, refreshToken);
        jwtTokenProvider.setHeaderAccessToken(response, accessToken);

        return new SignUpResponse(user.getUserInfo(), false);
    }

    @Transactional
    public void logout(HttpServletResponse response) {
        Long currentUserId = SecurityUtils.getCurrentUserId();
        refreshTokenRepository.deleteByUserId(currentUserId);

        jwtTokenProvider.setHeaderAccessTokenEmpty(response);
        jwtTokenProvider.setHeaderRefreshTokenEmpty(response);
    }

    public UserProfileResponse getUserProfile(long userId) {
        User user = userUtils.getUserById(userId);

        return new UserProfileResponse(user.getUserInfo());
    }

    @Transactional
    public UserProfileResponse updateUserProfile(UpdateUserRequest updateUserRequest, HttpServletResponse response) {
        User user = userUtils.getUserFromSecurityContext();

        user.updateUser(updateUserRequest.nickname(), updateUserRequest.profileImageUrl());

        return new UserProfileResponse(user.getUserInfo());
    }

    public CheckNicknameResponse checkNickname(CheckNicknameRequest nicknameCheckRequest) {
        return new CheckNicknameResponse(userRepository.findByNickname(nicknameCheckRequest.nickname()).isEmpty());
    }
}
