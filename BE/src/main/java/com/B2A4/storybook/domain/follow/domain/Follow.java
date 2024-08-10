package com.B2A4.storybook.domain.follow.domain;

import com.B2A4.storybook.domain.follow.exception.UserNotFollowHostException;
import com.B2A4.storybook.domain.user.domain.User;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Follow {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "follow_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follower_id", nullable = false)
    private User follower;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "following_id", nullable = false)
    private User following;

    @Builder
    public Follow(User follower, User following) {
        this.follower = follower;
        this.following = following;
    }

    public static Follow createFollow(User follower, User following) {
        return builder()
                .follower(follower)
                .following(following)
                .build();
    }

    public void validFollowIsHost(User user) {
        if (!this.follower.equals(user)) {
            throw UserNotFollowHostException.EXCEPTION;
        }
    }
}
