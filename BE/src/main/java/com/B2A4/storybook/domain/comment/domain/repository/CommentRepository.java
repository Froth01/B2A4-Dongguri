package com.B2A4.storybook.domain.comment.domain.repository;

import com.B2A4.storybook.domain.comment.domain.Comment;
import com.B2A4.storybook.domain.storybook.domain.Storybook;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Slice<Comment> findAllByStorybook(Storybook storybook, Pageable pageable);
}
