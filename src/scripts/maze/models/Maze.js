class Maze {
  constructor(width, height) {
    this.width = width;
    this.height = height;

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

  generateRandomPosition(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  }

  //WIP
  makeAisles(shape, density, complexity) {
    let x,
      y,
      neighbours;

    for (var i = 0; i < density; i++) {
      x = this.generateRandomPosition(0, (Math.floor(shape[1] / 2) * 2) - 1);
      y = this.generateRandomPosition(0, (Math.floor(shape[0] / 2) * 2) - 1);

      this.matrix[x][y] = 1;

      for (var j = 0; j < complexity; j++) {
        neighbours = [];

        if (x > 1) {
          neighbours.push([y, x - 2]);
        }

        if (x < shape[1] - 2) {
          neighbours.push([y, x + 2]);
        }

        if (y > 1) {
          neighbours.push([y - 2, x]);
        }

        if (y < shape[0] - 2) {
          neighbours.push([y + 2, x]);
        }

        if (neighbours.length > 0) {
          y_, x_ = neighbours[
            this.generateRandomPosition(0, neighbours.length - 1)
          ];


        }

      }
    }

    console.log(this.matrix);
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

}
