package com.B2A4.storybook.domain.reactionCount.domain;

import com.B2A4.storybook.domain.reaction.domain.Reaction;
import com.B2A4.storybook.domain.reaction.domain.ReactionType;
import com.B2A4.storybook.domain.reactionCount.domain.vo.ReactionCountInfoVO;
import com.B2A4.storybook.domain.storybook.domain.Storybook;
import com.B2A4.storybook.global.database.BaseEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class ReactionCount extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "reaction_cnt_id")
    private Long id;

    @OneToMany(mappedBy = "reactionCount", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reaction> reactionList = new ArrayList<>();

    //Storybook에도 연관관계 추가
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "storybook_id")
    private Storybook storybook;

    private int funCount;
    private int happyCount;
    private int sadCount;
    private int joyCount;

    @Builder
    public ReactionCount(Storybook storybook, int funCount, int happyCount, int sadCount, int joyCount) {
        this.storybook = storybook;
        this.funCount = funCount;
        this.happyCount = happyCount;
        this.sadCount = sadCount;
        this.joyCount = joyCount;
    }

    public static ReactionCount createReactionCount(Storybook storybook) {
        return builder()
                .storybook(storybook)
                .funCount(0)
                .happyCount(0)
                .sadCount(0)
                .joyCount(0)
                .build();
    }

    public ReactionCountInfoVO getReactionCountInfo() {
        return new ReactionCountInfoVO(
                id,
                funCount,
                happyCount,
                sadCount,
                joyCount
        );
    }

    public void addReactionCount(ReactionType reactionType) {
        switch (reactionType) {
            case FUN -> funCount++;
            case JOY -> joyCount++;
            case SAD -> sadCount++;
            case HAPPY -> happyCount++;
        }
    }

    public void subReactionCount(ReactionType reactionType) {
        switch (reactionType) {
            case FUN -> funCount--;
            case JOY -> joyCount--;
            case SAD -> sadCount--;
            case HAPPY -> happyCount--;
        }
    }
}
