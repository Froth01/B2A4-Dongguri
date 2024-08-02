package com.B2A4.storybook.domain.avatar.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

import static com.B2A4.storybook.domain.avatar.domain.AvatarType.*;


@Getter
@AllArgsConstructor
public enum AvatarLevel {
    ONE(1,0, 3),
    TWO(2, 4, 9),
    THREE(3, 10, 11);

    private final int level;
    private final int exp;
    private final int expToLevelUp;

    public static AvatarLevel levelUp(Avatar avatar) {
        AvatarLevel avatarLevel = avatar.getAvatarLevel();

        if (10 < avatar.getExp()) return avatarLevel;

        for (AvatarLevel level : AvatarLevel.values()) {
            if (!avatarLevel.equals(level) && level.getExp() <= avatar.getExp() && avatar.getExp() <= level.getExpToLevelUp()) {
                avatarLevel = level;
                avatar.updateDisplayLevel(level);
            }
        }

        return avatarLevel;
    }
}

