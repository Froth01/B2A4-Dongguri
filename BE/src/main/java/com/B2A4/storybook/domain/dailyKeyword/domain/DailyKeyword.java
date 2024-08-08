package com.B2A4.storybook.domain.dailyKeyword.domain;

import com.B2A4.storybook.domain.dailyKeyword.domain.vo.DailyKeywordInfoVO;
import com.B2A4.storybook.domain.storybook.domain.Genre;
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
public class DailyKeyword extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "daily_keyword_id")
    private Long id;

    @Enumerated(STRING)
    private PlaceKeyword placeKeyword;

    @Enumerated(STRING)
    private CharacterKeyword characterKeyword;

    @Enumerated(STRING)
    private Genre genreKeyword;

    @Builder
    public DailyKeyword(PlaceKeyword placeKeyword, CharacterKeyword characterKeyword, Genre genreKeyword) {
        this.placeKeyword = placeKeyword;
        this.characterKeyword = characterKeyword;
        this.genreKeyword = genreKeyword;
    }

    public static DailyKeyword createDailyKeyword() {
        return builder()
                .placeKeyword(PlaceKeyword.getRandomKeyword())
                .characterKeyword(CharacterKeyword.getRandomKeyword())
                .genreKeyword(Genre.getRandomKeyword())
                .build();
    }

    public DailyKeywordInfoVO getDailyKeywordInfoVO() {
        return new DailyKeywordInfoVO(
                placeKeyword,
                characterKeyword,
                genreKeyword
        );
    }
}
