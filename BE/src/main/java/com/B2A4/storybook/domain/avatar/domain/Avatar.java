package com.B2A4.storybook.domain.avatar.domain;

import com.B2A4.storybook.domain.avatar.domain.vo.AvatarInfoVO;
import com.B2A4.storybook.domain.avatar.exception.UserNotAvatarHostException;
import com.B2A4.storybook.domain.user.domain.User;
import com.B2A4.storybook.global.database.BaseEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static com.B2A4.storybook.domain.avatar.domain.AvatarLevel.ONE;
import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Avatar extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "avatar_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String name;
    private int exp;
    private boolean isRepresentative;

    @Enumerated(STRING)
    private AvatarType avatarType;

    @Enumerated(STRING)
    private AvatarLevel avatarLevel;

    @Enumerated(STRING)
    private AvatarLevel displayLevel;

    @Builder
    public Avatar(User user, String name, int exp, boolean isRepresentative, AvatarType avatarType,
                  AvatarLevel avatarLevel, AvatarLevel displayLevel) {
        this.user = user;
        this.name = name;
        this.exp = exp;
        this.isRepresentative = isRepresentative;
        this.avatarType = avatarType;
        this.avatarLevel = avatarLevel;
        this.displayLevel = displayLevel;
    }

    public static Avatar createAvatar(User user, AvatarType avatarType, boolean isRepresentative) {
        return builder()
                .user(user)
                .name(avatarType.getName())
                .exp(0)
                .isRepresentative(isRepresentative)
                .avatarType(avatarType)
                .avatarLevel(ONE)
                .displayLevel(ONE)
                .build();
    }

    public AvatarInfoVO getAvatarInfoVO() {
        return new AvatarInfoVO(
                id,
                name,
                exp,
                isRepresentative,
                avatarType,
                avatarLevel,
                displayLevel
        );
    }

    public void validUserIsHost(Long id) {
        if (!user.getId().equals(id)) {
            throw UserNotAvatarHostException.EXCEPTION;
        }
    }

    public void updateName(String newName) {
        this.name = newName;
    }

    public void updateRepresentative() {
        this.isRepresentative = !this.isRepresentative;
    }

    public void updateDisplayLevel(AvatarLevel avatarLevel) {
        this.displayLevel = avatarLevel;
    }

    public void addExp() {
        if (exp <= 9) this.exp++;
    }

    public void levelUp(AvatarLevel avatarLevel) {
        this.avatarLevel = avatarLevel;
    }
}
