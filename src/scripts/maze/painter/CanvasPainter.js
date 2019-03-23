class CanvasPainter {
  constructor(
    width,
    height,
    pathWidth,
    wallWidth,
    outerWallWidth,
    startX,
    startY,
    offset
  ) {
    this.width = width;
    this.height = height;
    this.startX = startX;
    this.startY = startY;
    this.offset = offset;
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
  }

  generateBaseMaze() {
    this.ctx = this.configCtx(
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

  configCtx(canvas) {
    const wallColor = this.pink.darker;
    const pathColor = this.pink.lighter;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = wallColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = pathColor;
    ctx.lineCap = 'square';
    ctx.lineWidth = this.pathWidth;
    ctx.beginPath();

    ctx.moveTo(
      this.getPositionByStrokeWidths(this.startX),
      this.getPositionByStrokeWidths(this.startY)
    );

    return ctx;
  }

  getPositionByStrokeWidths(position) {
    return position * (this.pathWidth + this.wallWidth) + this.offset;
  }

}
