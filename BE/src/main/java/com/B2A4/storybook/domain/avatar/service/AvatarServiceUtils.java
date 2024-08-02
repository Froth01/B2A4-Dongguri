package com.B2A4.storybook.domain.avatar.service;

import com.B2A4.storybook.domain.avatar.domain.Avatar;
import com.B2A4.storybook.domain.avatar.presentation.dto.request.ChangeRepresentativeAvatarRequest;

public interface AvatarServiceUtils {

    void createAllAvatars();
    Avatar queryAvatar(Long avatarId);
    void updateRepresentativeAvatar(ChangeRepresentativeAvatarRequest changeRepresentativeAvatarRequest);
    void levelUp(Long avatarId);
}