package com.B2A4.storybook.domain.comment.presentation;

import com.B2A4.storybook.domain.comment.presentation.dto.request.CreateCommentRequest;
import com.B2A4.storybook.domain.comment.presentation.dto.request.UpdateCommentRequest;
import com.B2A4.storybook.domain.comment.presentation.dto.response.CommentResponse;
import com.B2A4.storybook.domain.comment.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.*;

@Tag(name = "댓글", description = "댓글 관련 API")
@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @Operation(summary = "댓글 작성")
    @PostMapping
    public CommentResponse createComment(@RequestBody CreateCommentRequest createCommentRequest) {
        return commentService.createComment(createCommentRequest);
    }

    @Operation(summary = "댓글 리스트 조회")
    @GetMapping("/{storybookId}")
    public Slice<CommentResponse> getComments(@PathVariable Long storybookId, @RequestParam int page) {
        return commentService.getComments(storybookId, page);
    }

    @Operation(summary = "댓글 수정")
    @PatchMapping("/{commentId}")
    public void updateComment(@PathVariable Long commentId, @RequestBody UpdateCommentRequest updateCommentRequest) {
        commentService.updateComment(commentId, updateCommentRequest);
    }

    @Operation(summary = "댓글 삭제")
    @DeleteMapping("/{commentId}")
    public void deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
    }
}
