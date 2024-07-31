package com.B2A4.storybook.global.error.exception;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    /* 400 BAD_REQUEST : 잘못된 요청 */
    FILE_SIZE(400, "업로드 된 파일 사이즈가 초과되었습니다."),
    BAD_FILE_EXTENSION(400, "유효한 확장명의 파일이 아닙니다."),
    FILE_UPLOAD_FAIL(400, "파일 업로드에 실패하였습니다."),

    /* 401 UNAUTHORIZED : 인증되지 않은 사용자 */
    INVALID_REFRESH_TOKEN(401, "리프레시 토큰이 유효하지 않습니다"),
    INVALID_ACCESS_TOKEN(401, "Access 토큰이 유효하지 않습니다"),
    INVALID_TOKEN(401, "토큰이 유효하지 않습니다."),
    EXPIRED_TOKEN(401, "토큰이 만료되었습니다."),
    AUTHENTICATION_TIME_OUT(401, "인증 시간이 만료되었습니다."),

    /* 403 */
    REGISTER_EXPIRED_TOKEN(403,"만료된 리프레쉬 토큰입니다."),
    USER_INFO_NOT_FOUND(404, "회원가입을 진행해 주세요."),

    /* 404 NOT_FOUND : Resource를 찾을 수 없음 */
    USER_NOT_FOUND(404, "해당하는 정보의 사용자를 찾을 수 없습니다."),
    NO_ERROR_TYPE(404, "오류 발생"),
    FILE_EMPTY(404, "업로드 된 파일을 찾을 수 없습니다."),
    OAUTH_MEMBER_NOT_FOUND(404, "해당하는 로그인 정보를 찾을 수 없습니다."),

    /* 500 SERVER_ERROR */
    INTERNAL_SERVER_ERROR(500,"서버 에러");
    private int status;
    private String reason;
}