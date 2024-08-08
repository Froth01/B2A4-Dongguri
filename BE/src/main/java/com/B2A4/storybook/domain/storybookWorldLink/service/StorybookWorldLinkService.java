package com.B2A4.storybook.domain.storybookWorldLink.service;

import com.B2A4.storybook.domain.storyWorld.domain.StoryWorld;
import com.B2A4.storybook.domain.storybook.domain.Storybook;
import com.B2A4.storybook.domain.storybook.domain.vo.StorybookInfoVO;
import com.B2A4.storybook.domain.storybook.service.StorybookService;
import com.B2A4.storybook.domain.storybookWorldLink.domain.StorybookWorldLink;
import com.B2A4.storybook.domain.storybookWorldLink.domain.repository.StorybookWorldLinkRepository;
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

    @Transactional
    @Override
    public List<StorybookInfoVO> createStorybookWorldLink(StoryWorld storyWorld, List<Long> storybookIds) {

        List<Storybook> storybookList = storybookService.getStorybookListByStorybookIds(storybookIds);

        List<StorybookWorldLink> storyWorldLinks = storybookList.stream()
                .map(storybook -> StorybookWorldLink.createStorybook(storybook, storyWorld))
                .collect(Collectors.toList());

        storybookWorldLinkRepository.deleteAllByStoryWorld(storyWorld);

        storybookWorldLinkRepository.saveAll(storyWorldLinks);

        return storybookList.stream().map(Storybook::getStorybookInfoVO).toList();
    }

    @Override
    public List<StorybookInfoVO> getStorybookList(StoryWorld storyWorld) {

        List<StorybookWorldLink> storybookWorldLinks = storybookWorldLinkRepository.findAllByStoryWorld(storyWorld);

        List<Long> storybookIds = storybookWorldLinks.stream()
                .map(link -> link.getStorybook().getId())
                .collect(Collectors.toList());

        List<Storybook> storybookList = storybookService.getStorybookListByStorybookIds(storybookIds);

        return storybookList.stream().map(Storybook::getStorybookInfoVO).toList();
    }
}
