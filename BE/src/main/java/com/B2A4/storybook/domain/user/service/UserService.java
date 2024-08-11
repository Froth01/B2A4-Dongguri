package com.B2A4.storybook.domain.user.service;

import com.B2A4.storybook.domain.avatar.service.AvatarServiceUtils;
import com.B2A4.storybook.domain.follow.service.FollowService;
import com.B2A4.storybook.domain.oauth.domain.OauthMember;
import com.B2A4.storybook.domain.oauth.domain.repository.OauthMemberRepository;
import com.B2A4.storybook.domain.storyWorld.domain.StoryWorld;
import com.B2A4.storybook.domain.storyWorld.service.StoryWorldServiceUtils;
import com.B2A4.storybook.domain.user.domain.RefreshToken;
import com.B2A4.storybook.domain.user.domain.User;
import com.B2A4.storybook.domain.user.domain.repository.RefreshTokenRepository;
import com.B2A4.storybook.domain.user.domain.repository.UserRepository;
import com.B2A4.storybook.domain.user.exception.NicknameDuplicationException;
import com.B2A4.storybook.domain.user.exception.NicknameMissingException;
import com.B2A4.storybook.domain.user.exception.UserDuplicationException;
import com.B2A4.storybook.domain.user.presentation.dto.request.CheckNicknameRequest;
import com.B2A4.storybook.domain.user.presentation.dto.request.SignUpUserRequest;
import com.B2A4.storybook.domain.user.presentation.dto.request.UpdateUserRequest;
import com.B2A4.storybook.domain.user.presentation.dto.response.CheckNicknameResponse;
import com.B2A4.storybook.domain.user.presentation.dto.response.SignUpResponse;
import com.B2A4.storybook.domain.user.presentation.dto.response.UserBasicProfileResponse;
import com.B2A4.storybook.domain.user.presentation.dto.response.UserProfileResponse;
import com.B2A4.storybook.global.exception.UserNotFoundException;
import com.B2A4.storybook.global.security.JwtTokenProvider;
import com.B2A4.storybook.global.utils.security.SecurityUtils;
import com.B2A4.storybook.global.utils.user.UserUtils;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
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
    private final AvatarServiceUtils avatarServiceUtils;
    private final StoryWorldServiceUtils storyWorldServiceUtils;
    private final FollowService followService;

    // 회원 가입
    @Transactional
    public SignUpResponse signUp(SignUpUserRequest signUpUserRequest, HttpServletResponse response) {
        User user = User.createUser(
                signUpUserRequest.name(),
                signUpUserRequest.email(),
                signUpUserRequest.nickname(),
                signUpUserRequest.profileImageUrl(),
                signUpUserRequest.oauthServerType()
        );

        if (userRepository.existsByEmailAndOauthServerType(signUpUserRequest.email(), signUpUserRequest.oauthServerType())) {
            throw UserDuplicationException.EXCEPTION;
        }

        if (userRepository.existsByNickname(signUpUserRequest.nickname())) {
            throw NicknameDuplicationException.EXCEPTION;
        }

        userRepository.save(user);

        avatarServiceUtils.createAllAvatars(user);
        StoryWorld storyWorld = storyWorldServiceUtils.createStoryWorld(user);
        user.setStoryWorld(storyWorld);

        String accessToken = jwtTokenProvider.generateAccessToken(user.getId());
        String refreshToken = jwtTokenProvider.generateRefreshToken(user.getId());

        refreshTokenRepository.save(new RefreshToken(refreshToken, user.getId()));

        jwtTokenProvider.setHeaderRefreshToken(response, refreshToken);
        jwtTokenProvider.setHeaderAccessToken(response, accessToken);

        return new SignUpResponse(user.getUserInfo(), false);
    }

    // 회원 로그아웃
    @Transactional
    public void logout(HttpServletResponse response) {
        Long currentUserId = SecurityUtils.getCurrentUserId();
        refreshTokenRepository.deleteByUserId(currentUserId);

        jwtTokenProvider.setHeaderAccessTokenEmpty(response);
        jwtTokenProvider.setHeaderRefreshTokenEmpty(response);
    }

    // 회원 정보 조회
    public UserBasicProfileResponse getUserBasicProfile(long userId) {
        User user = userUtils.getUserById(userId);
        User currentUser = userUtils.getUserFromSecurityContext();
        boolean isFollow = followService.isUserFollowing(currentUser, user);
        return new UserBasicProfileResponse(user.getUserInfo(), user.getFollowingCount(), user.getFollowerCount(), isFollow);
    }

    // 회원 정보 수정
    @Transactional
    public UserProfileResponse updateUserProfile(UpdateUserRequest updateUserRequest) {
        User user = userUtils.getUserFromSecurityContext();

        user.updateUser(updateUserRequest.nickname(), updateUserRequest.profileImageUrl());

        return new UserProfileResponse(user.getUserInfo());
    }

    // 닉네임 중복 체크
    public CheckNicknameResponse checkNickname(CheckNicknameRequest nicknameCheckRequest) {
        return new CheckNicknameResponse(userRepository.findByNickname(nicknameCheckRequest.nickname()).isEmpty());
    }

    @Transactional
    public void userWithdraw(HttpServletResponse response) {
        Long currentUserId = SecurityUtils.getCurrentUserId();
        refreshTokenRepository.deleteByUserId(currentUserId);

        User currentUser = userUtils.getUserById(currentUserId);
        OauthMember oauthMember = oauthMemberRepository
                .findByOauthServerTypeAndEmail(currentUser.getOauthServerType(), currentUser.getEmail())
                .orElseThrow(() -> UserNotFoundException.EXCEPTION);
        userRepository.delete(currentUser);
        oauthMemberRepository.delete(oauthMember);

        jwtTokenProvider.setHeaderAccessTokenEmpty(response);
        jwtTokenProvider.setHeaderRefreshTokenEmpty(response);
    }

    public Slice<UserBasicProfileResponse> getUserBasicProfileListByNickname(int page, String nickname) {
        if (nickname.isEmpty()) {
            throw NicknameMissingException.EXCEPTION;
        }
        User currentUser = userUtils.getUserFromSecurityContext();

        PageRequest pageRequest = PageRequest.of(page, 12, Sort.by(Sort.Direction.DESC, "lastModifyDate"));


        Slice<User> userList = userRepository.findAllByNicknameContaining(nickname, pageRequest);
        return userList.map(user -> new UserBasicProfileResponse(user.getUserInfo(),  user.getFollowingCount(), user.getFollowerCount(), followService.isUserFollowing(currentUser, user)));

    }
}
