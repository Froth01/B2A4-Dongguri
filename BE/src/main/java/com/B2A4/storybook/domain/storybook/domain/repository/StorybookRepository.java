package com.B2A4.storybook.domain.storybook.domain.repository;

import com.B2A4.storybook.domain.storybook.domain.Storybook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StorybookRepository extends JpaRepository<Storybook, Long> {
}
