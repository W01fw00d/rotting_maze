function init() {
  // const consolePainter = new ConsolePainter();
  const mazeFactory = new MazeFactory();
  mazeFactory.defaultStructureConstructor();
}

window.onload = init;
