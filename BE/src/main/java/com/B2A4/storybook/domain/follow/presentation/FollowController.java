package com.B2A4.storybook.domain.follow.presentation;

import com.B2A4.storybook.domain.follow.presentation.dto.request.FollowRequest;
import com.B2A4.storybook.domain.follow.presentation.dto.response.FollowResponse;
import com.B2A4.storybook.domain.follow.service.FollowService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.*;

@Tag(name = "팔로우", description = "팔로우 관련 API")
@RestController
@RequestMapping("/api/follows")
@RequiredArgsConstructor
public class FollowController {
    private final FollowService followService;

    @Operation(summary = "팔로우 추가")
    @PostMapping
    public FollowResponse createFollow(@RequestBody FollowRequest followRequest) {
        return followService.createFollow(followRequest);
    }

    @Operation(summary = "팔로워 목록 조회")
    @GetMapping("follower")
    public Slice<FollowResponse> getFollowerList(@RequestParam int page) {
        return followService.getFollowerList(page);
    }

    @Operation(summary = "팔로잉 목록 조회")
    @GetMapping("following")
    public Slice<FollowResponse> getFollowingList(@RequestParam int page) {
        return followService.getFollowingList(page);
    }

    @Operation(summary = "팔로우 삭제")
    @DeleteMapping("/{followId}")
    public void deleteFollow(@PathVariable Long followId) {
        followService.deleteFollow(followId);
    }
}
