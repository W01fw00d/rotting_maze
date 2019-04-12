class MirroredCanvasPainter extends CanvasPainter {
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
    super(
      selector,
      width,
      height,
      pathWidth,
      wallWidth,
      outerWallWidth,
      startX,
      startY
    );
  }

  moveTo(position) {
    this.context.moveTo(
      this.getPositionByStrokeWidths(this.width - 1 - position[0]),
      this.getPositionByStrokeWidths(position[1])
    );
  }

  lineTo(direction, x, y) {
    this.context.lineTo(
      this.getPositionByStrokeWidths(this.width - 1 - direction[0] - x),
      this.getPositionByStrokeWidths(direction[1] + y)
    );
  }

}
