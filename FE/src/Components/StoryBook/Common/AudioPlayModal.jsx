import React, { useEffect, useRef, useState } from 'react';
import './css/AudioPlayModal.css'; // 필요한 CSS 파일

function AudioPlayModal({ audioSrc, isOpen, onClose }) {
  const modalRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');


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

      const slider = document.querySelector('.slider');
      if (slider) {
        slider.style.background = `linear-gradient(to right, red 0%, red ${newProgress}%, gray ${newProgress}%, gray 100%)`;
      }
    };

    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Setup
    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime('00:00');
        audio.currentTime = 0;
      });
    }

    return () => {
      if (isOpen) {
        document.removeEventListener('click', handleOutsideClick);
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('ended', () => {
          setIsPlaying(false);
          setCurrentTime('00:00');
          audio.currentTime = 0;
        });
      }
    };
  }, [isOpen, audioSrc]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
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

  if (!isOpen) return null; // isOpen이 false일 경우 아무것도 렌더링하지 않음

  return (
    <div className="audio-modal-overlay">
      <div className="audio-modal-content">
        <button className="audio-close-btn" onClick={onClose}>&times;</button>
        <audio ref={audioRef} src={audioSrc} />
        <div className="audio-controls">
          <button onClick={togglePlay} className="audio-play-btn">
            {isPlaying ? '||' : '▶'}
          </button>
          <span>{currentTime}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSliderChange}
            className="audio-slider"
            style={{ backgroundImage: `linear-gradient(to right, yellow 0%, yellow ${progress}%, gray ${progress}%, gray 100%)` }}
          />
        </div>
      </div>
    </div>
  );
}

export default AudioPlayModal;
