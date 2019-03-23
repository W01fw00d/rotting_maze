class MazeFactory {
  constructor() {
    this.width = 25;
    const startX = this.width / 2 | 0;
    this.height = 25;
    const startY = this.height / 2 | 0;

    this.route = [[startX, startY]];
    const seed = this.generateSeed();
    this.random = this.randomGen(seed);

    const pathWidth = 10;
    const wallWidth = 2;
    const outerWallWidth = 2;
    this.offset = pathWidth / 2 + outerWallWidth;

    const canvas = this.makeCanvas(
      outerWallWidth,
      this.width,
      this.height,
      pathWidth,
      wallWidth
    );
    this.ctx = this.configCtx(
      canvas,
      pathWidth,
      wallWidth,
      this.offset,
      startX,
      startY
    );
    this.map = this.makeMap(
      this.width,
      startX,
      this.height,
      startY
    );

    const loop = function(route, map, random, ctx, offset) {
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
            loop(
              route,
              map,
              random,
              ctx,
              offset
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
        loop(
          route,
          map,
          random,
          ctx,
          offset
        )
      }, cyclesDelay);
    }

    loop(
      this.route,
      this.map,
      this.random,
      this.ctx,
      this.offset
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

  makeCanvas(outerWallWidth, width, height, pathWidth, wallWidth) {
    const canvas = document.querySelector('canvas');

    canvas.width =
      outerWallWidth * 2 + width
      * (pathWidth + wallWidth) - wallWidth;
    canvas.height =
      outerWallWidth * 2 + height
      * (pathWidth+wallWidth) - wallWidth;

    return canvas;
  }

  configCtx(canvas, pathWidth, wallWidth, offset, x, y) {
    const wallColor = '#a02040';
    const pathColor = '#f5e8eb';
    const cursorColor = '#d9a5b2' //TODO not used yet

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = wallColor;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle = pathColor;
    ctx.lineCap = 'square';
    ctx.lineWidth = pathWidth;
    ctx.beginPath();

    ctx.moveTo(
      x * (pathWidth + wallWidth) + offset,
      y * (pathWidth + wallWidth) + offset
    );

    return ctx;
  }

}
