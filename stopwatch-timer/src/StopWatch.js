import React, { useState, useEffect } from 'react';

function StopWatch() {
  const [time, setTime] = useState(5104);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => {
          if (time > 0) {
            return time - 1;
          } else {
            setIsActive(false);
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, '0'); // seconds to hour
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  const handleStart = () => {
    setTime(5400);
    setIsActive(true);
  };
  const handlePauseResume = () => {
    setIsActive((prev) => !prev);
  };
  const handleStop = () => {
    setIsActive(false);
    setTime(0);
  };

  return (
    <div>
      <h1>Stopwatch</h1>

      <p>{formatTime(time)} </p>

      <button onClick={handleStart}>Start</button>
      <button onClick={handlePauseResume}>
        {isActive ? 'Pause' : 'Resume'}
      </button>

      <button onClick={handleStop}>Stop</button>
    </div>
  );
}

export default StopWatch;
