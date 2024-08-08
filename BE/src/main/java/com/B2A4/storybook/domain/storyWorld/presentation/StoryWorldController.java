package com.B2A4.storybook.domain.storyWorld.presentation;

import com.B2A4.storybook.domain.storyWorld.presentation.dto.request.UpdateStoryWorldRequest;
import com.B2A4.storybook.domain.storyWorld.presentation.dto.response.StoryWorldResponse;
import com.B2A4.storybook.domain.storyWorld.service.StoryWorldService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Tag(name = "동화나라", description = "동화나라 관련 API")
@RestController
@RequestMapping("/api/storyworlds")
@RequiredArgsConstructor
public class StoryWorldController {

    private final StoryWorldService storyWorldService;

    @Operation(summary = "동화나라 조회")
    @GetMapping("/{userId}")
    public StoryWorldResponse getStoryWorld(@PathVariable Long userId) {
        return storyWorldService.getStoryWorld(userId);
    }

    @Operation(summary = "동화나라 수정")
    @PatchMapping("/{storyWorldId}")
    public StoryWorldResponse updateStoryWorld(@PathVariable Long storyWorldId, @RequestBody UpdateStoryWorldRequest updateStoryWorldRequest) {
        return storyWorldService.updateStoryWorld(storyWorldId, updateStoryWorldRequest);
    }
}
