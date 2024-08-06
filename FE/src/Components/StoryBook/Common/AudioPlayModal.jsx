import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './css/AudioPlayModal.css';

function AudioPlayModal({ audioSrc, isOpen, onClose }) {
  const modalRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  // const [duration, setDuration] = useState('00:00');

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
        slider.style.background = `linear-gradient(to right, yellow 0%, yellow ${newProgress}%, gray ${newProgress}%, gray 100%)`;
      }
    };

    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

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
  }, [isOpen, audioSrc, onClose]);

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
  
  const handleSliderChange = (e) => {
    const newTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className="audio-play-modal-overlay">
      <div className="audio-play-modal-content">
        <button className="audio-play-close-btn" onClick={onClose}>&times;</button>
        <audio ref={audioRef} src={audioSrc} />
        <div className="audio-play-controls">
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
            className="audio-play-slider"
            style={{ backgroundImage: `linear-gradient(to right, yellow 0%, yellow ${progress}%, gray ${progress}%, gray 100%)` }}
          />
        </div>
      </div>
    </div>
  );
}

AudioPlayModal.propTypes = {
  audioSrc: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AudioPlayModal;
