// spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);

        // add an object to a scene
        scene.add.existing(this);
        this.points = pointValue;

    }

    update() {
        // move ship left
        this.x -= game.settings.spaceshipSpeed;
        // wrap ship around bounds
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width;
    }
}