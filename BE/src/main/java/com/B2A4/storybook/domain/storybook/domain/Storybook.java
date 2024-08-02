package com.B2A4.storybook.domain.storybook.domain;

import com.B2A4.storybook.domain.keyword.domain.Keyword;
import com.B2A4.storybook.domain.storybook.domain.vo.StorybookInfoVO;
import com.B2A4.storybook.domain.storybook.exception.UserNotStorybookHostException;
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

    @OneToMany(mappedBy = "storybook", cascade = CascadeType.ALL)
    private List<Keyword> keywords;


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
                user,
                genre,
                content,
                originalImageUrl,
                transformedImageUrl,
                transparentImageUrl,
                voiceRecordingUrl,
                isTodayKeyword
        );
    }

    public void validUserIsHost(Long id) {
        if (!user.getId().equals(id)) {
            throw UserNotStorybookHostException.EXCEPTION;
        }
    }
}
