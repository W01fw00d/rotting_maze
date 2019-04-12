class CanvasPainter {
  constructor(
    selector,
    width,
    height,
    pathWidth,
    wallWidth,
    outerWallWidth,
    startX,
    startY
  ) {
    this.selector = selector;
    this.width = width;
    this.height = height;
    this.startX = startX;
    this.startY = startY;
    this.setStrokeWidths(pathWidth, wallWidth, outerWallWidth);

    this.setPalette();
  }

  setPalette() {
    this.pink = {
      darker: '#a02040',
      dark: '#b34c66',
      medium: '#d9a5b2',
      light: '#ecd2d8',
      lighter: '#f5e8eb'
    }
  }

  setStrokeWidths(pathWidth, wallWidth, outerWallWidth) {
    this.pathWidth = pathWidth;
    this.wallWidth = wallWidth;
    this.outerWallWidth = outerWallWidth;

    this.offset = pathWidth / 2 + outerWallWidth;
  }

  generateBaseMaze() {
    this.canvas = this.makeCanvas(this.selector);
    this.context = this.configContext(this.canvas);
  }

  makeCanvas(canvas_name) {
    const canvas = document.querySelector(canvas_name);

    canvas.width = this.getCanvasDimensionByStrokeWidths(this.width);
    canvas.height = this.getCanvasDimensionByStrokeWidths(this.height);

    return canvas;
  }

  getCanvasDimensionByStrokeWidths(dimension) {
    return this.outerWallWidth * 2 + dimension
      * (this.pathWidth + this.wallWidth) - this.wallWidth;
  }

  configContext(canvas) {
    const context = canvas.getContext('2d');

    return context;
  }

  paintAllCanvasWithWalls() {
    const wallColor = this.pink.darker;
    const pathColor = this.pink.lighter;
    const limits = [0, 0, this.canvas.width, this.canvas.height];

    this.paintSquare(wallColor, pathColor, limits);
  }

  paintSquare(wallColor, pathColor, limits) {
    this.context.fillStyle = wallColor;
    this.context.fillRect(limits[0], limits[1], limits[2], limits[3]);
    this.context.strokeStyle = pathColor;
    this.context.lineCap = 'square';
    this.context.lineWidth = this.pathWidth;
    this.context.beginPath();
  }

  moveTo(position) {
    this.context.moveTo(
      this.getPositionByStrokeWidths(position[0]),
      this.getPositionByStrokeWidths(position[1])
    );
  }

  lineTo(direction, x, y) {
    this.context.lineTo(
      this.getPositionByStrokeWidths(direction[0] + x),
      this.getPositionByStrokeWidths(direction[1] + y)
    );
  }

  getPositionByStrokeWidths(position) {
    return position * (this.pathWidth + this.wallWidth) + this.offset;
  }

  apply() {
    this.context.stroke();
  }

}
