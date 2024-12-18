import { useState, useEffect } from 'react';
import AudioPlayModal from './AudioPlayModal';
import './css/RecordBtn.css';  // CSS 스타일
import { fetchAudioUrl } from '../../../Api/api';
import { setVoiceRecordingFile } from '../../../slices/storyBookSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectVoiceRecordingFile } from '../../../slices/storyBookSlice';
import Listen from '/img/storybook/storyrecord/Listen2.png'
import Listening from '/img/storybook/storyrecord/Listening.png'
import Record from '/img/storybook/storyrecord/Record.png'
import Recording from '/img/storybook/storyrecord/Recording.png'
import Result from '/img/storybook/storyrecord/Result.png'


function RecordBtn({ onRecord, isRecording, onShowResults }) {
  const [audioSrc, setAudioSrc] = useState('');
  const [showPlayer, setShowPlayer] = useState(false);
  const [recorder, setRecorder] = useState(null);
  // const [hasRecorded, setHasRecorded] = useState(false);  // 녹음 여부 상태
  const dispatch = useDispatch()
  const voiceRecordingFile = useSelector(selectVoiceRecordingFile);


  useEffect(() => {
    if (voiceRecordingFile) { // 리덕스 상태에 저장된 voiceRecordingFile이 있으면 설정
      setAudioSrc(voiceRecordingFile.url);
    }

    if (!navigator.mediaDevices) {
      console.error("Browser does not support media devices.");
      return;
    }

    async function prepareRecorder() {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newRecorder = new MediaRecorder(stream);
      newRecorder.ondataavailable = async e => {
        const blob = new Blob([e.data], { type: 'audio/mp3' });
        setAudioSrc(URL.createObjectURL(blob));

        //blob 객체 file 객체로 변환
        const audioFile = new File([blob],'recording.mp3', { type: 'audio/mp3' })
      
        try {
          const response = await fetchAudioUrl(audioFile)
          const uploadedAudioUrl = response.data
          // console.log('d',response)
          console.log('url로 잘 변환했냐?',uploadedAudioUrl)

          dispatch(setVoiceRecordingFile(uploadedAudioUrl))
        } catch (error) {
          console.log('실패했따흑..',error)
        }
      };
      setRecorder(newRecorder);

    }

    prepareRecorder();

    return () => recorder && recorder.stream.getTracks().forEach(track => track.stop());
  }, [voiceRecordingFile]);

  const startRecording = () => {
    if (recorder && recorder.state === "inactive") {
      recorder.start();
      onRecord(true);
      // setHasRecorded(true);
    }
  };

  const stopRecording = () => {
    if (recorder && recorder.state === "recording") {
      recorder.stop();
      onRecord(false);
    }
  };

  const handlePlayClick = () => {
    setShowPlayer(true);
    console.log('클릭');
  };

  return (
    <div className="record-controls">
      <button onClick={isRecording ? stopRecording : startRecording} className="record-button">
        <img src={isRecording ? Recording : Record} alt={isRecording ? "녹음 중지" : "녹음 시작"} />
      </button>
      {/* <button onClick={handlePlayClick} className={`play-button ${!hasRecorded || isRecording ? 'disabled' : ''}`} disabled={!hasRecorded || isRecording}> */}
      <button onClick={handlePlayClick} className={`play-button ${!audioSrc|| isRecording ? 'disabled' : ''}`} disabled={!audioSrc || isRecording}>
        <img src={Listen} alt="녹음 듣기" />
      </button>
      <button onClick={onShowResults} className={`results-button ${!audioSrc || isRecording ? 'disabled' : ''}`} disabled={!audioSrc || isRecording}>
        <img src={Result} alt="결과보기" />
      </button>
      <AudioPlayModal audioSrc={audioSrc} isOpen={showPlayer} onClose={() => setShowPlayer(false)} />
    </div>
  );
}

export default RecordBtn;


