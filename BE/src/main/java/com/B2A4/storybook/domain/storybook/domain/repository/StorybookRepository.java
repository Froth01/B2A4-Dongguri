package com.B2A4.storybook.domain.storybook.domain.repository;

import com.B2A4.storybook.domain.storybook.domain.Storybook;
import com.B2A4.storybook.domain.user.domain.User;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StorybookRepository extends JpaRepository<Storybook, Long> {
    Slice<Storybook> findByUser(User user, Pageable pageable);

    Slice<Storybook> findByKeywordsKeyword(String keyword, PageRequest pageRequest);
}
