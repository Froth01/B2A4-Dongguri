package com.B2A4.storybook.domain.storybook.presentation.dto.request;

import com.B2A4.storybook.domain.storybook.domain.Genre;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record CreateStorybookRequest(
        Genre genre,
        List<String> keywords,
        String content,
        String originalImageUrl,
        String transformedImageUrl,
        String voiceRecordingUrl,
        boolean isTodayKeyword
) {
}
