package com.B2A4.storybook.domain.avatar.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum AvatarType {
    GYEOMI("겨미"),
    GEONI("거니"),
    ILI("일이"),
    BINI("비니"),
    MINI("미니");

    private String name;
}
