package com.B2A4.storybook.domain.reactionCount.service;

import com.B2A4.storybook.domain.reaction.domain.ReactionType;
import com.B2A4.storybook.domain.reaction.service.ReactionServiceUtils;
import com.B2A4.storybook.domain.reactionCount.domain.ReactionCount;
import com.B2A4.storybook.domain.reactionCount.domain.repository.ReactionCountRepository;
import com.B2A4.storybook.domain.reactionCount.exception.ReactionCountNotFoundException;
import com.B2A4.storybook.domain.reactionCount.presentation.dto.response.ReactionCountResponse;
import com.B2A4.storybook.domain.storybook.domain.Storybook;
import com.B2A4.storybook.domain.storybook.domain.repository.StorybookRepository;
import com.B2A4.storybook.domain.storybook.exception.StorybookNotFoundException;
import com.B2A4.storybook.domain.storybook.service.StorybookServiceUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReactionCountService implements ReactionCountServiceUtils{

    private final ReactionCountRepository reactionCountRepository;
    private final StorybookRepository storybookRepository;

    @Override
    @Transactional
    public void createReactionCount(Long storybookId) {
        Storybook storybook = storybookRepository.findById(storybookId).orElseThrow(() -> StorybookNotFoundException.EXCEPTION);
        ReactionCount reactionCount = ReactionCount.createReactionCount(storybook);

        reactionCountRepository.save(reactionCount);
    }

    // 공감 더하기
    @Override
    @Transactional
    public void addReactionCount(Long storybookId, ReactionType reactionType) {
        ReactionCount reactionCount = queryReactionCountByStorybook(storybookId);

        reactionCount.addReactionCount(reactionType);
    }

    // 공감 빼기
    @Override
    @Transactional
    public void subReactionCount(Long storybookId, ReactionType reactionType) {
        ReactionCount reactionCount = queryReactionCountByStorybook(storybookId);

        reactionCount.subReactionCount(reactionType);
    }

    // 공감 수 조회하기
    @Override
    public ReactionCountResponse getReactionCount(Long storybookId) {
        ReactionCount reactionCount = queryReactionCountByStorybook(storybookId);

        return new ReactionCountResponse(reactionCount.getReactionCountInfo());
    }

    @Override
    public ReactionCount queryReactionCountByStorybook(Long storybookId) {
        Storybook storybook = storybookRepository.findById(storybookId).orElseThrow(() -> StorybookNotFoundException.EXCEPTION);

        return reactionCountRepository.findByStorybook(storybook).orElseThrow(() -> ReactionCountNotFoundException.EXCEPTION);
    }
}
