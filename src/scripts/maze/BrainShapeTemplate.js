class BrainShapeTemplate {
  constructor() {
    // _ is empty, X is maze
    this.height = 30;
    this.maxWidth = 16;

    this.leftShape = [
      '__________XXXX__',
      '________XXXXXXX_',
      '_______XXXXXXXXX',
      '______XXXXXXXXXX',
      '______XXXXXXXXXX',
      '_____XXXXXXXXXXX',
      '_____XXXXXXXXXXX',
      '____XXXXXXXXXXXX',
      '____XXXXXXXXXXXX',
      '____XXXXXXXXXXXX',
      '___XXXXXXXXXXXXX',
      '___XXXXXXXXXXXXX',
      '___XXXXXXXXXXXXX',
      '___XXXXXXXXXXXXX',
      '___XXXXXXXXXXXXX',
      '___XXXXXXXXXXXXX',
      '___XXXXXXXXXXXXX',
      '___XXXXXXXXXXXXX',
      '___XXXXXXXXXXXXX',
      '___XXXXXXXXXXXXX',
      '___XXXXXXXXXXXXX',
      '___XXXXXXXXXXXXX',
      '____XXXXXXXXXXXX',
      '____XXXXXXXXXXXX',
      '_____XXXXXXXXXXX',
      '______XXXXXXXXXX',
      '_______XXXXXXXXX',
      '________XXXXXXXX',
      '_________XXXXXX_',
      '__________XXXX__',
    ];

    this.leftShapeRanges = this.calculateShapeRanges(this.leftShape);

    // this.rightShape = this.generateRightShape(this.leftShape);
    // this.rightShapeRanges = this.calculateShapeRanges(this.rightShape);
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
        .substring(fromLimit, row.length)
        .indexOf('_');

      shapeRanges.push([
        fromLimit,
        (toLimit < 0
          ? row.length
          : toLimit + fromLimit) - 1
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
