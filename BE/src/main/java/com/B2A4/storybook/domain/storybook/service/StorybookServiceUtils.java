package com.B2A4.storybook.domain.storybook.service;

import com.B2A4.storybook.domain.storybook.domain.Storybook;
import com.B2A4.storybook.domain.storybook.presentation.dto.request.CreateStorybookRequest;
import com.B2A4.storybook.domain.storybook.presentation.dto.request.TransformStorybookRequest;
import com.B2A4.storybook.domain.storybook.presentation.dto.response.StorybookResponse;
import com.B2A4.storybook.domain.storybook.presentation.dto.response.TransformStorybookResponse;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface StorybookServiceUtils {
    TransformStorybookResponse transform(TransformStorybookRequest transformStorybookRequest);

    StorybookResponse createStorybook(CreateStorybookRequest createStorybookRequest);

    StorybookResponse getStorybook(Long storybookId);

    Slice<StorybookResponse> getStorybookListByUser(int page, long userId);

    Slice<StorybookResponse> getStorybookListByKeyword(int page, String keyword);

    List<Storybook> getStorybookListByStorybookIds(List<Long> storybookIds);

    void deleteStorybook(Long storybookId);

    Storybook queryStorybook(Long storybookId);
}
