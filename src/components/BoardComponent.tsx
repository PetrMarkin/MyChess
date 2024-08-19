import React, { FC, useEffect, useState } from 'react';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import CellComponent from './CellComponent';
import { Player } from '../models/Player';
import VerticalNotation from './VerticalNotaton';
import HorizontalNotation from './HorizontalNotation';
import { getReadableNotation } from '../utils/getReadableNotation';
import { useDispatch } from 'react-redux';
import { setWhiteMoves } from '../store/whiteMovesSlice';
import { setBlackMoves } from '../store/blackMovesSlice';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  currentPlayer,
  swapPlayer,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const dispatch = useDispatch();

  function click(cell: Cell) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      if (currentPlayer?.color) {
        const move = getReadableNotation(cell, selectedCell.figure.name);
        if (currentPlayer.color === 'white') {
          dispatch(setWhiteMoves(move));
        } else {
          dispatch(setBlackMoves(move));
        }
      }
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  }

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <div className='allboard'>
      <VerticalNotation notationCells={[]} />
      <div>
        <HorizontalNotation notationCells={[]} letters={[]} />
        <div className='board'>
          {board.cells.map((row, index) => (
            <React.Fragment key={index}>
              {row.map((cell) => (
                <CellComponent
                  click={click}
                  cell={cell}
                  key={cell.id}
                  selected={
                    cell.x === selectedCell?.x && cell.y === selectedCell?.y
                  }
                />
              ))}
            </React.Fragment>
          ))}
        </div>
        <HorizontalNotation notationCells={[]} letters={[]} />
      </div>
      <VerticalNotation notationCells={[]} />
    </div>
  );
};

export default BoardComponent;
