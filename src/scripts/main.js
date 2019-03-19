function init() {
    const mazeGenerator = new MazeGenerator();

    mazeGenerator.generate(10, 10, 0.75, 0.75);
}

window.onload = init;
