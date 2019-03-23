class CanvasPainter {
  constructor(
    width,
    height,
    pathWidth,
    wallWidth,
    outerWallWidth,
    startX,
    startY
  ) {
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
    this.ctx = this.configContext(
      this.makeCanvas()
    );

    return this.ctx;
  }

  makeCanvas() {
    const canvas = document.querySelector('canvas');

    canvas.width = this.getCanvasDimensionByStrokeWidths(this.width);
    canvas.height = this.getCanvasDimensionByStrokeWidths(this.height);

    return canvas;
  }

  getCanvasDimensionByStrokeWidths(dimension) {
    return this.outerWallWidth * 2 + dimension
      * (this.pathWidth + this.wallWidth) - this.wallWidth;
  }

  configContext(canvas) {
    const wallColor = this.pink.darker;
    const pathColor = this.pink.lighter;

    const context = canvas.getContext('2d');
    context.fillStyle = wallColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = pathColor;
    context.lineCap = 'square';
    context.lineWidth = this.pathWidth;
    context.beginPath();

    context.moveTo(
      this.getPositionByStrokeWidths(this.startX),
      this.getPositionByStrokeWidths(this.startY)
    );

    return context;
  }

  moveTo(position) {
    this.ctx.moveTo(
      this.getPositionByStrokeWidths(position[0]),
      this.getPositionByStrokeWidths(position[1])
    );
  }

  lineTo(direction, x, y) {
    this.ctx.lineTo(
      this.getPositionByStrokeWidths(direction[0] + x),
      this.getPositionByStrokeWidths(direction[1] + y)
    );
  }

  getPositionByStrokeWidths(position) {
    return position * (this.pathWidth + this.wallWidth) + this.offset;
  }

  apply() {
    this.ctx.stroke();
  }

}
