package com.B2A4.storybook.domain.comment.domain;

import com.B2A4.storybook.domain.comment.exception.UserNotCommentHostException;
import com.B2A4.storybook.domain.comment.domain.vo.CommentInfoVO;
import com.B2A4.storybook.domain.storybook.domain.Storybook;
import com.B2A4.storybook.domain.user.domain.User;
import com.B2A4.storybook.global.database.BaseEntity;
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
public class Comment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "storybook_id")
    private Storybook storybook;

    private String content;

    @Builder
    public Comment(User user, Storybook storybook, String content) {
        this.user = user;
        this.storybook = storybook;
        this.content = content;
    }

    public static Comment createComment(User user, Storybook storybook, String content) {
        return builder()
                .user(user)
                .storybook(storybook)
                .content(content)
                .build();
    }

    public CommentInfoVO getCommentInfoVO() {
        return new CommentInfoVO(
                id,
                user.getId(),
                storybook.getId(),
                content,
                getCreatedDate()
        );
    }

    public void validUserIsHost(Long id) {
        if (!user.getId().equals(id)) {
            throw UserNotCommentHostException.EXCEPTION;
        }
    }

    public void changeContent(String content) {
        this.content = content;
    }
}
