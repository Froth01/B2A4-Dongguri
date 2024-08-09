package com.B2A4.storybook.domain.avatar.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class UserIsNotHostAvatarException extends MainException {
  public static final MainException EXCEPTION = new UserIsNotHostAvatarException();

  private UserIsNotHostAvatarException() {
    super(ErrorCode.USER_NOT_AVATAR_HOST);
  }
}
