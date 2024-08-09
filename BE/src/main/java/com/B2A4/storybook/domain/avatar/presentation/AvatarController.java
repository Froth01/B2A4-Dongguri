package com.B2A4.storybook.domain.avatar.presentation;

import com.B2A4.storybook.domain.avatar.presentation.dto.request.ChangeAvatarNameRequest;
import com.B2A4.storybook.domain.avatar.presentation.dto.request.ChangeDisplayAvatarRequest;
import com.B2A4.storybook.domain.avatar.presentation.dto.request.ChangeRepresentativeAvatarRequest;
import com.B2A4.storybook.domain.avatar.presentation.dto.response.AvatarResponse;
import com.B2A4.storybook.domain.avatar.service.AvatarService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "아바타", description = "아바타 관련 API")
@RestController
@RequestMapping("/api/avatars")
@RequiredArgsConstructor
public class AvatarController {

    private final AvatarService avatarService;

    @Operation(summary = "대표 동그리 조회하기")
    @GetMapping("/representative")
    public AvatarResponse getRepresentativeAvatar() {
        return avatarService.getRepresentativeAvatar();
    }

    @Operation(summary = "동그리 컬렉션 조회하기")
    @GetMapping()
    public List<AvatarResponse> getAllRepresentativeAvatars() {
        return avatarService.getAllRepresentativeAvatars();
    }

    @Operation(summary = "동그리 이름 변경")
    @PatchMapping("/{avatarId}")
    public AvatarResponse updateAvatarName(@PathVariable Long avatarId,@RequestBody ChangeAvatarNameRequest changeAvatarNameRequest) {
        return avatarService.updateAvatarName(avatarId, changeAvatarNameRequest);
    }

    @Operation(summary = "동그리 표기 레벨 변경")
    @PatchMapping("/display")
    public void updateAvatarName(@RequestBody ChangeDisplayAvatarRequest changeDisplayAvatarRequest) {
        avatarService.updateDisplayAvatar(changeDisplayAvatarRequest);
    }

    @Operation(summary = "대표 동그리 변경")
    @PatchMapping
    public void updateRepresentativeAvatar(@RequestBody ChangeRepresentativeAvatarRequest changeRepresentativeAvatarRequest) {
        avatarService.updateRepresentativeAvatar(changeRepresentativeAvatarRequest);
    }

//    @Operation(summary = "동그리 레벨 업 테스트")
//    @PostMapping("/test/{avatarId}")
//    public void levelUp(@PathVariable Long avatarId) {
//        avatarService.levelUp(avatarId);
//    }
}
