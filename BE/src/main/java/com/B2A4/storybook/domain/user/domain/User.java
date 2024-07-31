package com.B2A4.storybook.domain.user.domain;

import com.B2A4.storybook.domain.oauth.domain.OauthServerType;
import com.B2A4.storybook.domain.user.domain.vo.UserInfoVO;
import com.B2A4.storybook.global.database.BaseEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    private String name;
    private String email;
    private String nickname;
    private String profileImageUrl;

    @Enumerated(STRING)
    private OauthServerType oauthServerType;

    @Builder
    public User(Long id, String name, String email, String nickname, String profileImageUrl, OauthServerType oauthServerType) {
        this.id = id;
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
}