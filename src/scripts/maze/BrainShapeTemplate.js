class BrainShapeTemplate {
  constructor() {
    this.shape = [
      '__XXXXXXXXXXX__',
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

    this.shapeRanges = this.calculateShapeRanges();
  }

  calculateShapeRanges() {
    let shapeRanges = [];

    let fromLimit;
    let toLimit;
    let range;

    this.shape.forEach((row) => {
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

  get(index) {
    return this.shape[index];
  }

  getRange(index) {
    return this.shapeRanges[index]
  }

}
