package com.B2A4.storybook.domain.oauth.domain.repository;

import com.B2A4.storybook.domain.oauth.domain.OauthMember;
import com.B2A4.storybook.domain.oauth.domain.OauthServerType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OauthMemberRepository extends JpaRepository<OauthMember, Long> {

    Optional<OauthMember> findByOauthServerTypeAndEmail(OauthServerType oauthServerType, String email);
}
