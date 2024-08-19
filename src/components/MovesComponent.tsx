import { FC } from 'react';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

const MovesComponent: FC = () => {
  const whiteMoves = useSelector(
    (state: RootState) => state.whiteMoves.whiteMoves
  );
  const blackMoves = useSelector(
    (state: RootState) => state.blackMoves.blackMoves
  );

  return (
    <div className='moves'>
      <div className='whiteMoves'>
        <p>Ходы белых</p>
        <div className='movesContainer'>
          {whiteMoves.map((item: string) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </div>

      <div className='blackMoves'>
        <p>Ходы черных</p>
        <div className='movesContainer'>
          {blackMoves.map((item: string) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovesComponent;
