function init() {
  // const consolePainter = new ConsolePainter();
  const mazeFactory = new MazeFactory();
  //mazeFactory.defaultStructureConstructor();
  mazeFactory.brainStructureConstructor();
}

window.onload = init;
