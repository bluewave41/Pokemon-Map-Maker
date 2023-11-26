interface Options {
  color?: string;
}

export default class Canvas {
  canvas: any;
  zoomFactor: number;
  context: CanvasRenderingContext2D;

  constructor(canvas) {
    this.canvas = canvas;
    this.zoomFactor = 2;
    this.context = canvas.getContext("2d");
  }
  drawRect(
    x: number,
    y: number,
    width: number,
    height: number,
    options: Options = {}
  ) {
    this.handleOptions(options);
    this.context.fillRect(x, y, width, height);
  }
  drawImage(x: number, y: number, image: HTMLImageElement) {
    this.context.drawImage(image, y * 16, x * 16);
  }
  drawTransparentRect(
    x: number,
    y: number,
    width: number,
    height: number,
    options: Options = {}
  ) {
    this.handleOptions(options);
    this.context.globalAlpha = 0.5;
    this.context.fillRect(x * 16, y * 16, width, height);
    this.context.globalAlpha = 1;
  }
  handleOptions(options: Options) {
    if (options.color) {
      this.context.fillStyle = options.color;
    }
  }
  getZoomFactor() {
    return this.zoomFactor;
  }
}
