function init() {
  // const consolePainter = new ConsolePainter();
  mazeFactory = new MazeFactory();
  //mazeFactory.defaultStructureConstructor();
  mazeFactory.brainStructureConstructor();
}

function playAudio() {
  const brainSong = document.getElementById("brain_song");

  const audioButton = document.getElementsByClassName("audioButton")[0];
  audioButton.className += " pressed";

  brainSong.play();

  setTimeout(() => {
      mazeFactory.applyMazeGenerationAlgorithm();
    },
    15500
  );
}

window.onload = init;
