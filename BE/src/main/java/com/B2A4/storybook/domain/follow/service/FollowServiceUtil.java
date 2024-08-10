package com.B2A4.storybook.domain.follow.service;

import com.B2A4.storybook.domain.follow.presentation.dto.request.FollowRequest;
import com.B2A4.storybook.domain.follow.presentation.dto.response.FollowResponse;
import org.springframework.data.domain.Slice;

public interface FollowServiceUtil {
    FollowResponse createFollow(FollowRequest followRequest);
    Slice<FollowResponse> getFollowerList(int page);
    Slice<FollowResponse> getFollowingList(int page);
    void deleteFollow(Long followId);
}
