class Level1 extends BaseScene {
  constructor(){
    super("Level1");
    this.tileDataKey = 'Level1';
    this.tileDataSource = 'assets/maps/level1.json';
    this.greedMax = 6;
    this.sanityMax = 4;
  }

  preload(){
    super.preload();
  }

  create(){
    super.create();
      this.greed = 0;
      this.sanity = 0;

  }

  update(time, delta){
    super.update(time, delta);
  }
}
