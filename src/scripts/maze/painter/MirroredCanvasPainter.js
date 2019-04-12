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

  paintRowWallSpace(limits) {
    const addaptedLimits = [
      this.getPositionByStrokeWidths(this.width - limits[2]),
      this.getPositionByStrokeWidths(limits[1]),
      this.getPositionByStrokeWidths(this.width - limits[0]),
      this.getPositionByStrokeWidths(1)
    ];

    this.paintSquare(this.pink.darker, addaptedLimits);
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
