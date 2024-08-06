package com.B2A4.storybook.domain.storyWorld.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum BackgroundType {
    CUSTOM(null);

    private final String imageUrl;
}
