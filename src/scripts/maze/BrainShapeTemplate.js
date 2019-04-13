class BrainShapeTemplate {
  constructor() {
    // _ is empty, X is maze
    this.height = 30;
    this.maxWidth = 15;

    this.leftShape = [
      '_________XXXX__',
      '_______XXXXXXX_',
      '______XXXXXXXXX',
      '_____XXXXXXXXXX',
      '_____XXXXXXXXXX',
      '____XXXXXXXXXXX',
      '____XXXXXXXXXXX',
      '___XXXXXXXXXXXX',
      '___XXXXXXXXXXXX',
      '__XXXXXXXXXXXXX',
      '__XXXXXXXXXXXXX',
      '__XXXXXXXXXXXXX',
      '__XXXXXXXXXXXXX',
      '__XXXXXXXXXXXXX',
      '__XXXXXXXXXXXXX',
      '__XXXXXXXXXXXXX',
      '__XXXXXXXXXXXXX',
      '__XXXXXXXXXXXXX',
      '__XXXXXXXXXXXXX',
      '__XXXXXXXXXXXXX',
      '__XXXXXXXXXXXXX',
      '___XXXXXXXXXXXX',
      '___XXXXXXXXXXXX',
      '____XXXXXXXXXXX',
      '____XXXXXXXXXXX',
      '_____XXXXXXXXXX',
      '______XXXXXXXXX',
      '_______XXXXXXXX',
      '________XXXXXX_',
      '_________XXXX__',
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
        toLimit < 0
          ? row.length
          : toLimit  + fromLimit
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
