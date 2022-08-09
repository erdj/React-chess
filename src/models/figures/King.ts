import { Colors } from '../Colors';
import { Figure, FigureNames } from './Figure';
import { Cell } from '../Cell';
const blackLogo = require('../../assets/black-king.png');
const whiteLogo = require('../../assets/white-king.png');

export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KING;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }

    const dx = Math.abs(target.x - this.cell.x);
    const dy = Math.abs(target.y - this.cell.y);
    if (dx > 1 || dy > 1) {
      return false;
    }
    return true;
  }
}
