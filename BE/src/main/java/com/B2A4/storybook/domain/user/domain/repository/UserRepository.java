package com.B2A4.storybook.domain.user.domain.repository;

import com.B2A4.storybook.domain.oauth.domain.OauthServerType;
import com.B2A4.storybook.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByOauthServerTypeAndEmail(OauthServerType oauthServerType, String email);

    Optional<User> findByNickname(String nickname);
}
