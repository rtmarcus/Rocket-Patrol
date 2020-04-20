class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('music', './assets/Boss Fight.ogg');
    }

    create() {
        //display menu text
        //this.add.text(20, 20, "Rocket Patrol Menu");
        //this.highScore = 0;
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,

            },
            fixedWidth: 0
        }
            let centerX = game.config.width/2;
            let centerY = game.config.height/2;
            let textSpacer = 64;

            this.add.text(centerX - 220, centerY- textSpacer - textSpacer, 'High Score:', menuConfig).setOrigin(0.5);
            this.add.text(centerX - 64, centerY- textSpacer - textSpacer, game.settings.highScore, menuConfig).setOrigin(0.5);

            this.add.text(centerX, centerY- textSpacer, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
            this.add.text(centerX, centerY, 'Use <--> arrows to move & (F) to Fire', menuConfig).setOrigin(0.5);
            menuConfig.backgroundColor = '#00FF00';
            menuConfig.color = '#000';
            this.add.text(centerX, centerY + textSpacer, 'press <- for Easy or -> for Hard', menuConfig).setOrigin(0.5);

        //Launch the next scene
            keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
            keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
            //console.log(game.settings.highScore);
            //this.sound.play('music');
        }
        update() {
            if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                // easy mode
                game.settings = {
                    highScore: game.settings.highScore,
                    spaceshipSpeed: 3,
                    gameTimer: 60000
                }
                this.sound.play('sfx_select');
                this.scene.start("playScene");
            }
            if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
                // hard mode (for gamers)
                game.settings = {
                    highScore: game.settings.highScore,
                    spaceshipSpeed: 4,
                    gameTimer: 45000
                }
                this.sound.play('sfx_select');
                this.scene.start("playScene");
            }
        }
        //this.scene.start("playScene");
    }
//}