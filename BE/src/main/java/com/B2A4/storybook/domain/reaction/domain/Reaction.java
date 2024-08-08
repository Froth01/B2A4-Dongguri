package com.B2A4.storybook.domain.reaction.domain;

import com.B2A4.storybook.domain.reaction.domain.vo.ReactionInfoVO;
import com.B2A4.storybook.domain.reaction.exception.UserNotReactionHostException;
import com.B2A4.storybook.domain.reactionCount.domain.ReactionCount;
import com.B2A4.storybook.domain.storybook.domain.Storybook;
import com.B2A4.storybook.domain.storybook.exception.UserNotStorybookHostException;
import com.B2A4.storybook.domain.user.domain.User;
import com.B2A4.storybook.global.database.BaseEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Reaction extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "reaction_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "storybook_id")
    private Storybook storybook;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "reaction_cnt_id")
    private ReactionCount reactionCount;

    @Enumerated(STRING)
    private ReactionType reactionType;

    @Builder
    public Reaction(User user, Storybook storybook, ReactionCount reactionCount, ReactionType reactionType) {
        this.user = user;
        this.storybook = storybook;
        this.reactionCount = reactionCount;
        this.reactionType = reactionType;
    }

    public static Reaction createReaction(User user, Storybook storybook, ReactionCount reactionCount, ReactionType reactionType) {
        return builder()
                .user(user)
                .storybook(storybook)
                .reactionCount(reactionCount)
                .reactionType(reactionType)
                .build();
    }

    public ReactionInfoVO getReactionInfo() {
        return new ReactionInfoVO(
                id,
                reactionType
        );
    }

    public void validUserIsHost(User user) {
        if (!this.user.equals(user)) {
            throw UserNotReactionHostException.EXCEPTION;
        }
    }
}
