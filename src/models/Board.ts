import { Cell } from './Cell';
import { Colors } from './Colors';
import { Bishop } from './figures/Bishop';
import { King } from './figures/King';
import { Knight } from './figures/Knight';
import { Pawn } from './figures/Pawn';
import { Queen } from './figures/Queen';
import { Rook } from './figures/Rook';
import { Figure } from './figures/Figure';
import { Player } from './Player';

export class Board {
  cells: Cell[][] = [];

  lostBlackFigures: Figure[] = [];
  lostWhiteFigures: Figure[] = [];
  setWinner: (player: Player | null) => void;
  whitePlayer: Player;
  blackPlayer: Player;

  constructor(
    setWinner: (player: Player | null) => void,
    whitePlayer: Player,
    blackPlayer: Player
  ) {
    this.setWinner = setWinner;
    this.whitePlayer = whitePlayer;
    this.blackPlayer = blackPlayer;
  }

  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null));
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null));
        }
      }
      this.cells.push(row);
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board(
      this.setWinner,
      this.whitePlayer,
      this.blackPlayer
    );
    newBoard.cells = this.cells;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    return newBoard;
  }

  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(
        Colors.BLACK,
        this.getCell(i, 1),
        this.setWinner,
        this.whitePlayer,
        this.blackPlayer
      );
      new Pawn(
        Colors.WHITE,
        this.getCell(i, 6),
        this.setWinner,
        this.whitePlayer,
        this.blackPlayer
      );
    }
  }

  private addKings() {
    new King(
      Colors.BLACK,
      this.getCell(4, 0),
      this.setWinner,
      this.whitePlayer,
      this.blackPlayer
    );
    new King(
      Colors.WHITE,
      this.getCell(4, 7),
      this.setWinner,
      this.whitePlayer,
      this.blackPlayer
    );
  }

  private addKnights() {
    new Knight(
      Colors.BLACK,
      this.getCell(1, 0),
      this.setWinner,
      this.whitePlayer,
      this.blackPlayer
    );
    new Knight(
      Colors.WHITE,
      this.getCell(1, 7),
      this.setWinner,
      this.whitePlayer,
      this.blackPlayer
    );
    new Knight(
      Colors.BLACK,
      this.getCell(6, 0),
      this.setWinner,
      this.whitePlayer,
      this.blackPlayer
    );
    new Knight(
      Colors.WHITE,
      this.getCell(6, 7),
      this.setWinner,
      this.whitePlayer,
      this.blackPlayer
    );
  }

  private addQueens() {
    new Queen(
      Colors.BLACK,
      this.getCell(3, 0),
      this.setWinner,
      this.whitePlayer,
      this.blackPlayer
    );
    new Queen(
      Colors.WHITE,
      this.getCell(3, 7),
      this.setWinner,
      this.whitePlayer,
      this.blackPlayer
    );
  }

  private addBishops() {
    new Bishop(
      Colors.BLACK,
      this.getCell(2, 0),
      this.setWinner,
      this.whitePlayer,
      this.blackPlayer
    );
    new Bishop(
      Colors.WHITE,
      this.getCell(2, 7),
      this.setWinner,
      this.whitePlayer,
      this.blackPlayer
    );
    new Bishop(
      Colors.BLACK,
      this.getCell(5, 0),
      this.setWinner,
      this.whitePlayer,
      this.blackPlayer
    );
    new Bishop(
      Colors.WHITE,
      this.getCell(5, 7),
      this.setWinner,
      this.whitePlayer,
      this.blackPlayer
    );
  }

  private addRooks() {
    new Rook(
      Colors.BLACK,
      this.getCell(0, 0),
      this.setWinner,
      this.whitePlayer,
      this.blackPlayer
    );
    new Rook(
      Colors.WHITE,
      this.getCell(0, 7),
      this.setWinner,
      this.whitePlayer,
      this.blackPlayer
    );
    new Rook(
      Colors.BLACK,
      this.getCell(7, 0),
      this.setWinner,
      this.whitePlayer,
      this.blackPlayer
    );
    new Rook(
      Colors.WHITE,
      this.getCell(7, 7),
      this.setWinner,
      this.whitePlayer,
      this.blackPlayer
    );
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  public addFigures() {
    new Figure(
      Colors.WHITE,
      this.getCell(0, 0),
      this.setWinner,
      this.whitePlayer,
      this.blackPlayer
    );
    this.addBishops();
    this.addKings();
    this.addKnights();
    this.addPawns();
    this.addQueens();
    this.addRooks();
  }
}
