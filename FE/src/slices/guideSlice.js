import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  guides: {
    storyMode: [
      "오늘의 주제로 동화를 만들어볼까?",
      "자유 주제로 동화를 만들어볼까?"
    ],
    storyFree: [
      "자유롭게 상상의 나래를 펼쳐서\n 재미있는 동화를 만들어줘!"
    ],
    storyToday: [
      "아래의 단어를 이용해서\n오늘의 동화를 만들어줘! "
    ],
    storyGenre: [
      "어떤 이야기가 좋아?\n하나 선택해줘!"
    ],
    storyImg: [
      "동화에 넣을 그림을 자랑해줘!"
    ],
    storyImgSelect: [
      "우리가 그림을 더 멋있게 만들어줄게!\n어떤 그림을 좋아하니?"
    ],
    storyKeyword: [
      "무슨 그림인지 설명해줘!"
    ],
    storyEnd: [
      "새로 만든 그림과 동화 설명이 마음에 드니?\n마음에 들지 않으면 다시 해봐!"
    ],
    storyRecord: [
       "그림과 동화 설명을 보고 \n직접 동화를 만들고 녹음해봐!"
    ],

  }
}
const guides = createSlice({
  name: 'guide',
  initialState,
  reducers: {},
});

export const selectDialogs = (state) => state.guide.guides;
export default guides.reducer