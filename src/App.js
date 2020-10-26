import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const time = 5;

export default function App() {
  const [timeLeft, setTimeLeft] = useState(time);
  const [title, setTitle] = useState('Табата таймер');
  const [isRunning, setIsRunning] = useState(false);
  const [stage, setStage] = useState('ready')
  const [round, setRound] = useState(1);
  const intervalRef = useRef(null);
  const titles = {
    'ready': 'Готовься...',
    'work': 'Работаем!',
    'rest': 'Отдышись...'
  }
  useEffect(()=>{
    if(stage == 'ready')return;
    if(stage == 'work'){
      clearInterval(intervalRef.current);
      setTimeLeft(20);
      startTimer()
      
    } else {      
      setRound(round=>round+1);
      clearInterval(intervalRef.current);
      setTimeLeft(10);
      startTimer()
      
    };

  }, [stage])


  function startTimer (){
    // if(intervalRef.current !== null)return;
    setTitle(titles[stage])  
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft)=> {        
        if (timeLeft > 0) {
          return timeLeft - 1
        } else {
          if(round < 8){
          stage != 'work' ? setStage('work') : setStage('rest')
          } else {            
            resetTimer();
          }

        return 0;
        };        
      });
    }, 1000)    
  };
  function stopTimer (){ 
    if(intervalRef.current === null) return;
    clearInterval(intervalRef.current);
    // intervalRef.current = null;
    setTitle('Не расслабляйся!')
    setIsRunning(false);   
  };
  function resetTimer (){
    clearInterval(intervalRef.current);
    setTimeLeft(time);
    setTitle('Готов к ещё одному раунду?');
    intervalRef.current = null;
    setIsRunning(false);
    setStage('ready');
    setRound(1)
  }

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft - minutes * 60).toString().padStart(2, '0');

  return (
    <div className={`app ${stage == 'work' ? 'app_work': ''}${stage == 'rest' ? 'app_rest': ''}`}>
      <h2>{title}</h2>

      <div className="timer">
        {/* <span>{minutes}</span>
        <span>:</span> */}
        <span>{seconds}</span>
      </div>

      <div className="buttons">
      {stage != 'ready' && <p className='round'>{`${round} / 8`}</p>}
        {!isRunning && <button onClick={startTimer}>Старт</button>}
        {isRunning && <button onClick={stopTimer}>Пауза</button>}
        {intervalRef.current && <button onClick={resetTimer} >Стоп</button>}
      </div>
      <Tippy content="Табата - метод высокоинтенсивной интервальной тренировки, придуманный японским доктором Изуми Табата.
Суть в том, чтобы 20 секунд выполнять упражнение изо всех сил, а затем отдыхать 10 секунд. В четыре минуты укладываются восемь таких раундов.">
      <i class="info fas fa-info-circle"></i>
      </Tippy>
    </div>

  );
}
