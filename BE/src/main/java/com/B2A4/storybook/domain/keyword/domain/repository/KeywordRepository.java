package com.B2A4.storybook.domain.keyword.domain.repository;

import com.B2A4.storybook.domain.keyword.domain.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KeywordRepository extends JpaRepository<Keyword, Long> {
}
