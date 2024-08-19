import { Cell } from '../models/Cell';
import { FigureNames } from '../models/figures/Figure';
import { NotationList } from '../models/notationList';

export const getReadableNotation = (selectedCell: Cell, figureName: string) => {
  let move = '';
  const cell = `${NotationList[selectedCell.x]}${8 - selectedCell.y}`;
  if (figureName === FigureNames.KNIGHT) {
    move += 'N';
  } else if (figureName !== FigureNames.PAWN) {
    move += figureName[0];
  }
  move += cell;
  return move;
};
