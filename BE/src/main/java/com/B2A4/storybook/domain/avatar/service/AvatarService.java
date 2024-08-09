package com.B2A4.storybook.domain.avatar.service;

import com.B2A4.storybook.domain.avatar.domain.Avatar;
import com.B2A4.storybook.domain.avatar.domain.AvatarLevel;
import com.B2A4.storybook.domain.avatar.domain.AvatarType;
import com.B2A4.storybook.domain.avatar.domain.repository.AvatarRepository;
import com.B2A4.storybook.domain.avatar.exception.AvatarNotFoundException;
import com.B2A4.storybook.domain.avatar.exception.DuplicateAvatarException;
import com.B2A4.storybook.domain.avatar.exception.RepresentativeAvatarNotFoundException;
import com.B2A4.storybook.domain.avatar.exception.UserIsNotHostAvatarException;
import com.B2A4.storybook.domain.avatar.presentation.dto.request.ChangeAvatarNameRequest;
import com.B2A4.storybook.domain.avatar.presentation.dto.request.ChangeDisplayAvatarRequest;
import com.B2A4.storybook.domain.avatar.presentation.dto.request.ChangeRepresentativeAvatarRequest;
import com.B2A4.storybook.domain.avatar.presentation.dto.response.AvatarResponse;
import com.B2A4.storybook.domain.user.domain.User;
import com.B2A4.storybook.global.utils.user.UserUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AvatarService implements AvatarServiceUtils{

    private final AvatarRepository avatarRepository;
    private final UserUtils userUtils;

    @Transactional
    public Avatar createAvatar(User user, AvatarType avatarType, boolean isRepresentative) {
        Avatar avatar = Avatar.createAvatar(
                user,
                avatarType,
                isRepresentative
        );

        avatarRepository.save(avatar);

        return avatar;
    }

    @Override
    @Transactional
    public void createAllAvatars(User user) {
        for (AvatarType avatarType : AvatarType.values()) {
            boolean isRepresentative = avatarType.equals(AvatarType.GYEOMI);
            createAvatar(user, avatarType, isRepresentative);
        }
    }

    public AvatarResponse getRepresentativeAvatar() {
        User user = userUtils.getUserFromSecurityContext();

        Avatar avatar = avatarRepository.findByUserAndIsRepresentative(user, true).orElseThrow(() -> RepresentativeAvatarNotFoundException.EXCEPTION);

        return new AvatarResponse(avatar.getAvatarInfoVO());
    }

    public List<AvatarResponse> getAllRepresentativeAvatars() {
        User user = userUtils.getUserFromSecurityContext();

        return avatarRepository.findAllByUser(user).stream()
                .map(avatar -> new AvatarResponse(avatar.getAvatarInfoVO()))
                .collect(Collectors.toList());
    }

    @Transactional
    public AvatarResponse updateAvatarName(Long avatarId, ChangeAvatarNameRequest changeAvatarNameRequest) {
        User user = userUtils.getUserFromSecurityContext();

        Avatar avatar = queryAvatar(avatarId);

        avatar.validUserIsHost(user.getId());
        avatar.updateName(changeAvatarNameRequest.name());

        return new AvatarResponse(avatar.getAvatarInfoVO());
    }

    @Override
    @Transactional
    public void updateRepresentativeAvatar(ChangeRepresentativeAvatarRequest changeRepresentativeAvatarRequest) {
        User user = userUtils.getUserFromSecurityContext();
        Avatar avatar = queryAvatar(changeRepresentativeAvatarRequest.avatarId());
        Avatar representativeAvatar = avatarRepository.findByUserAndIsRepresentative(user, true).orElseThrow(() -> RepresentativeAvatarNotFoundException.EXCEPTION);

        if (avatar.getId() == representativeAvatar.getId()) throw DuplicateAvatarException.EXCEPTION;
        else if (avatar.getUser().getId() != user.getId()) throw UserIsNotHostAvatarException.EXCEPTION;
        avatar.updateRepresentative();
        representativeAvatar.updateRepresentative();
    }

    @Transactional
    public void updateDisplayAvatar(ChangeDisplayAvatarRequest changeDisplayAvatarRequest) {
        User user = userUtils.getUserFromSecurityContext();
        Avatar avatar = queryAvatar(changeDisplayAvatarRequest.avatarId());

        avatar.validUserIsHost(user.getId());

        avatar.updateDisplayLevel(changeDisplayAvatarRequest.avatarLevel());
    }

    @Override
    @Transactional
    public void levelUp() {
        User user = userUtils.getUserFromSecurityContext();

        Avatar avatar = avatarRepository.findByUserAndIsRepresentative(user, true).orElseThrow(() -> RepresentativeAvatarNotFoundException.EXCEPTION);

        avatar.addExp();

        AvatarLevel avatarLevel = AvatarLevel.levelUp(avatar);

        avatar.levelUp(avatarLevel);
    }

    @Override
    public Avatar queryAvatar(Long avatarId) {
        return avatarRepository.findById(avatarId).orElseThrow(() -> AvatarNotFoundException.EXCEPTION);
    }
}
