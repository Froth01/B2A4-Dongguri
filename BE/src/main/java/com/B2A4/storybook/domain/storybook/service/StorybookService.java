package com.B2A4.storybook.domain.storybook.service;

import com.B2A4.storybook.domain.keyword.domain.Keyword;
import com.B2A4.storybook.domain.keyword.domain.repository.KeywordRepository;
import com.B2A4.storybook.domain.reactionCount.service.ReactionCountServiceUtils;
import com.B2A4.storybook.domain.storybook.domain.Storybook;
import com.B2A4.storybook.domain.storybook.domain.repository.StorybookRepository;
import com.B2A4.storybook.domain.storybook.exception.StorybookNotFoundException;
import com.B2A4.storybook.domain.storybook.exception.UserNotStorybookHostException;
import com.B2A4.storybook.domain.storybook.presentation.dto.request.CreateStorybookRequest;
import com.B2A4.storybook.domain.storybook.presentation.dto.request.TransformStorybookRequest;
import com.B2A4.storybook.domain.storybook.presentation.dto.response.StorybookResponse;
import com.B2A4.storybook.domain.storybook.presentation.dto.response.TransformStorybookResponse;
import com.B2A4.storybook.domain.user.domain.User;
import com.B2A4.storybook.global.openapi.service.OpenAPIServiceUtils;
import com.B2A4.storybook.global.utils.user.UserUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StorybookService implements StorybookServiceUtils {

    private final StorybookRepository storybookRepository;
    private final KeywordRepository keywordRepository;
    private final UserUtils userUtils;
    private final OpenAPIServiceUtils openAPIServiceUtils;
    private final ReactionCountServiceUtils reactionCountServiceUtils;


    @Override
    public TransformStorybookResponse transform(TransformStorybookRequest transformStorybookRequest) {
        String content = openAPIServiceUtils.generateChatgpt(transformStorybookRequest);
        String prompt = openAPIServiceUtils.generateClaude(transformStorybookRequest);
        String transformedImageUrl = openAPIServiceUtils.generateDalle(prompt);
        return new TransformStorybookResponse(transformStorybookRequest.genre(), transformStorybookRequest.keywords(), content, transformStorybookRequest.originalImageUrl(), transformedImageUrl);
    }

    @Override
    @Transactional
    public StorybookResponse createStorybook(CreateStorybookRequest createStorybookRequest) {
        User user = userUtils.getUserFromSecurityContext();
        String transparentImageUrl = openAPIServiceUtils.removeBackground(createStorybookRequest.originalImageUrl());

        Storybook storybook = Storybook.createStorybook(
                user,
                createStorybookRequest.genre(),
                createStorybookRequest.content(),
                createStorybookRequest.originalImageUrl(),
                createStorybookRequest.transformedImageUrl(),
                transparentImageUrl,
                createStorybookRequest.voiceRecordingUrl(),
                createStorybookRequest.isTodayKeyword()
        );

        storybookRepository.save(storybook);

        reactionCountServiceUtils.createReactionCount(storybook.getId());

        List<String> keywords = createStorybookRequest.keywords();

        for (String keyword : keywords) {
            Keyword keywordEntity = Keyword.createKeyword(storybook, keyword);
            keywordRepository.save(keywordEntity);
        }

        return new StorybookResponse(storybook.getStorybookInfoVO(), keywords, true);
    }

    @Override
    public StorybookResponse getStorybook(Long storybookId) {
        User user = userUtils.getUserFromSecurityContext();
        Storybook storybook = queryStorybook(storybookId);
        boolean isMine = user.equals(storybook.getUser());

        List<String> keywords = new ArrayList<>();
        for (Keyword keyword : storybook.getKeywords()) {
            keywords.add(keyword.getKeyword());
        }

        return new StorybookResponse(storybook.getStorybookInfoVO(), keywords, isMine);
    }

    @Override
    public Slice<StorybookResponse> getStorybookListByUser(int page, long userId) {
        User user = userUtils.getUserById(userId);

        PageRequest pageRequest = PageRequest.of(page, 3, Sort.by(Sort.Direction.DESC, "lastModifyDate"));
        Slice<Storybook> storybooks = storybookRepository.findByUser(user, pageRequest);

        List<StorybookResponse> storybookResponseList = new ArrayList<>();
        boolean isMine = user.equals(userUtils.getUserFromSecurityContext());
        for (Storybook storybook : storybooks) {
            List<String> keywordList = storybook.getKeywords().stream().map(Keyword::getKeyword).toList();
            storybookResponseList.add(new StorybookResponse(storybook.getStorybookInfoVO(), keywordList, isMine));
        }

        boolean hasNext = storybooks.hasNext();
        return new SliceImpl<>(storybookResponseList, pageRequest, hasNext);
    }


    @Override
    public Slice<StorybookResponse> getStorybookListByKeyword(int page, String keyword) {

        User user = userUtils.getUserFromSecurityContext();
        PageRequest pageRequest = PageRequest.of(page, 3, Sort.by(Sort.Direction.DESC, "lastModifyDate"));

        List<StorybookResponse> responseList = new ArrayList<>();
        boolean hasNext = false;

        if (keyword.isEmpty()) {
            Slice<Storybook> storybookList = storybookRepository.findAll(pageRequest);
            for (Storybook storybook : storybookList) {
                List<String> keywordList = storybook.getKeywords().stream().map(Keyword::getKeyword).toList();
                boolean isMine = user.equals(storybook.getUser());
                responseList.add(new StorybookResponse(storybook.getStorybookInfoVO(), keywordList, isMine));
            }
            hasNext = storybookList.hasNext();
        } else {
            Slice<Keyword> keywords = keywordRepository.findByKeyword(keyword, pageRequest);
            for (Keyword keywordEntity : keywords) {
                Storybook storybook = keywordEntity.getStorybook();
                List<String> keywordList = storybook.getKeywords().stream().map(Keyword::getKeyword).toList();
                boolean isMine = user.equals(storybook.getUser());
                responseList.add(new StorybookResponse(storybook.getStorybookInfoVO(), keywordList, isMine));
            }
            hasNext = keywords.hasNext();
        }

        return new SliceImpl<>(responseList, pageRequest, hasNext);
    }


    @Override
    public List<Storybook> getStorybookListByStorybookIds(List<Long> storybookIds) {
        User user = userUtils.getUserFromSecurityContext();
        List<Storybook> storybookList = storybookRepository.findAllById(storybookIds);

        for (Storybook storybook : storybookList) {
            if (!storybook.getUser().getId().equals(user.getId())) {
                throw UserNotStorybookHostException.EXCEPTION;
            }
        }

        return storybookList;
    }

    @Override
    @Transactional
    public void deleteStorybook(Long storybookId) {
        User user = userUtils.getUserFromSecurityContext();
        Storybook storybook = queryStorybook(storybookId);
        storybook.validUserIsHost(user);
        storybookRepository.delete(storybook);
    }

    @Override
    public Storybook queryStorybook(Long storybookId) {
        return storybookRepository.findById(storybookId).orElseThrow(() -> StorybookNotFoundException.EXCEPTION);
    }
}
