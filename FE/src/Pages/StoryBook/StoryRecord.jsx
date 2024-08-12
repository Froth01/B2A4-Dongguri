import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Guide from "../../Components/StoryBook/Common/Guide";
import Card from "../../Components/Home/Common/Card";
import "./css/StoryRecord.css";
import RecordBtn from '../../Components/StoryBook/Common/RecordBtn';
import { selectStorybook } from '../../slices/storyBookSlice';
// import { fetchAudio } from '../../Api/api';
// import { imgUpload } from '../../slices/imgSlice';
import { fetchStoryBooks } from '../../Api/api';
import { selectPathHistory } from '../../slices/pathHistorySlice'
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
        // console.log(audioBlob)
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
      // const pathHistory = useSelector(selectPathHistory);
      const isTodayKeyword = pathHistory.includes('/storybook/storytoday');
      console.log('storybookData',storybookData)
      // 동화 데이터를 준비합니다.
      const formData = new FormData();
      formData.append('genre', storybookData.genre);
      formData.append('content', storybookData.content);
      formData.append('originalImageUrl', storybookData.originalImageUrl);
      formData.append('transformedImageUrl', storybookData.transformedImageUrl);
      formData.append('voiceRecordingFile', storybookData.voiceRecordingFile.url);
      formData.append('isTodayKeyword', isTodayKeyword);
      storybookData.keywords.forEach((keywords, index) => {
        formData.append(`keywords[${index}]`, keywords);
      });

      // 동화 데이터를 서버에 등록합니다.
      const response = await fetchStoryBooks(formData);
      console.log('동화 등록 완료:', response);
      const storybookId = response.data.storybookId;
      console.log('동화 id:', storybookId);
      navigate(`/sns/${storybookId}`); // 응답을 받은 후에 페이지 이동
    } catch (error) {
      console.error('API 요청 실패:', error);
    }
    console.log('Showing results...');
  };

  return (
    <div className='page-container record-wrapper'>
      <div className='record-left'>
        {storybookData && <Card card={storybookData} showMic={false} />}
        {/* <Card card={{
          content: "예시 컨텐츠",
          keywords: ["tag1", "tag2", "tag3"],
          transformImgUrl: "/path/to/transformed/image.jpg",
          originalImgUrl: "/path/to/original/image.jpg"
        }} showMic={false} /> */}
      </div>
      
      <div className='record-right'>
        <Guide page="storyRecord"/>
        <RecordBtn onRecord={handleRecord} onPlay={handlePlayRecording} isRecording={isRecording} onShowResults={handleShowResults} />
      </div>
    </div>
  );
}

export default StoryRecord;
