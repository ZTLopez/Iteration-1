class Player {
  constructor(x,y,scene) {
    this.scene=scene;
    this.touchData = {};
    this.sprite = this.scene.physics.add
    .sprite(x,y,"player",0)
    .setScale(3)
      this.sprite.label = 'player';

      this.immune = false;
      this.immuneTime = 1000;
      this.health = 5;
      this.jump = 2;


    const anims = scene.anims;

    anims.create({
      key: "walking",
      frames: anims.generateFrameNumbers("player", {
        start: 5,
        end: 11
      }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key:"idle",
      frames: anims.generateFrameNumbers("player", {
        start:0,
        end: 3
      }),
      frameRate: 5,
      repeat: -1
  });

  this.isTouching = true;

  this.keys = this.scene.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    right: Phaser.Input.Keyboard.KeyCodes.D,

  });

  this.scene.input.on('pointerdown', this.handlePointerDown, this);
  this.scene.input.on('pointerup', this.handlePointerUp, this);
}

handlePointerDown(pointer) {
  this.touchData.startX = pointer.x;
  this.touchData.startY = pointer.y;
  this.handleTouchOnDown();

}

handleTouchOnDown(){
  console.log(window.innerWidth)
  if(this.touchData.startX > window.innerWidth/2 ){
  this.moveRight = true;
} else {
  this.moveLeft = true;
}
}

handlePointerUp(pointer) {
  this.touchData.endX = pointer.x;
  this.touchData.endY = pointer.y;

 this.moveRight = false;
 this.moveLeft = false;

  this.handleTouch();
}

handleTouch() {
  const distY = this.touchData.endY - this.touchData.startY;
  this.touchData.endY = this.touchData.startY = 0;
  const tolerance = 10;
  //confirms swipe is a jump
  if (distY < 0 - tolerance) {
    this.jumpUp = true;
    this.jump--;
  }
}


freeze() {
  this.sprite.setStatic(true);
}

update(time, delta) {
  if (this.keys.right.isDown) {
    this.moveRight = true;
  } else if (this.keys.left.isDown) {
    this.moveLeft = true;
  }
  if (Phaser.Input.Keyboard.JustDown(this.keys.up)) {
    this.jumpUp = true;
  }

  if (this.moveRight) {
    this.sprite.setFlipX(false);
    this.sprite.setVelocityX(300,0);
  } else if (this.moveLeft) {
    this.sprite.setFlipX(true);
    this.sprite.setVelocityX(-300,0);
  }else {
    this.sprite.setVelocityX(0,0);
  }

  if (this.jumpUp && this.jump > 0) {
    this.sprite.setVelocity(0,-600);
  }

  if (this.sprite.body.blocked.down) {
    this.jump = 2;
  }

  if (this.isTouching) {
    if (this.sprite.body.velocity.x !== 0) {
      this.sprite.anims.play("walking", true);
    } else {
      this.sprite.anims.play("idle", true);
    }
  } else {
    this.sprite.anims.stop();
    this.sprite.setTexture("player", 10);
  }

  //DAMAGE
  if (this.immuneTime > 0) {
        this.immuneTime -= delta;
        this.immune = true;
    } else {
      this.immune = false;
    }

  this.jumpUp = false;
}

destroy() {}



}
