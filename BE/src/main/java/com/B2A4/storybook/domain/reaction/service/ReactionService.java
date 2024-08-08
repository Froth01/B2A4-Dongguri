package com.B2A4.storybook.domain.reaction.service;

import com.B2A4.storybook.domain.reaction.domain.Reaction;
import com.B2A4.storybook.domain.reaction.domain.repository.ReactionRepository;
import com.B2A4.storybook.domain.reaction.exception.AlreadyReactionException;
import com.B2A4.storybook.domain.reaction.exception.ReactionNotFoundException;
import com.B2A4.storybook.domain.reaction.presentation.dto.request.CreateReactionRequest;
import com.B2A4.storybook.domain.reaction.presentation.dto.request.DeleteReactionRequest;
import com.B2A4.storybook.domain.reaction.presentation.dto.response.ReactionResponse;
import com.B2A4.storybook.domain.reactionCount.domain.ReactionCount;
import com.B2A4.storybook.domain.reactionCount.presentation.dto.response.ReactionCountResponse;
import com.B2A4.storybook.domain.reactionCount.service.ReactionCountServiceUtils;
import com.B2A4.storybook.domain.storybook.domain.Storybook;
import com.B2A4.storybook.domain.storybook.service.StorybookServiceUtils;
import com.B2A4.storybook.domain.user.domain.User;
import com.B2A4.storybook.global.utils.user.UserUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReactionService implements ReactionServiceUtils{

    private final ReactionRepository reactionRepository;
    private final StorybookServiceUtils storybookServiceUtils;
    private final UserUtils userUtils;
    private final ReactionCountServiceUtils reactionCountServiceUtils;

    @Override
    @Transactional
    public ReactionResponse createReaction(CreateReactionRequest createReactionRequest) {
        User user = userUtils.getUserFromSecurityContext();
        Storybook storybook = storybookServiceUtils.queryStorybook(createReactionRequest.storybookId());
        ReactionCount reactionCount = reactionCountServiceUtils.queryReactionCountByStorybook(storybook.getId());

        if (reactionRepository.existsByStorybookAndReactionType(storybook, createReactionRequest.reactionType())) {
            throw AlreadyReactionException.EXCEPTION;
        }

        Reaction reaction = Reaction.createReaction(
                user,
                storybook,
                reactionCount,
                createReactionRequest.reactionType()
        );

        reactionRepository.save(reaction);

        reactionCountServiceUtils.addReactionCount(storybook.getId(), createReactionRequest.reactionType());

        return new ReactionResponse(reaction.getReactionInfo());
    }

    @Override
    @Transactional
    public void deleteReaction(DeleteReactionRequest deleteReactionRequest) {
        User user = userUtils.getUserFromSecurityContext();
        Storybook storybook = storybookServiceUtils.queryStorybook(deleteReactionRequest.storybookId());
        Reaction reaction = reactionRepository.findByUserAndStorybookAndReactionType(user, storybook, deleteReactionRequest.reactionType()).orElseThrow(() -> ReactionNotFoundException.EXCEPTION);

        reaction.validUserIsHost(user);

        reactionCountServiceUtils.subReactionCount(reaction.getStorybook().getId(), reaction.getReactionType());

        reactionRepository.delete(reaction);
    }

    public ReactionCountResponse getReactionCount(Long storybookId) {
        return reactionCountServiceUtils.getReactionCount(storybookId);
    }
}
