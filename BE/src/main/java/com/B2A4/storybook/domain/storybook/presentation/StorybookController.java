package com.B2A4.storybook.domain.storybook.presentation;

import com.B2A4.storybook.domain.storybook.presentation.dto.request.CreateStorybookRequest;
import com.B2A4.storybook.domain.storybook.presentation.dto.request.TransformStorybookRequest;
import com.B2A4.storybook.domain.storybook.presentation.dto.response.StorybookResponse;
import com.B2A4.storybook.domain.storybook.presentation.dto.response.TransformStorybookResponse;
import com.B2A4.storybook.domain.storybook.service.StorybookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "동화", description = "동화 관련 API")
@RestController
@RequestMapping("/api/storybooks")
@RequiredArgsConstructor
public class StorybookController {
    private final StorybookService storybookService;

    @Operation(summary = "동화 그림, 스토리 생성")
    @PostMapping("/transform")
    public TransformStorybookResponse transform(@RequestBody TransformStorybookRequest transformStorybookRequest) {
        return storybookService.transform(transformStorybookRequest);
    }

    @Operation(summary = "동화 등록")
    @PostMapping
    public StorybookResponse createStorybook(@RequestBody CreateStorybookRequest createStorybookRequest) {
        return storybookService.createStorybook(createStorybookRequest);
    }

    @Operation(summary = "동화 조회")
    @PatchMapping("/{storybookId}")
    public StorybookResponse getStorybook(@PathVariable long storybookId) {
        return storybookService.getStorybook(storybookId);
    }

    @Operation(summary = "해당 유저의 동화 목록 조회")
    @GetMapping("/users/{userId}")
    public List<StorybookResponse> getStorybookListByUser(@PathVariable long userId) {
        return storybookService.getStorybookListByUser(userId);
    }

    @Operation(summary = "해당 키워드로 동화 목록 조회")
    @GetMapping
    public List<StorybookResponse> getStorybookListByKeyword(@RequestParam String keyword) {
        return storybookService.getStorybookListByKeyword(keyword);
    }

    @Operation(summary = "동화 삭제")
    @DeleteMapping("/{storybookId}")
    public void deleteStorybook(@PathVariable long storybookId) {
        storybookService.deleteStorybook(storybookId);
    }
}
