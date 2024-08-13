package com.B2A4.storybook.domain.user.domain;

import com.B2A4.storybook.domain.avatar.domain.Avatar;
import com.B2A4.storybook.domain.comment.domain.Comment;
import com.B2A4.storybook.domain.follow.domain.Follow;
import com.B2A4.storybook.domain.oauth.domain.OauthServerType;
import com.B2A4.storybook.domain.reaction.domain.Reaction;
import com.B2A4.storybook.domain.storyWorld.domain.StoryWorld;
import com.B2A4.storybook.domain.storybook.domain.Storybook;
import com.B2A4.storybook.domain.user.domain.vo.UserInfoVO;
import com.B2A4.storybook.global.database.BaseEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Avatar> avatarList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Storybook> storybookList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reaction> reactionList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> commentList = new ArrayList<>();

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private StoryWorld storyWorld;

    private String name;
    private String email;
    private String nickname;
    private String profileImageUrl;

    @OneToMany(mappedBy = "following", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Follow> followingList = new ArrayList<>();

    @OneToMany(mappedBy = "follower", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Follow> followerList = new ArrayList<>();

    @Enumerated(STRING)
    private OauthServerType oauthServerType;

    @Builder
    public User(String name, String email, String nickname, String profileImageUrl, OauthServerType oauthServerType) {
        this.name = name;
        this.email = email;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
        this.oauthServerType = oauthServerType;
    }

    public static User createUser(String name, String email, String nickname, String profileImageUrl, OauthServerType oauthServerType) {
        return builder()
                .name(name)
                .email(email)
                .nickname(nickname)
                .profileImageUrl(profileImageUrl)
                .oauthServerType(oauthServerType)
                .build();
    }

    public UserInfoVO getUserInfo() {
        return new UserInfoVO(
                id,
                name,
                email,
                nickname,
                profileImageUrl,
                oauthServerType
        );
    }

    public void updateUser(String nickname, String profileImageUrl) {
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
    }

    public void setStoryWorld(StoryWorld storyWorld) {
        this.storyWorld = storyWorld;
    }

    public int getFollowingCount() {
        return this.followerList.size();
    }

    public int getFollowerCount() {
        return this.followingList.size();
    }
}
