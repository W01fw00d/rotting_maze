class MazeFactory {
  constructor(painter) {
    this.painter = painter;
  }

  generate(width, height, complexity, density) {
    const shape = [
      Math.floor(height / 2) * 2 + 1,
      Math.floor(width / 2) * 2 + 1
    ];

    const maze = new Maze(shape[0], shape[1], this.painter);

    complexity = parseInt(
      complexity * (5 * (shape[0] + shape[1]))
    );

    density = parseInt(
      density * (Math.floor(shape[0] / 2) * Math.floor(shape[1] / 2))
    )

    maze.fillBorders();

    maze.makeAisles(shape, density, complexity);

    maze.paint();
  }

}
