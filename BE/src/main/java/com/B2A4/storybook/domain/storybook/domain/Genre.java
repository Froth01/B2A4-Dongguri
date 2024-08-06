package com.B2A4.storybook.domain.storybook.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Genre {
    JOY("기쁨"),
    HAPPY("행복"),
    SAD("슬픔"),
    FUN("즐거움");

    private String name;
}
