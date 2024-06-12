import React, { useEffect, useState } from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import HeaderComponent from './components/HeaderComponent';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Player';

const App = () => {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [halfMoves, setHalfMoves] = useState(1);

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
    setHalfMoves(1);
  }

  function swapPlayer() {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
    setHalfMoves((prev) => prev + 1);
    movesState();
  }

  function movesState() {
    if (halfMoves >= 100) {
      restart();
    }
  }

  return (
    <>
      <HeaderComponent />
      <div className='app'>
        <Timer restart={restart} currentPlayer={currentPlayer} />
        <BoardComponent
          board={board}
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          swapPlayer={swapPlayer}
        />
        <div>
          <LostFigures title='Черные фигуры' figures={board.lostBlackFigures} />
          <LostFigures title='Белые фигуры' figures={board.lostWhiteFigures} />
        </div>
      </div>
    </>
  );
};

export default App;
