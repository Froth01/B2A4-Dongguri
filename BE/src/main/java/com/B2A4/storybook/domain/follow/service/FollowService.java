package com.B2A4.storybook.domain.follow.service;

import com.B2A4.storybook.domain.follow.domain.Follow;
import com.B2A4.storybook.domain.follow.domain.repository.FollowRepository;
import com.B2A4.storybook.domain.follow.exception.FollowDuplicationException;
import com.B2A4.storybook.domain.follow.exception.FollowNotFoundException;
import com.B2A4.storybook.domain.follow.presentation.dto.request.FollowRequest;
import com.B2A4.storybook.domain.follow.presentation.dto.response.FollowResponse;
import com.B2A4.storybook.domain.user.domain.User;
import com.B2A4.storybook.global.utils.user.UserUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FollowService implements FollowServiceUtil {

    private final UserUtils userUtils;
    private final FollowRepository followRepository;


    @Override
    @Transactional
    public FollowResponse createFollow(FollowRequest followRequest) {
        User follower = userUtils.getUserFromSecurityContext();
        User following = userUtils.getUserById(followRequest.followingId());

        followRepository.findByFollowerAndFollowing(follower, following).ifPresent(follow -> {
            throw FollowDuplicationException.EXCEPTION;
        });

        Follow follow = new Follow(follower, following);
        followRepository.save(follow);

        return new FollowResponse(follow.getId(), following.getUserInfo(), true);
    }

    @Override
    public Slice<FollowResponse> getFollowerList(int page) {
        User user = userUtils.getUserFromSecurityContext();
        Pageable pageable = PageRequest.of(page, 10);
        Slice<Follow> followerSlice = followRepository.findFollowersByFollowing(user, pageable);
        return followerSlice.map(follow ->
                new FollowResponse(
                        follow.getId(),
                        follow.getFollower().getUserInfo(),
                        followRepository.existsByFollowerAndFollowing(user, follow.getFollower())
                )
        );
    }

    @Override
    public Slice<FollowResponse> getFollowingList(int page) {
        User user = userUtils.getUserFromSecurityContext();
        Pageable pageable = PageRequest.of(page, 10);
        Slice<Follow> followingSlice = followRepository.findFollowingsByFollower(user, pageable);
        return followingSlice.map(follow ->
                new FollowResponse(
                        follow.getId(),
                        follow.getFollowing().getUserInfo(),
                        true
                )
        );
    }

    @Override
    @Transactional
    public void deleteFollow(Long followId) {
        User user = userUtils.getUserFromSecurityContext();
        Follow follow = followRepository
                .findById(followId)
                .orElseThrow(() -> FollowNotFoundException.EXCEPTION);
        follow.validFollowIsHost(user);
        followRepository.delete(follow);
    }

}
