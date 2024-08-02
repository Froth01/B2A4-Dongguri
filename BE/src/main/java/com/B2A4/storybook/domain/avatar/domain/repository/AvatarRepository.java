package com.B2A4.storybook.domain.avatar.domain.repository;

import com.B2A4.storybook.domain.avatar.domain.Avatar;
import com.B2A4.storybook.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AvatarRepository extends JpaRepository<Avatar, Long> {

    Optional<Avatar> findByUserAndIsRepresentative(User user, boolean isRepresentative);
    List<Avatar> findAllByUser(User user);
}
