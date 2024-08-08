package com.B2A4.storybook.domain.storybookWorldLink.service;

import com.B2A4.storybook.domain.storyWorld.domain.StoryWorld;
import com.B2A4.storybook.domain.storyWorld.presentation.dto.response.StoryWorldStorybookResponse;
import com.B2A4.storybook.domain.storybook.domain.Storybook;
import com.B2A4.storybook.domain.storybook.exception.UserNotStorybookHostException;
import com.B2A4.storybook.domain.storybook.service.StorybookService;
import com.B2A4.storybook.domain.storybookWorldLink.domain.StorybookWorldLink;
import com.B2A4.storybook.domain.storybookWorldLink.domain.repository.StorybookWorldLinkRepository;
import com.B2A4.storybook.domain.user.domain.User;
import com.B2A4.storybook.global.utils.user.UserUtilsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StorybookWorldLinkService implements StorybookWorldLinkServiceUtils {

    private final StorybookWorldLinkRepository storybookWorldLinkRepository;
    private final StorybookService storybookService;
    private final UserUtilsImpl userUtilsImpl;

    @Transactional
    @Override
    public List<StoryWorldStorybookResponse> createStorybookWorldLink(StoryWorld storyWorld, List<Long> storybookIds) {

        User user = userUtilsImpl.getUserFromSecurityContext();

        List<Storybook> storybookList = storybookService.getStorybookListByStorybookIds(storybookIds);

        for (Storybook storybook : storybookList) {
            if (!storybook.getUser().getId().equals(user.getId())) {
                throw UserNotStorybookHostException.EXCEPTION;
            }
        }

        List<StorybookWorldLink> storyWorldLinks = storybookList.stream()
                .map(storybook -> StorybookWorldLink.createStorybook(storybook, storyWorld))
                .collect(Collectors.toList());

        storybookWorldLinkRepository.deleteAllByStoryWorld(storyWorld);

        storybookWorldLinkRepository.saveAll(storyWorldLinks);

        return storybookList.stream()
                .map(Storybook::getStorybookInfoVO)
                .map(storybookInfoVO -> new StoryWorldStorybookResponse(storybookInfoVO.storybookId(), storybookInfoVO.transparentImageUrl()))
                .toList();
    }

    @Override
    public List<StoryWorldStorybookResponse> getStorybookList(StoryWorld storyWorld) {

        List<StorybookWorldLink> storybookWorldLinks = storybookWorldLinkRepository.findAllByStoryWorld(storyWorld);

        List<Long> storybookIds = storybookWorldLinks.stream()
                .map(link -> link.getStorybook().getId())
                .collect(Collectors.toList());

        List<Storybook> storybookList = storybookService.getStorybookListByStorybookIds(storybookIds);

        return storybookList.stream()
                .map(Storybook::getStorybookInfoVO)
                .map(storybookInfoVO -> new StoryWorldStorybookResponse(storybookInfoVO.storybookId(), storybookInfoVO.transparentImageUrl()))
                .toList();
    }
}
