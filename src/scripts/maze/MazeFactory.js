var width = 25           //Number paths fitted horisontally
var height = 25          //Number paths fitted vertically
var x = width/2|0        //Horisontal starting position
var y = height/2|0       //Vertical starting position
var route;
var map;
var random;
var direction;
var ctx;
var offset;
var timer;

class MazeFactory {
  constructor() {
    const pathWidth = 10       //Width of the Maze Path
    const wall = 2             //Width of the Walls between Paths
    const outerWall = 2        //Width of the Outer most wall

    const delay = 1            //Delay between algorithm cycles

    const seed = Math.random()*100000|0//Seed for random numbers
    const wallColor = '#d24'   //Color of the walls
    const pathColor = '#222a33'//Color of the path

    const randomGen = function(seed){
    	if(seed===undefined)var seed=performance.now()
    	return function(){
        seed = (seed * 9301 + 49297) % 233280
    		return seed/233280
    	}
    }

    init = function(){
      offset = pathWidth/2+outerWall
      map = []
      const canvas = document.querySelector('canvas')
      ctx = canvas.getContext('2d')
      canvas.width = outerWall*2+width*(pathWidth+wall)-wall
      canvas.height = outerWall*2+height*(pathWidth+wall)-wall
      ctx.fillStyle = wallColor
      ctx.fillRect(0,0,canvas.width,canvas.height)
      random = randomGen(seed)
      ctx.strokeStyle = pathColor
      ctx.lineCap = 'square'
      ctx.lineWidth = pathWidth
      ctx.beginPath()
      for(var i=0;i<height*2;i++){
        map[i] = []
        for(var j=0;j<width*2;j++){
          map[i][j] = false
        }
      }
      map[y*2][x*2] = true
      route = [[x,y]]
      ctx.moveTo(x*(pathWidth+wall)+offset,
                 y*(pathWidth+wall)+offset)
    }
    init()

    const inputWidth = document.getElementById('width')
    const inputHeight = document.getElementById('height')
    const inputPathWidth = document.getElementById('pathwidth')
    const inputWallWidth = document.getElementById('wallwidth')
    const inputOuterWidth = document.getElementById('outerwidth')
    const inputPathColor = document.getElementById('pathcolor')
    const inputWallColor = document.getElementById('wallcolor')
    const inputSeed = document.getElementById('seed')
    const buttonRandomSeed = document.getElementById('randomseed')

    const settings = {
      display: function(){
        inputWidth.value = width
        inputHeight.value = height
        inputPathWidth.value = pathWidth
        inputWallWidth.value = wall
        inputOuterWidth.value = outerWall
        inputPathColor.value = pathColor
        inputWallColor.value = wallColor
        inputSeed.value = seed
      },
      check: function(){
        if(inputWidth.value != width||
           inputHeight.value != height||
           inputPathWidth.value != pathWidth||
           inputWallWidth.value != wall||
           inputOuterWidth.value != outerWall||
           inputPathColor.value != pathColor||
           inputWallColor.value != wallColor||
           inputSeed.value != seed){
          settings.update()
        }
      },
      update: function(){
        clearTimeout(timer)
        width = parseFloat(inputWidth.value)
        height = parseFloat(inputHeight.value)
        pathWidth = parseFloat(inputPathWidth.value)
        wall = parseFloat(inputWallWidth.value)
        outerWall = parseFloat(inputOuterWidth.value)
        pathColor = inputPathColor.value
        wallColor = inputWallColor.value
        seed = parseFloat(inputSeed.value)
        x = width/2|0
        y = height/2|0
        init()
        loop()
      }
    }

    buttonRandomSeed.addEventListener('click',function(){
      inputSeed.value = Math.random()*100000|0
    })

    const loop = function(){
      x = route[route.length-1][0]|0
      y = route[route.length-1][1]|0

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
          timer = setTimeout(loop,delay)
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
      timer = setTimeout(loop,delay)
    }
    settings.display()
    loop()
    setInterval(settings.check,400)
  }

}
