package com.B2A4.storybook.domain.follow.domain.repository;

import com.B2A4.storybook.domain.follow.domain.Follow;
import com.B2A4.storybook.domain.user.domain.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    Slice<Follow> findFollowersByFollowing(User following, Pageable pageable);

    Slice<Follow> findFollowingsByFollower(User follower, Pageable pageable);

    boolean existsByFollowerAndFollowing(User follower, User following);
}