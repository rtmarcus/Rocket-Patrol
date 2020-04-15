// spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, extraspeed) {
        super(scene, x, y, texture, frame);

        // add an object to a scene
        scene.add.existing(this);
        this.points = pointValue;
        this.speed = extraspeed;

    }

    update() {
        // move ship left
        this.x -= (this.speed + game.settings.spaceshipSpeed);
        //this.x -= extraspeed;
        // wrap ship around bounds
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width;
    }
}