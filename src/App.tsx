import React, { useEffect, useState } from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import HeaderComponent from './components/HeaderComponent';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Player';
import ModalWin from './components/ModalWin';
import { clearBlackMoves } from './store/blackMovesSlice';
import { useDispatch } from 'react-redux';
import { clearWhiteMoves } from './store/whiteMovesSlice';

const App = () => {
  const [whitePlayer, setWhitePlayer] = useState<Player | null>(null);
  const [blackPlayer, setBlackPlayer] = useState<Player | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [halfMoves, setHalfMoves] = useState(1);
  const [winner, setWinner] = useState<Player | null>(null);
  const [board, setBoard] = useState<Board | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const initialWhitePlayer = new Player(Colors.WHITE);
    const initialBlackPlayer = new Player(Colors.BLACK);

    const initialBoard = new Board(
      setWinner,
      initialWhitePlayer,
      initialBlackPlayer
    );
    initialBoard.initCells();
    initialBoard.addFigures();

    setWhitePlayer(initialWhitePlayer);
    setBlackPlayer(initialBlackPlayer);
    setBoard(initialBoard);
    setCurrentPlayer(initialWhitePlayer);
  }, []);

  function restart() {
    if (whitePlayer && blackPlayer) {
      const newBoard = new Board(setWinner, whitePlayer, blackPlayer);
      newBoard.initCells();
      newBoard.addFigures();
      dispatch(clearBlackMoves());
      dispatch(clearWhiteMoves());
      setBoard(newBoard);
      setCurrentPlayer(whitePlayer);
      setHalfMoves(1);
      setWinner(null);
    }
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
    <div className='appContainer'>
      <HeaderComponent restart={restart} />
      {winner ? (
        <ModalWin currentPlayer={winner} restart={restart} />
      ) : (
        <div className='app'>
          <Timer
            restart={restart}
            currentPlayer={currentPlayer}
            setWinner={setWinner}
            whitePlayer={whitePlayer}
            blackPlayer={blackPlayer}
          />
          {board && currentPlayer && (
            <>
              <BoardComponent
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                swapPlayer={swapPlayer}
              />
              <div>
                <LostFigures
                  title='Черные фигуры'
                  figures={board.lostBlackFigures}
                />
                <LostFigures
                  title='Белые фигуры'
                  figures={board.lostWhiteFigures}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
