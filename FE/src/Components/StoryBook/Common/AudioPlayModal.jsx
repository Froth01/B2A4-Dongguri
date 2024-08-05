import React, { useEffect, useRef, useState } from 'react';
import './css/AudioPlayModal.css';

function AudioPlayModal({ audioSrc, isOpen, onClose }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const updateProgress = () => {
      const newProgress = (audio.currentTime / audio.duration) * 100;
      setProgress(newProgress);
      setCurrentTime(formatTime(audio.currentTime));
    };

    const handleLoadedMetadata = () => {
      setDuration(formatTime(audio.duration));
      updateProgress();
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime('00:00');
      audio.currentTime = 0;
    });

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, [audioSrc]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return; // audio가 없으면 함수 종료

    if (audio.paused) {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error("Error playing audio:", error);
      });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleSliderChange = (event) => {
    const newTime = (event.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(event.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <audio ref={audioRef} src={audioSrc} />
        <div className="audio-controls">
          <button onClick={togglePlay} className="play-btn">
            {isPlaying ? '||' : '▶'}
          </button>
          <div className="time-display">{currentTime} / {duration}</div>
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSliderChange}
              className="slider"
              style={{ backgroundSize: `${progress}% 100%` }}
            />
            <div className="progress-indicator" style={{ left: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayModal;
