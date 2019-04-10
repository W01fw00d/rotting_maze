class BrainShapeTemplate {
  constructor() {
    this.height = 30;
    this.maxWidth = 15;

    this.leftShape = [
      '____XXXXXXXXXX_',
      'XXXXXXXXXXXXXXX',
      'XXXXXXXXXXXXXXX',
      'XXXXXXXXXXXXXXX',
      'XXXXXXXXXXXXXXX',

      'XXXXXXXXXXXXXXX',
      'XXXXXXXXXXXXXXX',
      'XXXXXXXXXXXXXXX',
      'XXXXXXXXXXXXXXX',
      'XXXXXXXXXXXXXXX',

      'XXXXXXXXXXXXXXX',
      'XXXXXXXXXXXXXXX',
      'XXXXXXXXXXXXXXX',
      'XXXXXXXXXXXXXXX',
      'XXXXXXXXXXXXXXX',

      'XXXXXXXXXXXXXXX',
      'XXXXXXXXXXXXXXX',
      'XXXXXXXXXXXXXXX',
      'XXXXXXXXXXXXXXX',
      'XXXXXXXXXXXXXXX',

      'XXXXXXXXXXXXXXX',
      'XXXXXXXXXXXXXXX',
      'XXXXXXXXXXXXXXX',
      'XXXXXXXXXXXXXXX',
      'XXXXXXXXXXXXXXX',

      'XXXXXXXXXXXXXXX',
      'XXXXXXXXXXXXXXX',
      'XXXXXXXXXXXXXXX',
      'XXXXXXXXXXXXXXX',
      'XXXXXXXXXXXXXXX',
    ];

    this.leftShapeRanges = this.calculateShapeRanges(this.leftShape);

    this.rightShape = this.generateRightShape(this.leftShape);
    this.rightShapeRanges = this.calculateShapeRanges(this.rightShape);
  }

  generateRightShape(shape) {
    let rightShape = [];

    shape.forEach((row) => {
      rightShape.push(this.reverse(row));
    });

    return rightShape;
  }

  calculateShapeRanges(shape) {
    let shapeRanges = [];

    let fromLimit;
    let toLimit;
    let range;

    shape.forEach((row) => {
      fromLimit = row.indexOf('X');

      toLimit = row
        .substring(fromLimit, row.length - 1)
        .indexOf('_');

      shapeRanges.push([
        fromLimit,
        toLimit < 0
          ? row.length - 1
          : toLimit
        ]);
    });

    return shapeRanges;
  }

  getLeft(index) {
    return this.leftShape[index];
  }

  getLeftRange(index) {
    return this.leftShapeRanges[index]
  }

  //TODO move to an utils?
  reverse(string) {
    return string.split('').reverse().join('');
  }

}
