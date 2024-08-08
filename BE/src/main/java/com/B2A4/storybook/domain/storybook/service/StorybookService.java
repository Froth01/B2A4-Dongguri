package com.B2A4.storybook.domain.storybook.service;

import com.B2A4.storybook.domain.keyword.domain.Keyword;
import com.B2A4.storybook.domain.keyword.domain.repository.KeywordRepository;
import com.B2A4.storybook.domain.storybook.domain.Storybook;
import com.B2A4.storybook.domain.storybook.domain.repository.StorybookRepository;
import com.B2A4.storybook.domain.storybook.exception.KeywordMissingException;
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
    public List<StorybookResponse> getStorybookListByUser(long userId) {
        User user = userUtils.getUserById(userId);

        List<Storybook> storybooks = storybookRepository.findByUser(user);

        List<StorybookResponse> storybookResponseList = new ArrayList<>();
        boolean isMine = user.equals(userUtils.getUserFromSecurityContext());
        for (Storybook storybook : storybooks) {
            List<String> keywords = new ArrayList<>();
            for (Keyword keyword : storybook.getKeywords()) {
                keywords.add(keyword.getKeyword());
            }
            storybookResponseList.add(new StorybookResponse(storybook.getStorybookInfoVO(), keywords, isMine));
        }

        return storybookResponseList;
    }

    @Override
    public List<StorybookResponse> getStorybookListByKeyword(String keyword) {
        if(keyword.isEmpty()) {
            throw KeywordMissingException.EXCEPTION;
        }

        User user = userUtils.getUserFromSecurityContext();

        List<Keyword> keywords = keywordRepository.findByKeyword(keyword);

        List<StorybookResponse> storybookResponseList = new ArrayList<>();
        for (Keyword keywordEntity : keywords) {
            Storybook storybook = keywordEntity.getStorybook();
            List<String> keywordList = new ArrayList<>();
            for (Keyword kw : storybook.getKeywords()) {
                keywordList.add(kw.getKeyword());
            }
            boolean isMine = user.equals(storybook.getUser());
            storybookResponseList.add(new StorybookResponse(storybook.getStorybookInfoVO(), keywordList, isMine));
        }

        return storybookResponseList;
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
