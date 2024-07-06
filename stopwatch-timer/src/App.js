import React, { useState, useEffect } from 'react';
import './App.css'
function padTime(time) {
  return time.toString().padStart(2, '0');
}

function App() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [interval, setInterval] = useState(null);

  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, [interval]);

  const startTimer = () => {
    setInterval(setInterval(setTimeout(() => {
      setMilliseconds(milliseconds + 1);
      if (milliseconds === 100) {
        setMilliseconds(0);
        setSeconds(seconds + 1);
        if (seconds === 60) {
          setSeconds(0);
          setMinutes(minutes + 1);
        }
      }
    }, 10)));
  };

  const stopTimer = () => {
    clearInterval(interval);
  };

  const pauseTimer = () => {
    clearInterval(interval);
  };

  const resetTimer = () => {
    clearInterval(interval);
    setMinutes(0);
    setSeconds(0);
    setMilliseconds(0);
  };

  return (
    <div>
      <p>
        {padTime(minutes)}:{padTime(seconds)}:{padTime(milliseconds)}
      </p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={pauseTimer}>Pause</button>
      <button onClick={resetTimer}>Reset</button>
      <ul id="laplist"></ul>
    </div>
  );
}

export default App;