package com.B2A4.storybook.global.openapi.service;

import com.B2A4.storybook.domain.file.presentation.dto.response.UploadFileResponse;
import com.B2A4.storybook.domain.storybook.presentation.dto.request.TransformStorybookRequest;

public interface OpenAPIServiceUtils {
    String removeBackground(String inputImageUrl);
    String generateClaude(TransformStorybookRequest transformStorybookRequest);
    String generateChatgpt(TransformStorybookRequest transformStorybookRequest);
    String generateDalle(String prompt);
}
