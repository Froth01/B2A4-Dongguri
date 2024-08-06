package com.B2A4.storybook.domain.storybook.domain.repository;

import com.B2A4.storybook.domain.storybook.domain.Storybook;
import com.B2A4.storybook.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StorybookRepository extends JpaRepository<Storybook, Long> {
    List<Storybook> findByUser(User user);
}
