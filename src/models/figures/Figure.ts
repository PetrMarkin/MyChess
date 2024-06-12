import { Colors } from '../Colors';
import logo from '../../assets/black-king.png';
import { Cell } from '../Cell';
import { NotationList } from './notationList';

export let movesStr: string;

export enum FigureNames {
  FIGURE = 'Фигура',
  KING = 'Король',
  QUEEN = 'Ферзь',
  BISHOP = 'Слон',
  PAWN = 'Пешка',
  KNIGHT = 'Конь',
  ROOK = 'Ладья',
}

export class Figure {
  color: Colors;
  logo: typeof logo | null;
  cell: Cell;
  name: FigureNames;
  id: number;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.name = FigureNames.FIGURE;
    this.logo = null;
    this.id = Math.random();
  }

  canMove(target: Cell): boolean {
    if (target.figure?.color === this.color) {
      return false;
    }
    if (target.figure?.name === FigureNames.KING) {
      if (target.available) {
        console.log('Шах и мат');
        return false;
      }
    }
    return true;
  }

  moveFigure(target: Cell) {
    movesStr = `${this.name} ${NotationList[target.x]}${8 - target.y}`;
    // Реально переместить фигуру
    this.cell.figure = null; // Очистить текущую ячейку
    this.cell = target; // Переместить фигуру в новую ячейку
    target.figure = this; // Обновить фигуру в новой ячейке
  }

  ifKingAttacked(target: Cell): boolean {
    if (target.figure?.name === FigureNames.KING) {
      console.log('Король под атакой');
      return true;
    }
    return false;
  }
}
