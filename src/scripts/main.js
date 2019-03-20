function init() {
  const consolePainter = new ConsolePainter();
  const mazeFactory = new MazeFactory(consolePainter);

  mazeFactory.generate(10, 10, 0.75, 0.75);
}

window.onload = init;
