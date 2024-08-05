package com.B2A4.storybook.domain.storybook.service;

import com.B2A4.storybook.domain.storybook.domain.Storybook;
import com.B2A4.storybook.domain.storybook.presentation.dto.request.CreateStorybookRequest;
import com.B2A4.storybook.domain.storybook.presentation.dto.request.TransformStorybookRequest;
import com.B2A4.storybook.domain.storybook.presentation.dto.response.StorybookResponse;

import java.util.List;

public interface StorybookServiceUtils {
    StorybookResponse createStorybook(CreateStorybookRequest createStorybookRequest);

    StorybookResponse getStorybook(Long storybookId);

    List<StorybookResponse> getStorybookListByUser(long userId);

    List<StorybookResponse> getStorybookListByKeyword(String keyword);

    void deleteStorybook(Long storybookId);

    Storybook queryStorybook(Long storybookId);
}
