class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    preload() {
        //this.load.audio('music', './assets/ingame_music');
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('top', './assets/top_border.png');
        this.load.image('left', './assets/left_border.png');
        this.load.image('right', './assets/right_border.png');
        this.load.image('bottom', './assets/bottom_border.png');
        this.load.image('missile', './assets/missile.png');
        this.load.image('spaceship', './assets/spaceship.png'); 
        this.load.image('spaceship2', './assets/Spaceship2.png');
        this.load.image('starfield', './assets/starfield.png'); 
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        var audio = new Audio('./assets/Boss Fight.ogg');
        audio.play();
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        //this.sound.play('music');

        //console.log(game.settings.highScore);
        // white rectangle borders

        this.topBorder = new Border(this, 5, 5, 'top').setOrigin(0, 0);
        //this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.bottomBorder = new Border(this, 5, 443, 'bottom').setOrigin(0, 0);
        //this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.leftBorder = new Border(this, 5, 5, 'left').setOrigin(0, 0);
        //this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.rightBorder = new Border(this, 584, 5, 'right').setOrigin(0, 0);
        //this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        //this.add.text(20, 20, "Rocket Patrol Play");
        // gray ui background
        this.add.rectangle(37, 42, 566, 64, 0xd3d3d3).setOrigin(0, 0);

        // add rocket in
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'rocket').setScale(0.5, 0.5).setOrigin(0, 0);

        this.bigRocket = new BigRocket(this, game.config.width/2, 426, 'missile').setScale(0.5, 0.5).setOrigin(0, 0);
        // add enemies
        this.ship4 = new Spaceship(this, game.config.width +192, 132, 'spaceship2', 0, 50, 2).setScale(0.55, 0.55).setOrigin(0, 0);
        this.ship1 = new Spaceship(this, game.config.width +96, 196, 'spaceship', 0, 30, 0).setOrigin(0, 0);
        this.ship2 = new Spaceship(this, game.config.width, 260, 'spaceship', 0, 20, 0).setOrigin(0, 0);
        this.ship3 = new Spaceship(this, game.config.width -96, 324, 'spaceship', 0, 10, 0).setOrigin(0, 0);

        // define keyboard keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        this.p1Score = 0;

        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FF0000',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,

            },
            fixedWidth: 100
        }
        let highScoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FF0000',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,

            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(469, 54, game.settings.highScore, highScoreConfig);
        this.gameOver = false;
        // 60-second clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            audio.pause();
            audio.currentTime = 0;
        }, null, this);
        this.speedup = this.time.delayedCall(30000, () => {
            game.settings.spaceshipSpeed += 2;
        }, null, this);

    }

    update() {
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)){
            if(this.p1Score > game.settings.highScore){
                game.settings.highScore = this.p1Score;
            }
            //audio.pause();
            //audio.currentTime = 0;
            //console.log(game.settings.highScore);
            //this.sound.pause('music');
            //this.music.pause();
            //this.sound.play('music');
            //console.log(game.settings.gameTimer);
            game.settings.spaceshipSpeed -= 2;
            this.scene.restart(this.p1Score);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            if(this.p1Score > game.settings.highScore){
                game.settings.highScore = this.p1Score;
            }
            game.settings.spaceshipSpeed -= 2;
            this.scene.start("menuScene");
        }

        //console.log(this.time);
        
        // scroll starfield
        this.starfield.tilePositionX -= 4;

        // update rocket
        if (!this.gameOver) {
            if(this.p1Rocket.isFiring){
                this.bigRocket.otherFired = true;
            }
            else{
                this.bigRocket.otherFired = false;
            }
            if(!this.bigRocket.isFiring){
            this.p1Rocket.update();
            }

            this.bigRocket.update();
            this.ship1.update();
            this.ship2.update();
            this.ship3.update();
            this.ship4.update();
        }

        if(this.checkCollision(this.p1Rocket, this.ship3)) {
            this.p1Rocket.reset();
            this.bigRocket.otherFired = false;
            this.shipExplode(this.ship3);
        }
        if (this.checkCollision(this.p1Rocket, this.ship2)) {
            this.p1Rocket.reset();
            this.bigRocket.otherFired = false;
            this.shipExplode(this.ship2);
        }
        if (this.checkCollision(this.p1Rocket, this.ship1)) {
            this.p1Rocket.reset();
            this.bigRocket.otherFired = false;
            this.shipExplode(this.ship1);
        }
        if (this.checkCollision(this.p1Rocket, this.ship4)) {
            this.p1Rocket.reset();
            this.bigRocket.otherFired = false;
            this.shipExplode(this.ship4);
        }

        //BigRocket Collision
        if(this.checkCollision(this.bigRocket, this.ship3)) {
            //this.p1Rocket.reset();
            this.shipExplode(this.ship3);
        }
        if (this.checkCollision(this.bigRocket, this.ship2)) {
            //this.p1Rocket.reset();
            this.shipExplode(this.ship2);
        }
        if (this.checkCollision(this.bigRocket, this.ship1)) {
            //this.p1Rocket.reset();
            this.shipExplode(this.ship1);
        }
        if (this.checkCollision(this.bigRocket, this.ship4)) {
            //this.p1Rocket.reset();
            this.shipExplode(this.ship4);
        }
    }
    checkCollision(rocket, ship) {

        if(rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y){
            return true;
        }
        else{
            return false;
        }
    }
    shipExplode(ship) {
        ship.alpha = 0;
        //ship.reset();
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        ship.reset();
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
        //this.sound.play('music');
    }
}