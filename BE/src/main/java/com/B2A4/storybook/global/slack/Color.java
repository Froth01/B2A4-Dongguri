package com.B2A4.storybook.global.slack;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Color {
    RED("#ff0000")
    ;

    private final String code;
}
