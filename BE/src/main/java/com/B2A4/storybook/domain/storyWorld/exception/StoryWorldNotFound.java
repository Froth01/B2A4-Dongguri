package com.B2A4.storybook.domain.storyWorld.exception;

import com.B2A4.storybook.global.error.exception.ErrorCode;
import com.B2A4.storybook.global.error.exception.MainException;

public class StoryWorldNotFound extends MainException {

    public static final MainException EXCEPTION = new StoryWorldNotFound();

    private StoryWorldNotFound() {
        super(ErrorCode.STORY_WORLD_NOT_FOUND);
    }
}
