package com.B2A4.storybook.domain.storybook.presentation.dto.response;

import java.util.List;

public record TransformStorybookResponse(
        String genre,
        List<String> keywords,
        String content,
        String originalImageUrl,
        String transformedImageUrl
){
}
