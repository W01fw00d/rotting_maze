function init() {
  // const consolePainter = new ConsolePainter();
  mazeFactory = new MazeFactory();
  //mazeFactory.defaultStructureConstructor();
  mazeFactory.brainStructureConstructor();
}

function playAudio() {
  const brainSong = document.getElementById("brain_song");

  brainSong.play();

  setTimeout(() => {
      mazeFactory.applyMazeGenerationAlgorithm();
    },
    15500
  );
}

window.onload = init;
