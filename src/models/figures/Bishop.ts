import { Figure, FigureNames } from './Figure';
import { Colors } from '../Colors';
import { Cell } from '../Cell';
import blackLogo from '../../assets/black-bishop.png';
import whiteLogo from '../../assets/white-bishop.png';
import { Player } from '../Player';

export class Bishop extends Figure {
  constructor(
    color: Colors,
    cell: Cell,
    setWinner: (player: Player | null) => void,
    whitePlayer: Player,
    blackPlayer: Player
  ) {
    super(color, cell, setWinner, whitePlayer, blackPlayer);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.BISHOP;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    if (this.cell.isEmptyDiagonal(target)) {
      return true;
    }
    return false;
  }
}
