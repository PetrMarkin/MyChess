import React, { FC, useEffect, useRef, useState } from 'react';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';
import MovesComponent from './MovesComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
  setWinner: (player: Player | null) => void;
  whitePlayer: Player | null;
  blackPlayer: Player | null;
}

const Timer: FC<TimerProps> = ({
  currentPlayer,
  restart,
  setWinner,
  whitePlayer,
  blackPlayer,
}) => {
  const timeFormat = useSelector(
    (state: RootState) => state.timeFormat.timeFormat
  );
  const [whiteTime, setWhiteTime] = useState<number>(timeFormat);
  const [blackTime, setBlackTime] = useState<number>(timeFormat);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startTimer();
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [currentPlayer]);

  useEffect(() => {
    setWhiteTime(timeFormat);
    setBlackTime(timeFormat);
  }, [timeFormat]);

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }

    const callback =
      currentPlayer?.color === Colors.WHITE
        ? decrementWhiteTimer
        : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  }

  function decrementBlackTimer() {
    setBlackTime((prev) => {
      if (prev <= 1) {
        setWinner(whitePlayer);
        handleRestart();
        return 0;
      }
      return prev - 1;
    });
  }

  function decrementWhiteTimer() {
    setWhiteTime((prev) => {
      if (prev <= 1) {
        setWinner(blackPlayer);
        handleRestart();
        return 0;
      }
      return prev - 1;
    });
  }

  const handleRestart = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    restart();
    setWhiteTime(timeFormat);
    setBlackTime(timeFormat);
  };

  return (
    <div className='timer'>
      <div>
        <button className='btn-restart' onClick={handleRestart}>
          Restart
        </button>
      </div>
      <h2>Черные - {blackTime}</h2>
      <h2>Белые - {whiteTime}</h2>
      <MovesComponent />
    </div>
  );
};

export default Timer;
