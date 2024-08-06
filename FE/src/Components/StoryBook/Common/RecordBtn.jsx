import React, { useState, useEffect } from 'react';
import AudioPlayModal from './AudioPlayModal';
import './css/RecordBtn.css';  // CSS 스타일

function RecordBtn({ onRecord, isRecording, onShowResults }) {
  const [audioSrc, setAudioSrc] = useState('');
  const [showPlayer, setShowPlayer] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [hasRecorded, setHasRecorded] = useState(false);  // 녹음 여부 상태

  useEffect(() => {
    if (!navigator.mediaDevices) {
      console.error("Browser does not support media devices.");
      return;
    }

    async function prepareRecorder() {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newRecorder = new MediaRecorder(stream);
      newRecorder.ondataavailable = e => {
        const blob = new Blob([e.data], { type: 'audio/mp3' });
        setAudioSrc(URL.createObjectURL(blob));
      };
      setRecorder(newRecorder);
    }

    prepareRecorder();

    return () => recorder && recorder.stream.getTracks().forEach(track => track.stop());
  }, []);

  const startRecording = () => {
    if (recorder && recorder.state === "inactive") {
      recorder.start();
      onRecord(true);
      setHasRecorded(true);
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
        <img src={isRecording ? "/img/sns/like.png" : "/img/sns/fun.png"} alt={isRecording ? "녹음 중지" : "녹음 시작"} />
      </button>
      <button onClick={handlePlayClick} className={`play-button ${!hasRecorded || isRecording ? 'disabled' : ''}`} disabled={!hasRecorded || isRecording}>
        <img src="/img/sns/cool.png" alt="녹음 듣기" />
      </button>
      <button onClick={onShowResults} className={`results-button ${!hasRecorded || isRecording ? 'disabled' : ''}`} disabled={!hasRecorded || isRecording}>
        <img src="/img/sns/good.png" alt="결과보기" />
      </button>
      <AudioPlayModal audioSrc={audioSrc} isOpen={showPlayer} onClose={() => setShowPlayer(false)} />
    </div>
  );
}

export default RecordBtn;
