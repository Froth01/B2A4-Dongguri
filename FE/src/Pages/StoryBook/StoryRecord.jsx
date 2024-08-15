
// import { useState, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Guide from "../../Components/StoryBook/Common/Guide";
// import Card from "../../Components/Home/Common/Card";
// import "./css/StoryRecord.css";
// import RecordBtn from '../../Components/StoryBook/Common/RecordBtn';
// import { selectStorybook, fetchStoryBooksThunk } from '../../slices/storyBookSlice'; // Thunk 가져오기
// import { selectPathHistory } from '../../slices/pathHistorySlice';
// import { useNavigate } from 'react-router-dom';

// function StoryRecord() {
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioUrl, setAudioUrl] = useState('');
//   const mediaRecorderRef = useRef(null);

//   const storybookData = useSelector(selectStorybook);
//   const pathHistory = useSelector(selectPathHistory);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleRecord = async () => {
//     if (!isRecording) {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorderRef.current = new MediaRecorder(stream);
//       mediaRecorderRef.current.ondataavailable = (event) => {
//         const audioBlob = event.data;
//         const url = URL.createObjectURL(audioBlob);
//         setAudioUrl(url);
//       };
//       mediaRecorderRef.current.start();
//       setIsRecording(true);
//     } else {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   const handlePlayRecording = () => {
//     const audio = new Audio(audioUrl);
//     audio.play();
//   };

//   const handleShowResults = async() => {
//     console.log('결과 확인 중..')
//     try {
//       const isTodayKeyword = pathHistory.includes('/storybook/storytoday');
//       console.log('보낼 동화 데이터',storybookData);

//       // 동화 데이터를 스토어에서 가져와서 Thunk로 전달
//       const formData = new FormData();
//       formData.append('genre', storybookData.genre);
//       formData.append('content', storybookData.content);
//       formData.append('originalImageUrl', storybookData.originalImageUrl);
//       formData.append('transformedImageUrl', storybookData.transformedImageUrl);
//       formData.append('voiceRecordingUrl', storybookData.voiceRecordingFile.url);
//       formData.append('isTodayKeyword', isTodayKeyword);
//       storybookData.keywords.forEach((keywords, index) => {
//         formData.append(`keywords[${index}]`, keywords);
//       });

//       // Thunk 호출하여 동화 생성 및 페이지 이동
//       const resultAction = await dispatch(fetchStoryBooksThunk(formData));
//       if (fetchStoryBooksThunk.fulfilled.match(resultAction)) {
//         const storybook = resultAction.payload
//         const storybookId = resultAction.payload.storybookId;
//         console.log('동화 데이터',storybook)
//         console.log('동화 id:', storybookId);
//         navigate(`/sns/${storybookId}`, { state: { card: storybook }});
//       }
//     } catch (error) {
//       console.error('동화 생성 실패:', error);
//     }
//   };

//   return (
//     <div className='page-container record-wrapper'>
//       <div className='record-left'>
//         {storybookData && <Card card={storybookData} showMic={false} />}
//       </div>
      
//       <div className='record-right'>
//         <Guide page="storyRecord"/>
//         <RecordBtn onRecord={handleRecord} onPlay={handlePlayRecording} isRecording={isRecording} onShowResults={handleShowResults} />
//       </div>
//     </div>
//   );
// }

// export default StoryRecord;


import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Guide from "../../Components/StoryBook/Common/Guide";
import Card from "../../Components/Home/Common/Card";
import "./css/StoryRecord.css";
import RecordBtn from '../../Components/StoryBook/Common/RecordBtn';
import { selectStorybook, fetchStoryBooksThunk } from '../../slices/storyBookSlice'; 
import { selectPathHistory } from '../../slices/pathHistorySlice';
import { useNavigate } from 'react-router-dom';

function StoryRecord() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const mediaRecorderRef = useRef(null);

  const storybookData = useSelector(selectStorybook);
  const pathHistory = useSelector(selectPathHistory);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRecord = async () => {
    if (!isRecording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        const audioBlob = event.data;
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } else {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handlePlayRecording = () => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  const handleShowResults = async() => {
    console.log('결과 확인 중..')
    try {
      const isTodayKeyword = pathHistory.includes('/storybook/storytoday');
      console.log('보낼 동화 데이터',storybookData);

      const formData = new FormData();
      formData.append('genre', storybookData.genre);
      formData.append('content', storybookData.content);
      formData.append('originalImageUrl', storybookData.originalImageUrl);
      formData.append('transformedImageUrl', storybookData.transformedImageUrl);
      formData.append('voiceRecordingUrl', storybookData.voiceRecordingFile.url);
      formData.append('isTodayKeyword', isTodayKeyword);
      storybookData.keywords.forEach((keywords, index) => {
        formData.append(`keywords[${index}]`, keywords);
      });

      const resultAction = await dispatch(fetchStoryBooksThunk(formData));
      if (fetchStoryBooksThunk.fulfilled.match(resultAction)) {
        const storybook = resultAction.payload;
        const storybookId = resultAction.payload.storybookId;
        console.log('동화 데이터',storybook);
        console.log('동화 id:', storybookId);
        navigate(`/sns/${storybookId}`, { state: { card: storybook, fromStoryRecord: true }});
      }
    } catch (error) {
      console.error('동화 생성 실패:', error);
    }
  };

  return (
    <div className='page-container record-wrapper'>
      <div className='record-left'>
        {storybookData && <Card card={storybookData} showMic={false} />}
      </div>
      
      <div className='record-right'>
        <Guide page="storyRecord"/>
        <RecordBtn onRecord={handleRecord} onPlay={handlePlayRecording} isRecording={isRecording} onShowResults={handleShowResults} />
      </div>
    </div>
  );
}

export default StoryRecord;
