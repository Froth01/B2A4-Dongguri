package com.B2A4.storybook.domain.storybook.domain;

import com.B2A4.storybook.domain.keyword.domain.Keyword;
import com.B2A4.storybook.domain.reaction.domain.Reaction;
import com.B2A4.storybook.domain.reactionCount.domain.ReactionCount;
import com.B2A4.storybook.domain.storybook.domain.vo.StorybookInfoVO;
import com.B2A4.storybook.domain.storybook.exception.UserNotStorybookHostException;
import com.B2A4.storybook.domain.storybookWorldLink.domain.StorybookWorldLink;
import com.B2A4.storybook.domain.user.domain.User;
import com.B2A4.storybook.global.database.BaseEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Storybook extends BaseEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "storybook_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(STRING)
    private Genre genre;

    private String content;
    private String originalImageUrl;
    private String transformedImageUrl;
    private String transparentImageUrl;
    private String voiceRecordingUrl;
    private boolean isTodayKeyword;

    @OneToMany(mappedBy = "storybook", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Keyword> keywords;

    @OneToMany(mappedBy = "storybook", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StorybookWorldLink> storyWorldLinks;

    @OneToMany(mappedBy = "storybook", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reaction> reactionList;

    @OneToMany(mappedBy = "storybook", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReactionCount> reactionCountList;

    @Builder
    public Storybook(User user, Genre genre, String content, String originalImageUrl, String transformedImageUrl, String transparentImageUrl, String voiceRecordingUrl, boolean isTodayKeyword) {
        this.user = user;
        this.genre = genre;
        this.content = content;
        this.originalImageUrl = originalImageUrl;
        this.transformedImageUrl = transformedImageUrl;
        this.transparentImageUrl = transparentImageUrl;
        this.voiceRecordingUrl = voiceRecordingUrl;
        this.isTodayKeyword = isTodayKeyword;
    }

    public static Storybook createStorybook(User user, Genre genre, String content, String originalImageUrl, String transformedImageUrl, String transparentImageUrl, String voiceRecordingUrl, boolean isTodayKeyword) {
        return builder()
                .user(user)
                .genre(genre)
                .content(content)
                .originalImageUrl(originalImageUrl)
                .transformedImageUrl(transformedImageUrl)
                .transparentImageUrl(transparentImageUrl)
                .voiceRecordingUrl(voiceRecordingUrl)
                .isTodayKeyword(isTodayKeyword)
                .build();
    }

    public StorybookInfoVO getStorybookInfoVO() {
        return new StorybookInfoVO(
                id,
                user.getUserInfo(),
                genre,
                content,
                originalImageUrl,
                transformedImageUrl,
                transparentImageUrl,
                voiceRecordingUrl,
                isTodayKeyword
        );
    }

    public void validUserIsHost(User user) {
        if (!this.user.equals(user)) {
            throw UserNotStorybookHostException.EXCEPTION;
        }
    }
}
