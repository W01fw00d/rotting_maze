class MazeFactory {
  constructor() {
    const width = 25;
    const height = 25;
    const startX = width / 2 | 0;
    const startY = this.height / 2 | 0;
    this.route = [[startX, startY]];
    const seed = this.generateSeed();
    this.random = this.randomGen(seed);

    const pathWidth = 10;
    const wallWidth = 2;
    const outerWallWidth = 2;

    this.offset = pathWidth / 2 + outerWallWidth;

    this.painter = new CanvasPainter(
      width,
      height,
      pathWidth,
      wallWidth,
      outerWallWidth,
      startX,
      startY,
      this.offset
    );

    this.ctx = this.painter.generateBaseMaze();

    this.map = this.makeMap(
      width,
      startX,
      height,
      startY
    );

    this.loop(
      this.route,
      this.map,
      this.random,
      this.ctx,
      this.offset,
      pathWidth,
      wallWidth
    )
  }

  generateSeed() {
    const seed = Math.random() * 100000 | 0;
    console.log(seed);

    return seed;
  }

  randomGen(seed) {
    if (seed === undefined) {
      let seed = performance.now();
    }
    return () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    }
  }

  makeMap(width, x, height, y){
    const map = [];

    for (var i = 0; i < height * 2 ; i++) {
      map[i] = [];
      for (var j = 0; j < width * 2; j++) {
        map[i][j] = false;
      }
    }
    map[y * 2][x * 2] = true;

    return map;
  }

  loop(route, map, random, ctx, offset, pathWidth, wallWidth) {
    const cyclesDelay = 1;
    let direction;
    const x = route[route.length-1][0] | 0;
    const y = route[route.length-1][1] | 0;

    var directions = [
      [1,0], [-1,0], [0,1], [0,-1]
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

    if(alternatives.length === 0) {
      route.pop();
      if (route.length > 0) {
        ctx.moveTo(
          route[route.length - 1][0] * (pathWidth + wallWidth) + offset,
          route[route.length - 1][1] * (pathWidth + wallWidth) + offset
        );

        setTimeout(() => {
          this.loop(
            route,
            map,
            random,
            ctx,
            offset,
            pathWidth,
            wallWidth
          );
        }, cyclesDelay);
      }
      return;
    }
    direction = alternatives[random() * alternatives.length | 0];
    route.push(
      [direction[0] + x,
      direction[1] + y]
    );
    ctx.lineTo(
      (direction[0] + x) * (pathWidth + wallWidth) + offset,
      (direction[1] + y) * (pathWidth + wallWidth) + offset
    );
    map[(direction[1] + y) * 2][(direction[0] + x) * 2] = true;
    map[direction[1] + y * 2][direction[0] + x * 2] = true;
    ctx.stroke();

    setTimeout(() => {
      this.loop(
        route,
        map,
        random,
        ctx,
        offset,
        pathWidth,
        wallWidth
      )
    }, cyclesDelay);
  }

}
