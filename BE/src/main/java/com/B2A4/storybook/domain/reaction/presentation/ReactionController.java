package com.B2A4.storybook.domain.reaction.presentation;

import com.B2A4.storybook.domain.reaction.presentation.dto.request.CreateReactionRequest;
import com.B2A4.storybook.domain.reaction.presentation.dto.request.DeleteReactionRequest;
import com.B2A4.storybook.domain.reaction.presentation.dto.response.ReactionResponse;
import com.B2A4.storybook.domain.reaction.service.ReactionService;
import com.B2A4.storybook.domain.reactionCount.presentation.dto.response.ReactionCountResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Tag(name = "공감", description = "공감 관련 API")
@RestController
@RequestMapping("/api/reactions")
@RequiredArgsConstructor
public class ReactionController {

    private final ReactionService reactionService;

    @Operation(summary = "공감하기")
    @PostMapping
    public ReactionResponse createReaction(@RequestBody CreateReactionRequest createReactionRequest) {
        return reactionService.createReaction(createReactionRequest);
    }

    @Operation(summary = "공감 취소")
    @DeleteMapping
    public void deleteReaction(@RequestBody DeleteReactionRequest deleteReactionRequest) {
        reactionService.deleteReaction(deleteReactionRequest);
    }

    @Operation(summary = "공감 수 조회")
    @GetMapping("/{storybookId}")
    public ReactionCountResponse getReactionCount(@PathVariable Long storybookId) {
        return reactionService.getReactionCount(storybookId);
    }
}
