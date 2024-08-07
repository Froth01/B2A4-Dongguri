import { useState, useRef } from 'react';
import Guide from "../../Components/StoryBook/Common/Guide";
import Card from "../../Components/Home/Common/Card";
import "./css/StoryRecord.css";
import RecordBtn from '../../Components/StoryBook/Common/RecordBtn';

function StoryRecord() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const mediaRecorderRef = useRef(null);

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

  const handleShowResults = () => {
    // 결과보기 버튼 클릭 시 수행할 작업, 예를 들어 결과 페이지로 이동
    console.log('Showing results...');
  };

  return (
    <div className='page-container record-wrapper'>
      <div className='record-left'>
        <Card card={{
          content: "예시 컨텐츠",
          keywords: ["tag1", "tag2", "tag3"],
          transformImgUrl: "/path/to/transformed/image.jpg",
          originalImgUrl: "/path/to/original/image.jpg"
        }} showMic={false} />
      </div>
      
      <div className='record-right'>
        <Guide page="storyRecord"/>
        <RecordBtn onRecord={handleRecord} onPlay={handlePlayRecording} isRecording={isRecording} onShowResults={handleShowResults} />
      </div>
    </div>
  );
}

export default StoryRecord;
