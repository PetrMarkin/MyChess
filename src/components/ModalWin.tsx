import { FC } from 'react';
import { Player } from '../models/Player';

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

const ModalWin: FC<TimerProps> = ({ currentPlayer, restart }) => {
  const handleRestart = () => {
    restart();
  };

  return (
    <div className='modalWin'>
      <p>{currentPlayer?.color} win!</p>
      <button className={'btn-restart'} onClick={handleRestart}>
        Restart
      </button>
    </div>
  );
};

export default ModalWin;
