package com.B2A4.storybook.domain.storyWorld.service;

import com.B2A4.storybook.domain.storyWorld.domain.StoryWorld;
import com.B2A4.storybook.domain.storyWorld.domain.repository.StoryWorldRepository;
import com.B2A4.storybook.domain.storyWorld.exception.StoryWorldNotFound;
import com.B2A4.storybook.domain.storyWorld.presentation.dto.request.UpdateStoryWorldRequest;
import com.B2A4.storybook.domain.storyWorld.presentation.dto.response.StoryWorldResponse;
import com.B2A4.storybook.domain.storybook.domain.vo.StorybookInfoVO;
import com.B2A4.storybook.domain.storybookWorldLink.service.StorybookWorldLinkService;
import com.B2A4.storybook.domain.user.domain.User;
import com.B2A4.storybook.global.utils.user.UserUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.B2A4.storybook.domain.storyWorld.domain.BackgroundType.CUSTOM;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StoryWorldService implements StoryWorldServiceUtils{

    private final StoryWorldRepository storyWorldRepository;
    private final UserUtils userUtils;
    private final StorybookWorldLinkService storybookWorldLinkService;

    @Override
    @Transactional
    public StoryWorld createStoryWorld(User user) {
        StoryWorld storyWorld = StoryWorld.createStoryWorld(user);

        storyWorldRepository.save(storyWorld);

        return storyWorld;
    }

    public StoryWorldResponse getStoryWorld(Long userId) {
        User user = userUtils.getUserById(userId);
        StoryWorld storyWorld = findByUser(user);
        List<StorybookInfoVO> storybookInfoVOList = storybookWorldLinkService.getStorybookList(storyWorld);
        return new StoryWorldResponse(storyWorld.getStoryWorldInfoVO(), storybookInfoVOList);
    }

    @Transactional
    public StoryWorldResponse updateStoryWorld(Long storyworldId, UpdateStoryWorldRequest updateStoryWorldRequest) {
        User user = userUtils.getUserFromSecurityContext();
        StoryWorld storyWorld = queryStoryWorld(storyworldId);

        storyWorld.validUserIsHost(user.getId());

        if (updateStoryWorldRequest.backgroundType().equals(CUSTOM)) {
            storyWorld.changeCustomBackgroundUrl(updateStoryWorldRequest.customBackgroundUrl());
        }

        storyWorld.changeBackgroundType(updateStoryWorldRequest.backgroundType());
        List<StorybookInfoVO> storybookInfoVOList = storybookWorldLinkService.createStorybookWorldLink(storyWorld, updateStoryWorldRequest.storybookIds());
        return new StoryWorldResponse(storyWorld.getStoryWorldInfoVO(), storybookInfoVOList);
    }

    @Override
    public StoryWorld queryStoryWorld(Long storyWorldId) {
        return storyWorldRepository.findById(storyWorldId).orElseThrow(() -> StoryWorldNotFound.EXCEPTION);
    }

    @Override
    public StoryWorld findByUser(User user) {
        return storyWorldRepository.findByUser(user).orElseThrow(() -> StoryWorldNotFound.EXCEPTION);
    }
}
