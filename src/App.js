import React, { useRef, useState } from 'react';
import './App.css';
const time = 20;

export default function App() {
  const [timeLeft, setTimeLeft] = useState(time);
  const [title, setTitle] = useState('Готов?');
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  function startTimer (){
    if(intervalRef.current !== null)return;
    
    setTitle('Поехали!');
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft)=> {
        if (timeLeft >= 1) return timeLeft - 1;
        resetTimer();
        return 0;
      });
    }, 1000)    
  };
  function stopTimer (){ 
    if(intervalRef.current === null) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle('Не расслабляйся!')
    setIsRunning(false);   
  };
  function resetTimer (){
    clearInterval(intervalRef.current);
    setTimeLeft(time);
    setTitle('Готов к ещё одному раунду?');
    intervalRef.current = null;
    setIsRunning(false);
  }

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft - minutes * 60).toString().padStart(2, '0');

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Старт</button>}
        {isRunning && <button onClick={stopTimer}>Пауза</button>}
        {intervalRef.current && <button onClick={resetTimer} >Стоп</button>}
      </div>
    </div>
  );
}
