class Level2D extends BaseScene {
  constructor(){
    super("Level2D");
    this.tileDataKey = 'Level2D';
    this.tileDataSource = 'assets/maps/level2D.json';
    this.greedMax = 12;
    this.sanityMax = 8;
  }

  preload(){
    super.preload();
  }

  create(){
    super.create();
      
  }

  update(time, delta){
    super.update(time, delta);
  }
}
