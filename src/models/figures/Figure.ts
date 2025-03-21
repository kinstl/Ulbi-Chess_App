import { Colors } from "../Colors";
import logo from "../../assets/black-king.png";
import { Cell } from "../Cell";

export enum FigureNames {
  FIGURE = "Фигура",
  KING = "Король",
  QUEEN = "Ферзь",
  KNIGHT = "Конь",
  ROOK = "Ладья",
  BISHOP = "Слон",
  PAWN = "Пешка",
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
    this.id = Math.random();
    this.cell.figure = this;
    this.logo = null;
    this.name = FigureNames.FIGURE;
  }

  canMove(target: Cell): boolean {
    if (target.figure?.color === this.color) {
      return false;
    }
    if (target.figure?.name === FigureNames.KING) {
      return false;
    }

    return true;
  }

  moveFigure(target: Cell) {}
}
