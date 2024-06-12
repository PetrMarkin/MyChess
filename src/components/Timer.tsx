import React, { FC, useEffect, useRef, useState } from 'react';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';
import { movesStr } from '../models/figures/Figure';

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
  const [whiteTime, setWhiteTime] = useState(300);
  const [blackTime, setBlackTime] = useState(300);
  const [blackMoves, setBlackMoves] = useState(movesStr);
  const [whiteMoves, setWhiteMoves] = useState(movesStr);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startTimer();
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [currentPlayer]);

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }

    const callback =
      currentPlayer?.color === Colors.WHITE
        ? decrementWhiteTimer
        : decrementBlackTimer;
    timer.current = setInterval(() => {
      callback();
    }, 1000);
  }

  function decrementBlackTimer() {
    setBlackTime((prev) => (prev === 0 ? prev : prev - 1));
    setWhiteMoves(movesStr);
    if (blackTime === 0) {
      console.log('Белые победили!');
      handleRestart();
    }
  }

  function decrementWhiteTimer() {
    setWhiteTime((prev) => (prev === 0 ? prev : prev - 1));
    setBlackMoves(movesStr);
    if (whiteTime === 0) {
      console.log('Чёрные победили!');
      handleRestart();
    }
  }

  const handleRestart = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    restart();
    setWhiteTime(300);
    setBlackTime(300);
  };

  return (
    <div className='timer'>
      <div className='modal'>
        <p>Победили {<pre>{currentPlayer?.color}</pre>}</p>
        <div>
          <button className={'btn-restart'} onClick={handleRestart}>
            Restart
          </button>
        </div>
      </div>
      <div>
        <button className={'btn-restart'} onClick={handleRestart}>
          Restart
        </button>
      </div>
      <h2>Черные - {blackTime}</h2>
      <h2>Белые - {whiteTime}</h2>

      <div className='moves'>
        <div className='moves-white'>Ходы белых{<pre>{whiteMoves}</pre>}</div>
        <div className='moves-black'>Ходы черных{<pre>{blackMoves}</pre>}</div>
      </div>
    </div>
  );
};

export default Timer;
