class MazeFactory {
  constructor() {
    this.width = 25;
    this.x = this.width / 2 | 0        //Horisontal starting position
    this.height = 25          //Number paths fitted vertically
    this.y = this.height / 2 | 0       //Vertical starting position

    this.route = [[this.x, this.y]];
    this.map = [];
    const seed = Math.random() * 100000 | 0//Seed for random numbers
    console.log(seed);
    this.random = this.randomGen(seed);

    const pathWidth = 10       //Width of the Maze Path
    const wall = 2             //Width of the Walls between Paths
    const outerWall = 2        //Width of the Outer most wall

    this.makeMap(
      this.width,
      this.x,
      this.height,
      this.y,
      this.map
    );

    const canvas = this.makeCanvas(outerWall, this.width, this.height, pathWidth, wall);

    this.offset = pathWidth / 2 + outerWall;

    this.ctx = this.configCtx(canvas, pathWidth, wall, this.offset, this.x, this.y);

    const loop = function(route, map, random, ctx, offset){
      const delay = 1; //Delay between algorithm cycles
      let direction;
      const x = route[route.length-1][0]|0
      const y = route[route.length-1][1]|0

      var directions = [[1,0],[-1,0],[0,1],[0,-1]],
          alternatives = []

      for(var i=0;i<directions.length;i++){
        if(map[(directions[i][1]+y)*2]!=undefined&&
           map[(directions[i][1]+y)*2][(directions[i][0]+x)*2]===false){
          alternatives.push(directions[i])
        }
      }

      if(alternatives.length===0){
        route.pop()
        if(route.length>0){
          ctx.moveTo(route[route.length-1][0]*(pathWidth+wall)+offset,
                     route[route.length-1][1]*(pathWidth+wall)+offset)

          setTimeout(() => {
            loop(
              route,
              map,
              random,
              ctx,
              offset
            );
          }, delay);
        }
        return;
      }
      direction = alternatives[random()*alternatives.length|0]
      route.push([direction[0]+x,direction[1]+y])
      ctx.lineTo((direction[0]+x)*(pathWidth+wall)+offset,
                 (direction[1]+y)*(pathWidth+wall)+offset)
      map[(direction[1]+y)*2][(direction[0]+x)*2] = true
      map[direction[1]+y*2][direction[0]+x*2] = true
      ctx.stroke()

      setTimeout(() => {
        loop(
          route,
          map,
          random,
          ctx,
          offset
        )
      }, delay);
    }

    loop(
      this.route,
      this.map,
      this.random,
      this.ctx,
      this.offset
    )
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

  makeMap(width, x, height, y, map){
    for(var i=0;i<height*2;i++){
      map[i] = []
      for(var j=0;j<width*2;j++){
        map[i][j] = false
      }
    }
    map[y*2][x*2] = true
  }

  makeCanvas(outerWall, width, height, pathWidth, wall) {
    const canvas = document.querySelector('canvas')

    canvas.width = outerWall*2+width*(pathWidth+wall)-wall
    canvas.height = outerWall*2+height*(pathWidth+wall)-wall

    return canvas;
  }

  configCtx(canvas, pathWidth, wall, offset, x, y) {
    const wallColor = '	#a02040'   //Color of the walls
    const pathColor = '#f5e8eb'//Color of the path
    const cursorColor = '#d9a5b2' //TODO not used yet

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = wallColor;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle = pathColor;
    ctx.lineCap = 'square';
    ctx.lineWidth = pathWidth;
    ctx.beginPath();

    ctx.moveTo(x*(pathWidth+wall)+offset,
               y*(pathWidth+wall)+offset);

    return ctx;
  }

}
