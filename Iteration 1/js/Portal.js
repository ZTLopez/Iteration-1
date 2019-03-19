class Portal{
  constructor(x,y,scene){
    this.scene = scene;
    this.sprite = this.scene.physics.add
    .sprite(x,y,"portal",0)
    .setScale(2)
    this.sprite.label = 'portal';

    const anims = scene.anims;

    anims.create({
      key: "glow",
      frames: anims.generateFrameNumbers("portal", {
        start: 0,
        end: 3
      }),
      frameRate: 5,
      repeat: -1
    });

    this.sprite.anims.play("glow",true);
  }
}
