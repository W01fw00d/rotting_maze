class MazeFactory {
  constructor() {
    this.pathWidth = 10;
    this.wallWidth = 2;
    this.outerWallWidth = 2;
  }

  defaultStructureConstructor() {
    const width = 15;
    const height = 30;
    const startX = width / 2 | 0;
    const startY = this.height / 2 | 0;

    this.painter = new CanvasPainter(
      width,
      height,
      this.pathWidth,
      this.wallWidth,
      this.outerWallWidth,
      startX,
      startY
    );

    this.painter.generateBaseMaze();

    this.map = this.makeMap(
      width,
      startX,
      height,
      startY
    );

    this.applyMazeGenerationAlgorithm(startX, startY);
  }

  brainStructureConstructor() {
    // const width = 15;
    // const height = 30;

    // _ is empty, X is maze

    const brainTemplate = new BrainShapeTemplate();
    console.log(brainTemplate.shape);
console.log(brainTemplate.shapeRanges);
    // const width = 15;
    // const height = 30;

    const startX = brainTemplate.get(0).width / 2 | 0;
    const startY = this.height / 2 | 0;

    this.painter = new CanvasPainter(
      width,
      height,
      this.pathWidth,
      this.wallWidth,
      this.outerWallWidth,
      startX,
      startY
    );

    this.painter.generateBaseMaze();

    this.map = this.makeMap(
      width,
      startX,
      height,
      startY
    );

    this.applyMazeGenerationAlgorithm(startX, startY);
  }

  applyMazeGenerationAlgorithm(startX, startY) {
    const route = [
      [startX, startY]
    ];
    const random = this.randomGen();
    const cyclesDelay = 1;

    this.loop(
      route,
      this.map,
      random,
      this.painter,
      cyclesDelay
    )
  }

  randomGen() {
    let seed = Math.random() * 100000 | 0;
    console.log(seed);

    return () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    }
  }

  makeMap(width, x, height, y){
    const map = [];

    for (var i = 0; i < height * 2; i++) {
      map[i] = [];
      for (var j = 0; j < width * 2; j++) {
        map[i][j] = false;
      }
    }
    map[y * 2][x * 2] = true;

    return map;
  }

  loop(route, map, random, painter, cyclesDelay) {
    let direction;
    const x = route[route.length - 1][0] | 0;
    const y = route[route.length - 1][1] | 0;

    var directions = [
      [1, 0], [-1, 0], [0, 1], [0, -1]
    ],
      alternatives = [];

    for (var i = 0; i < directions.length; i++) {
      if (
        map[(directions[i][1] + y) * 2] != undefined
        && map[(directions[i][1] + y) * 2][(directions[i][0] + x) * 2] === false
      ) {
        alternatives.push(directions[i])
      }
    }

    if (alternatives.length === 0) {
      route.pop();
      if (route.length > 0) {
        painter.moveTo(route[route.length - 1]);

        this.setNextLoopTimeout(
          route,
          map,
          random,
          painter,
          cyclesDelay
        );
      }
      return;
    }
    direction = alternatives[random() * alternatives.length | 0];
    route.push(
      [direction[0] + x,
      direction[1] + y]
    );

    painter.lineTo(direction, x, y);
    painter.apply();

    map[(direction[1] + y) * 2][(direction[0] + x) * 2] = true;
    map[direction[1] + y * 2][direction[0] + x * 2] = true;

    this.setNextLoopTimeout(
      route,
      map,
      random,
      painter,
      cyclesDelay
    );
  }

  setNextLoopTimeout(route, map, random, painter, cyclesDelay) {
    setTimeout(() => {
        this.loop(route, map, random, painter, cyclesDelay)
      },
      cyclesDelay
    );
  }

}
