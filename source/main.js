let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ],
};

let game = new Phaser.Game(config);
game.settings = {
    highScore: 0,
    spaceshipSpeed: 3,
    gameTimer: 60000
}

// reserve keyboard variables
let keyF, keyLEFT, keyRIGHT, keySPACE;