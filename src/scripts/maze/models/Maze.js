class Maze {
  constructor(width, height, painter) {
    this.width = width;
    this.height = height;
    this.painter = painter;

    this.generateEmptyMatrix(width, height);
  }

  generateEmptyMatrix(width, height) {
    var matrix = [];
    for (var i = 0; i < height; i++) {
        matrix[i] = [];
        for (var j = 0; j < width; j++) {
            matrix[i][j] = 0;
        }
    }

    this.matrix = matrix;
  }

  fillBorders() {
    this.fillRow(0);
    this.fillRow(this.height - 1);
    this.fillColumn(0);
    this.fillColumn(this.width - 1);
  }



  //PRIVATE
  fillRow(rowIndex) {
    const row = this.matrix[rowIndex]

    for (var i = 0; i < row.length; i++) {
      row[i] = 1;
    }
  }

  fillColumn(columnIndex) {
    for (var i = 0; i < this.matrix.length; i++) {
      this.matrix[i][columnIndex] = 1;
    }
  }

  generateRandomPosition(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  }

  paint() {
    var height = this.matrix.length;

    for (var i = 0; i < height; i++) {
        var width = this.matrix[i].length;
        var line = '';
        for (var j = 0; j < width; j++) {
            line += this.matrix[i][j];
        }

        this.painter.paint(i + '. ' + line);
    }

  }
}
