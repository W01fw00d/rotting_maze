class MazeFactory {
  constructor() {
    this.pathWidth = 10;
    this.wallWidth = 2;
    this.delayMilliseconds = 100; //3000 1
  }

  defaultStructureConstructor() {
    const width = 15;
    const height = 30;
    const outerWallWidth = 2;

    //TODO Make the start point random ?
    this.startX = width / 2 | 0;
    this.startY = height / 2 | 0;

    this.painters = [
      this.makeLeftCanvasPainter(width, height, this.startX, this.startY, outerWallWidth),
      this.makeRightCanvasPainter(width, height, this.startX, this.startY, outerWallWidth)
    ];
    this.painters.forEach((painter) => {
      painter.paintAllCanvasWithWalls();
      painter.moveTo([this.startX, this.startY]);
    });

    this.map = this.makeMap(width, height, this.startX, this.startY);

    this.applyMazeGenerationAlgorithm();
  }

  brainStructureConstructor() {
    const template = new BrainShapeTemplate();
    const width = 15;
    const height = 30;
    const outerWallWidth = 2;

    const middleBrainRow = template
      .getLeftRange(Math.floor((template.height - 1) / 2))

    this.startX = (middleBrainRow[0] + middleBrainRow[1]) / 2
      | 0;
    this.startY = template.height / 2 | 0;

    this.painters = [
      this.makeLeftCanvasPainter(width, height, this.startX, this.startY, outerWallWidth),
      this.makeRightCanvasPainter(width, height, this.startX, this.startY, outerWallWidth)
    ];

    this.paintCanvasByShape(template);

    this.painters.forEach((painter) => {
      painter.moveTo([this.startX, this.startY]);
    });

    this.map = this.makeShapedMazeMap(
      template.leftShapeRanges,
      template.maxWidth,
      this.startX,
      this.startY
    );
    // console.log(this.map);
    //this.applyMazeGenerationAlgorithm();
  }

  paintCanvasByShape(template) {
    let y = 0;
    template.leftShapeRanges.forEach((rowRange) => {
      this.painters.forEach((painter) => {
        painter.paintRowWallSpace([rowRange[0], y, rowRange[1]]);
      });
      y++;
    });
  }

  //TODO refactor those 2 methods to avoid cpde duplication
    makeLeftCanvasPainter(width, height, startX, startY, outerWallWidth) {
      const painter = new CanvasPainter(
        '.left_canvas',
        width,
        height,
        this.pathWidth,
        this.wallWidth,
        outerWallWidth,
        startX,
        startY
      );
      painter.generateBaseMaze();

      return painter;
    }

    makeRightCanvasPainter(width, height, startX, startY, outerWallWidth) {
      const painter = new MirroredCanvasPainter(
        '.right_canvas',
        width,
        height,
        this.pathWidth,
        this.wallWidth,
        outerWallWidth,
        startX,
        startY
      );
      painter.generateBaseMaze();

      return painter;
    }

  applyMazeGenerationAlgorithm() {
    const route = [
      [this.startX, this.startY]
    ];
    const random = this.randomGen();
    const cyclesDelay = this.delayMilliseconds;

    this.loop(
      route,
      this.map,
      random,
      this.painters,
      cyclesDelay
    )
  }

  randomGen() {
    let seed = Math.random() * 100000 | 0;
    // console.log(seed);

    return () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    }
  }

  makeMap(width, height, x, y){
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

  makeShapedMazeMap(ranges, width, x, y){
    const map = [];
    const height = ranges.length;

    let currentRange;

    for (var i = 0; i < height; i++) {
      map.push([]);
      map.push([]);

      for (var j = 0; j < width * 2; j++) {
        if (
          (ranges[i][0] * 2) <= j
          && j <= (ranges[i][1] * 2)
        ) {
          map[map.length - 2][j] = false; //can be part of the maze path
          map[map.length - 1][j] = false;
        } else {
          map[map.length - 2][j] = null; //is not part of the maze
          map[map.length - 1][j] = null;
        }
      }
    }

    map[y * 2][x * 2] = true; // is already part of the maze path

    return map;
  }

  loop(route, map, random, painters, cyclesDelay) {
    let direction;
    const x = route[route.length - 1][0] | 0;
    const y = route[route.length - 1][1] | 0;

    const directions = [
      [1, 0], [-1, 0], [0, 1], [0, -1]
    ],
      alternatives = this.getAlternatives(map, directions, x, y);

    if (alternatives.length === 0) {
      this.goBackToLastPathPoint(
        route,
        map,
        random,
        painters,
        cyclesDelay
      );

    } else {
      this.goToARandomAlternativePath(
        alternatives,
        direction,
        x,
        y,
        route,
        map,
        random,
        painters,
        cyclesDelay
      );
    }
  }

  getAlternatives(map, directions, x, y) {
    const alternatives = [];

    for (var i = 0; i < directions.length; i++) {
      if (
        map[(directions[i][1] + y) * 2] != undefined
        && map[(directions[i][1] + y) * 2][(directions[i][0] + x) * 2] === false
      ) {
        alternatives.push(directions[i])
      }
    }

    return alternatives;
  }

  goBackToLastPathPoint(
    route,
    map,
    random,
    painters,
    cyclesDelay
  ) {
    route.pop();
    if (route.length > 0) {
      painters.forEach((painter) => {
        painter.moveTo(route[route.length - 1]);
      });

      this.setNextLoopTimeout(
        route,
        map,
        random,
        painters,
        cyclesDelay
      );
    }
  }

  goToARandomAlternativePath(
    alternatives,
    direction,
    x,
    y,
    route,
    map,
    random,
    painters,
    cyclesDelay
  ) {
    direction = alternatives[random() * alternatives.length | 0];
    route.push([
      direction[0] + x,
      direction[1] + y
    ]);

    painters.forEach((painter) => {
      painter.lineTo(direction, x, y);
      painter.apply();
    });

    map[(direction[1] + y) * 2][(direction[0] + x) * 2] = true;
    map[direction[1] + y * 2][direction[0] + x * 2] = true;

    this.setNextLoopTimeout(
      route,
      map,
      random,
      painters,
      cyclesDelay
    );
  }

  setNextLoopTimeout(route, map, random, painters, cyclesDelay) {
    setTimeout(() => {
        this.loop(route, map, random, painters, cyclesDelay)
      },
      cyclesDelay
    );
  }

}
