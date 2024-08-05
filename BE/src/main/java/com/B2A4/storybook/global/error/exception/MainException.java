package com.B2A4.storybook.global.error.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MainException extends RuntimeException{

    private ErrorCode errorCode;
}