export const ErrorCode = {
   /* 400 BAD_REQUEST : 잘못된 요청 */
   FILE_SIZE:{stats:400, reason: "업로드 된 파일 사이즈가 초과되었습니다."},
   BAD_FILE_EXTENSION:{stats:400, reason: "유효한 확장명의 파일이 아닙니다."},
   FILE_UPLOAD_FAIL:{stats:400, reason: "파일 업로드에 실패하였습니다."},
   DUPLICATE_AVATAR:{stats:400, reason: "대표 동그리와 같습니다."},
   NICKNAME_MISSING:{stats:400, reason: "닉네임이 입력되지 않았습니다."},
   KEYWORD_MISSING:{stats:400, reason: "키워드가 입력되지 않았습니다."},

   /* 401 UNAUTHORIZED : 인증되지 않은 사용자 */
   INVALID_REFRESH_TOKEN:{stats:401, reason: "리프레시 토큰이 유효하지 않습니다"},
   INVALID_ACCESS_TOKEN:{stats:401, reason: "Access 토큰이 유효하지 않습니다"},
   INVALID_TOKEN:{stats:401, reason: "토큰이 유효하지 않습니다."},
   INVALID_URL:{stats:401, reason: "URL 주소가 유요하지 않습니다."},
   EXPIRED_TOKEN:{stats:401, reason: "토큰이 만료되었습니다."},
   AUTHENTICATION_TIME_OUT:{stats:401, reason: "인증 시간이 만료되었습니다."},

   /* 403 */
   REGISTER_EXPIRED_TOKEN:{stats:403, reason:"만료된 리프레쉬 토큰입니다."},
   USER_INFO_NOT_FOUND:{stats:404, reason: "회원가입을 진행해 주세요."},
   USER_NOT_AVATAR_HOST:{stats:403,  reason:"해당하는 동그리의 소유자가 아닙니다."},
   USER_NOT_STORYBOOK_HOST:{stats:403, reason: "해당 동화의 소유자가 아닙니다."},
   USER_NOT_STORY_WORLD_HOST:{stats:403, reason: "해당하는 동화나라의 소유자가 아닙니다."},
   USER_NOT_REACTION_HOST:{stats:403, reason: "해당하는 공감의 소유자가 아닙니다."},

   /* 404 NOT_FOUND : Resource를 찾을 수 없음 */
   USER_NOT_FOUND:{stats:404,  reason:"해당하는 정보의 사용자를 찾을 수 없습니다."},
   NO_ERROR_TYPE:{stats:404, reason: "오류 발생"},
   FILE_EMPTY:{stats:404,  reason:"업로드 된 파일을 찾을 수 없습니다."},
   OAUTH_MEMBER_NOT_FOUND:{stats:404,  reason:"해당하는 로그인 정보를 찾을 수 없습니다."},
   REPRESENTATIVE_AVATAR_NOT_FOUND:{stats:404, reason: "해당 유저의 대표 동그리를 찾을 수 없습니다."},
   AVATAR_NOT_FOUND:{stats:404,  reason:"해당하는 동그리를 찾을 수 없습니다."},
   STORYBOOK_NOT_FOUND:{stats:404,  reason:"해당하는 동화를 찾을 수 없습니다."},
   STORY_WORLD_NOT_FOUND:{stats:404, reason: "해당하는 동화나라를 찾을 수 없습니다."},
   REPORT_NOT_FOUND:{stats:404, reason: "해당하는 신고를 찾을 수 없습니다."},
   REACTION_NOT_FOUND:{stats:404,  reason:"해당하는 공감을 찾을 수 없습니다."},
   REACTION_COUNT_NOT_FOUND:{stats:404,  reason:"해당하는 공감 수를 찾을 수 없습니다."},
   DAILY_KEYWORD_NOT_FOUND:{stats:404, reason: "해당하는 오늘의 키워드를 찾을 수 없습니다."},

   /* 409 중복된 리소스 */
   NICKNAME_DUPLICATION:{stats:409,  reason:"이미 사용중인 닉네임입니다."},
   USER_DUPLICATION:{stats:409, reason: "이미 가입된 사용자입니다."},
   REACTION_DUPLICATION:{stats:409,  reason:"이미 공감된 정보입니다"},
   MAX_STORY_LIMIT_EXCEEDED:{stats:409, reason: "등록 가능한 이미지의 수를 초과했습니다."},

   /* 500 SERVER_ERROR */
   INTERNAL_SERVER_ERROR:{stats:500, reason:"서버 에러"},
   IMAGE_PROCESSING:{stats:500, reason: "이미지 처리 중 오류가 발생했습니다."},
   API_JSON_PARSE_ERROR:{stats:500, reason: "API JSON 응답에 파싱 에러가 발생했습니다."},
   API_IMAGE_UPLOAD_FILE:{stats:500,  reason:"AI 이미지 업로드에 실패하였습니다."},
}