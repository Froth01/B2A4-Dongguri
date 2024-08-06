package com.B2A4.storybook.domain.keyword.domain;

import com.B2A4.storybook.domain.storybook.domain.Storybook;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Keyword {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "keyword_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "storybook_id")
    private Storybook storybook;

    private String keyword;

    @Builder
    public Keyword(Storybook storybook, String keyword) {
        this.storybook = storybook;
        this.keyword = keyword;
    }

    public static Keyword createKeyword(Storybook storybook, String keyword) {
        return builder()
                .storybook(storybook)
                .keyword(keyword)
                .build();
    }
}
