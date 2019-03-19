class Coin {
    constructor(x, y, scene) {
        this.scene = scene;
        this.sprite = this.scene.physics.add
            .sprite(x, y, "coin", 0)
            .setScale(1)
        this.sprite.label = 'coin';

        const anims = scene.anims;

        anims.create({
            key: "float",
            frames: anims.generateFrameNumbers("coin", {
                start: 0,
                end: 1
            }),
            frameRate: 5,
            repeat: -1
        });

        this.sprite.anims.play("float", true);

        this.scene.physics.add.collider(this.sprite, this.scene.ground);
        this.scene.physics.add.overlap(this.scene.player.sprite, this.sprite, this.coinPickUp, false, this);
        


    }

    coinPickUp(player, coin) {
        this.scene.greed++;
        coin.disableBody(true, true);
        console.log(this.scene.greed)

    }
}