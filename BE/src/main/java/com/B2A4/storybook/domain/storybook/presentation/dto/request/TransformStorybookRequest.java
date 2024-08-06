package com.B2A4.storybook.domain.storybook.presentation.dto.request;

import java.util.List;

public record TransformStorybookRequest(
        String genre,
        String transformType,
        List<String> keywords,
        String originalImageUrl
) {
}
