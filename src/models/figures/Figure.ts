import { Colors } from '../Colors';
import logo from '../../assets/black-king.png';
import { Cell } from '../Cell';
import { Player } from '../Player';

export let movesStr: string;

export enum FigureNames {
  FIGURE = 'Figure',
  KING = 'King',
  QUEEN = 'Queen',
  BISHOP = 'Bishop',
  PAWN = 'Pawn',
  KNIGHT = 'Knight',
  ROOK = 'Rook',
}

export class Figure {
  color: Colors;
  logo: typeof logo | null;
  cell: Cell;
  name: FigureNames;
  id: number;
  setWinner!: (player: Player | null) => void;
  whitePlayer: Player;
  blackPlayer: Player;

  constructor(
    color: Colors,
    cell: Cell,
    setWinner: (player: Player | null) => void,
    whitePlayer: Player,
    blackPlayer: Player
  ) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.name = FigureNames.FIGURE;
    this.logo = null;
    this.id = Math.random();
    this.setWinner = setWinner;
    this.whitePlayer = whitePlayer;
    this.blackPlayer = blackPlayer;
  }

  canMove(target: Cell): boolean {
    if (target.figure?.color === this.color) {
      return false;
    }
    if (target.figure?.name === FigureNames.KING) {
      if (target.available) {
        this.setWinner(
          this.color === Colors.WHITE ? this.whitePlayer : this.blackPlayer
        );
        return false;
      }
    }
    return true;
  }

  moveFigure(target: Cell) {
    console.log(movesStr);
    this.cell.figure = null;
    this.cell = target;
    target.figure = this;
  }

  isKingUnderAttack(target: Cell): boolean {
    return target.figure?.name === FigureNames.KING;
  }
}
