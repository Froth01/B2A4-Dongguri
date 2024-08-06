package com.B2A4.storybook.domain.storyWorld.domain;

import com.B2A4.storybook.domain.avatar.exception.UserNotAvatarHostException;
import com.B2A4.storybook.domain.storyWorld.domain.vo.StoryWorldInfoVO;
import com.B2A4.storybook.domain.storyWorld.exception.UserNotStoryWorldHostException;
import com.B2A4.storybook.domain.user.domain.User;
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
public class StoryWorld extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "story_world_id")
    private Long id;

    @OneToOne(mappedBy = "storyWorld")
    private User user;

    @Enumerated(STRING)
    private BackgroundType backgroundType;

    private String customBackgroundUrl;

    @Builder
    public StoryWorld(User user, BackgroundType backgroundType, String customBackgroundUrl) {
        this.user = user;
        this.backgroundType = backgroundType;
        this.customBackgroundUrl = customBackgroundUrl;
    }

    public static StoryWorld createStoryWorld(User user) {
        return builder()
                .user(user)
                .backgroundType(BackgroundType.CUSTOM)
                .customBackgroundUrl(null)
                .build();
    }

    public StoryWorldInfoVO getStoryWorldInfoVO() {
        return new StoryWorldInfoVO(
                id,
                backgroundType,
                customBackgroundUrl
        );
    }

    public void changeBackgroundType(BackgroundType newBackgroundType) {
        this.backgroundType = newBackgroundType;
    }

    public void changeCustomBackgroundUrl(String newCustomBackgroundUrl) {
        this.customBackgroundUrl = newCustomBackgroundUrl;
    }

    public void validUserIsHost(Long id) {
        if (!user.getId().equals(id)) {
            throw UserNotStoryWorldHostException.EXCEPTION;
        }
    }
}
