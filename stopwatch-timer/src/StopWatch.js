import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [lapTimes, setLapTimes] = useState([]);

  const handleStart = () => {
    setRunning(true);
    const id = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    setIntervalId(id);
  };

  const handleStop = () => {
    setRunning(false);
    clearInterval(intervalId);
  };

  const handleReset = () => {
    setTime(0);
    setRunning(false);
    clearInterval(intervalId);
    setLapTimes([]);
  };

  const handleLap = () => {
    if (running) {
      const lapTime = formatTime(time);
      setLapTimes((prevLapTimes) => [...prevLapTimes, lapTime]);
    }
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const pad = (value) => {
    return String(value).padStart(2, '0');
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <div>
      <p>Time: {formatTime(time)}</p>
      <button onClick={handleStart} disabled={running}>
        Start
      </button>
      <button onClick={handleStop} disabled={!running}>
        Stop
      </button>
      <button onClick={handleReset}>
        Reset
      </button>
      <button onClick={handleLap} disabled={!running}>
        Lap
      </button>
      <ul>
        {lapTimes.map((lapTime, index) => (
          <li key={index}>Lap {index + 1}: {lapTime}</li>
        ))}
      </ul>
    </div>
  );
};

export default Stopwatch;