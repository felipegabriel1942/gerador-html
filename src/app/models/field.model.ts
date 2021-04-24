export class Field {
  x: number;
  y: number;
  px: number;
  py: number;
  width: number;
  height: number;

  constructor({
    x = 300,
    y = 100,
    px = 0,
    py = 0,
    width = 300,
    height = 50,
  } = {}) {
    this.x = x;
    this.y = y;
    this.px = px;
    this.py = py;
    this.width = width;
    this.height = height;
  }
}
