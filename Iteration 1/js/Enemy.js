class Enemy {
    constructor(x, y, scene) {
        this.scene = scene;
        this.startX = x;
        this.startY = y;
        this.start = (this.startX, this.startY );
        this.end = (this.startX + 50, this.startY );
        this.touchData = {};
        console.log(this.scene);
        this.sprite = this.scene.physics.add
            .sprite(x, y, "squirrel", 0)
            .setScale(2);
        //this.spriteB = this.scene.physics.add
        //   .sprite(x, y, "bat", 0)
        //    .setScale(2);



        this.sprite.label = 'squirrel';
        //this.spriteB.label = 'bat';
        this.health = 1;
        //this.follower = {};
        //this.path = {};

        const anims = scene.anims;
        anims.create({
          key: "idleEnemy",
          frames: anims.generateFrameNumbers("squirrel", {
              start: 0,
              end: 1
          }),
          frameRate: 2,
          repeat: -1
        });

        this.sprite.anims.play("idleEnemy", true);

        this.isTouching = true;

        this.scene.physics.add.collider(this.sprite, this.scene.ground);
        this.scene.physics.add.collider(this.scene.player.sprite, this.sprite, this.handleCollision, false, this);
    }

    handleCollision(player, enemy){
      if(enemy.body.touching.up && player.body.touching.down){
        this.scene.sanity++;
        this.sprite.disableBody(true,true);
        console.log(this.scene.sanity);

      }else if(this.sprite.body.touching.right || this.sprite.body.touching.left){
        if (this.scene.player.immune == false) {
          this.scene.player.health--;
          this.scene.player.immuneTime = 1000;
        }

        console.log(this.scene.player.health);
      }
    }

    create() {
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };

        this.path = this.scene.add.path();

        var line = new Phaser.Curves.Line([this.startX,this.startY,this.startX + 200, this.startY]);

        this.path.add(line);



        this.scene.tweens.add({
            targets: this.follower,
            t: 1,
            ease: "Linear",
            duration: Phaser.Math.Between(1500, 3000),
            yoyo: true,
            repeat: -1
        });

    }

    update(time,delta) {
        //console.log(delta)
        this.path.getPoint(this.follower.t, this.follower.vec);
        this.sprite.x = this.follower.vec.x;

        //this.sprite.y = this.follower.vec.y;

    }

}
