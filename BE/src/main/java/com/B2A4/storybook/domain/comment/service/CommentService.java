package com.B2A4.storybook.domain.comment.service;

import com.B2A4.storybook.domain.comment.domain.Comment;
import com.B2A4.storybook.domain.comment.domain.repository.CommentRepository;
import com.B2A4.storybook.domain.comment.exception.CommentNotFoundException;
import com.B2A4.storybook.domain.comment.presentation.dto.request.CreateCommentRequest;
import com.B2A4.storybook.domain.comment.presentation.dto.request.UpdateCommentRequest;
import com.B2A4.storybook.domain.comment.presentation.dto.response.CommentResponse;
import com.B2A4.storybook.domain.storybook.domain.Storybook;
import com.B2A4.storybook.domain.storybook.service.StorybookServiceUtils;
import com.B2A4.storybook.domain.user.domain.User;
import com.B2A4.storybook.global.utils.user.UserUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserUtils userUtils;
    private final StorybookServiceUtils storybookServiceUtils;

    @Transactional
    public CommentResponse createComment(CreateCommentRequest createCommentRequest) {
        User user = userUtils.getUserFromSecurityContext();
        Storybook storybook = storybookServiceUtils.queryStorybook(createCommentRequest.storybookId());

        Comment comment = Comment.createComment(
                user,
                storybook,
                createCommentRequest.content()
        );

        commentRepository.save(comment);

        return new CommentResponse(comment.getCommentInfoVO());
    }

    public Slice<CommentResponse> getComments(Long storybookId, int page) {
        Storybook storybook = storybookServiceUtils.queryStorybook(storybookId);
        PageRequest pageRequest = PageRequest.of(page, 10, Sort.by(Sort.Direction.ASC, "id"));

        Slice<Comment> commentList = commentRepository.findAllByStorybook(storybook, pageRequest);

        return commentList.map(comment -> new CommentResponse(comment.getCommentInfoVO()));
    }

    @Transactional
    public void updateComment(Long commentId, UpdateCommentRequest updateCommentRequest) {
        Comment comment = queryComment(commentId);

        comment.changeContent(updateCommentRequest.content());
    }

    @Transactional
    public void deleteComment(Long commentId) {
        Comment comment = queryComment(commentId);

        commentRepository.delete(comment);
    }

    public Comment queryComment(Long commentId) {
        return commentRepository.findById(commentId).orElseThrow(() -> CommentNotFoundException.EXCEPTION);
    }
}
