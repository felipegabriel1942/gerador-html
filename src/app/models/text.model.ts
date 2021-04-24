export class Text {
  x: number;
  y: number;
  px: number;
  py: number;
  width: number;
  height: number;
  text: string;

  constructor({
    x = 300,
    y = 100,
    px = 0,
    py = 0,
    width = 300,
    height = 50,
    text = ''
  } = {}) {
    this.x = x;
    this.y = y;
    this.px = px;
    this.py = py;
    this.width = width;
    this.height = height;
    this.text = text;
  }
}
