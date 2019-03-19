class MazeGenerator {
  constructor() {
  }

  generate(width, height, complexity, density) {
    const maze = new Maze(width, height);

    const shape = [
      Math.floor(height / 2) * 2 + 1,
      Math.floor(width / 2) * 2 + 1
    ];

    complexity = parseInt(
      complexity * (5 * (shape[0] + shape[1]))
    );

    density = parseInt(
      density * (Math.floor(shape[0] / 2) * Math.floor(shape[1] / 2))
    )

    maze.fillBorders();

    // maze.makeAisles(density, shape);
  }

}
