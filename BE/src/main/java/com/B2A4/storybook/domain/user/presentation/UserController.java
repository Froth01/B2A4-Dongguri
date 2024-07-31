package com.B2A4.storybook.domain.user.presentation;

import com.B2A4.storybook.domain.user.domain.service.UserService;
import com.B2A4.storybook.domain.user.presentation.dto.response.SignUpResponse;
import com.B2A4.storybook.domain.user.presentation.dto.request.SignUpUserRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "유저", description = "유저 관련 API")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @SecurityRequirements
    @Operation(summary = "회원가입")
    @PostMapping("/signup")
    public SignUpResponse signUpUser(@RequestBody @Valid SignUpUserRequest signUpUserRequest, HttpServletResponse response) {
        return userService.signUp(signUpUserRequest, response);
    }

    @Operation(summary = "로그아웃")
    @PostMapping("/logout")
    public void logout(HttpServletResponse response) {
        userService.logout(response);
    }
}
