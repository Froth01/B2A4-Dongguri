package com.B2A4.storybook.global.error.exception;

import com.B2A4.storybook.global.error.ErrorResponse;
import com.B2A4.storybook.global.slack.SlackService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.io.IOException;
import java.util.HashMap;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    private final SlackService slackService;

    @ExceptionHandler(MainException.class)
    public ResponseEntity<ErrorResponse> bookMarkExceptionHandler(
            MainException e, HttpServletRequest request) throws IOException {

        ErrorCode code = e.getErrorCode();

        ErrorResponse errorResponse =
                new ErrorResponse(
                        code.getStatus(),
                        code.getReason());

        sendSlackMessage(e, code);

        return ResponseEntity.status(HttpStatus.valueOf(code.getStatus())).body(errorResponse);
    }

    @ExceptionHandler(Throwable.class)
    protected ResponseEntity<ErrorResponse> storybookHandleException(Exception e, HttpServletRequest request)
            throws IOException {

        log.error("INTERNAL_SERVER_ERROR", e);
        ErrorCode internalServerError = ErrorCode.INTERNAL_SERVER_ERROR;
        ErrorResponse errorResponse =
                new ErrorResponse(
                        internalServerError.getStatus(),
                        internalServerError.getReason());

        sendSlackMessage(e, internalServerError);

        return ResponseEntity.status(HttpStatus.valueOf(internalServerError.getStatus()))
                .body(errorResponse);
    }

    private void sendSlackMessage(Exception e, ErrorCode errorCode) {
        HashMap<String, String> message = new HashMap<>();
        String errorMessage = e.getMessage() == null ? errorCode.getReason() : e.getMessage();
        message.put("예외 로그", errorMessage);
        log.info("예외 로그 : " + errorMessage);
        slackService.sendMessage(errorCode.getReason(), message);
    }
}

