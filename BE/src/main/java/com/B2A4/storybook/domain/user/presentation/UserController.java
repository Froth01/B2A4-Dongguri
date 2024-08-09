package com.B2A4.storybook.domain.user.presentation;

import com.B2A4.storybook.domain.user.presentation.dto.request.CheckNicknameRequest;
import com.B2A4.storybook.domain.user.presentation.dto.request.SignUpUserRequest;
import com.B2A4.storybook.domain.user.presentation.dto.request.UpdateUserRequest;
import com.B2A4.storybook.domain.user.presentation.dto.response.CheckNicknameResponse;
import com.B2A4.storybook.domain.user.presentation.dto.response.SignUpResponse;
import com.B2A4.storybook.domain.user.presentation.dto.response.UserBasicProfileResponse;
import com.B2A4.storybook.domain.user.presentation.dto.response.UserProfileResponse;
import com.B2A4.storybook.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.*;

import static io.swagger.v3.oas.annotations.enums.ParameterIn.PATH;

@Tag(name = "유저", description = "유저 관련 API")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @SecurityRequirements
    @Operation(summary = "회원가입")
    @PostMapping("/signup")
    public SignUpResponse signUpUser(
            @RequestBody @Valid SignUpUserRequest signUpUserRequest,
            HttpServletResponse response) {
        return userService.signUp(signUpUserRequest, response);
    }

    @Operation(summary = "로그아웃")
    @PostMapping("/logout")
    public void logout(HttpServletResponse response) {
        userService.logout(response);
    }

    @Operation(summary = "회원정보 조회")
    @GetMapping("/{userId}")
    public UserBasicProfileResponse getUserProfile(
            @Parameter(description = "유저 Id", in = PATH)
            @PathVariable Long userId
    ) {
        return userService.getUserBasicProfile(userId);
    }

    @Operation(summary = "회원정보 수정")
    @PatchMapping()
    public UserProfileResponse updateUserProfile(@RequestBody @Valid UpdateUserRequest updateUserRequest) {
        return userService.updateUserProfile(updateUserRequest);
    }

    @Operation(summary = "닉네임 중복 체크")
    @PostMapping("/check-nickname")
    public CheckNicknameResponse checkNickname(CheckNicknameRequest nicknameCheckRequest) {
        return userService.checkNickname(nicknameCheckRequest);
    }

    @Operation(summary = "회원 탈퇴")
    @DeleteMapping
    public void userWithdraw(HttpServletResponse response) {
        userService.userWithdraw(response);
    }

    @Operation(summary = "회원 목록 닉네임으로 조회")
    @GetMapping
    public Slice<UserBasicProfileResponse> getUserBasicProfileListByNickname(@RequestParam String nickname, @RequestParam(defaultValue = "1") int page) {
        return userService.getUserBasicProfileListByNickname(page, nickname);
    }
}
