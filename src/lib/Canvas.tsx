export default class Canvas {
  canvas: any;
  context: CanvasRenderingContext2D;

  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    console.log(this.context);
  }
  drawRect(x: number, y: number, width: number, height: number, color: string) {
    this.context.fillStyle = color;
    this.context.fillRect(x, y, width, height);
  }
}
