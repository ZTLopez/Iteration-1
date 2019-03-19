class BaseScene extends Phaser.Scene {
    constructor(id) {
        super(id);
        this.scene = this;
        this.id = id;
        this.tileDataKey;
        this.tileDataSource;
        this.greed = 0;
        this.sanity = 0;
        this.greedMax;
        this.sanityMax;
        this.enemies = [];


    }


    init(data) {
        this.greed = data.greed;
        this.sanity = data.sanity;
    }

    preload() {
        this.load.tilemapTiledJSON(this.tileDataKey, this.tileDataSource);
        this.load.image("tilesheet", "assets/maps/platformPack_tilesheet.png");
        this.load.spritesheet("squirrel", "assets/sprites/squirrels.png", { frameWidth: 64, frameHeight: 64 });
        //this.load.spritesheet("bat", "assets/sprites/bat.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("portal", "assets/maps/portal.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("coin", "assets/sprites/coin.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("player", "assets/sprites/BoBunny.png", { frameWidth: 48, frameHeight: 64 });

    }

    create() {

        const map = this.make.tilemap({ key: this.tileDataKey });
        const tileset = map.addTilesetImage("tilesheet");
        this.backgroundimg = map.createStaticLayer("backgroundimg", tileset, 0, 0);
        this.background = map.createStaticLayer("background", tileset, 0, 0);
        this.ground = map.createStaticLayer("collision", tileset, 0, 0);
        this.ground.setCollisionByProperty({ collides: true });


        map.findObject("object", this.SpawnPlayer, this);
        map.findObject("object", this.Spawn, this);

        this.physics.add.collider(this.player.sprite, this.ground);
        this.physics.add.collider(this.portal.sprite, this.ground);


        this.cameras.main.setZoom(2.1);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5).set;


        this.physics.add.overlap(this.player.sprite, this.portal.sprite, this.handleCollision , null , this);

        console.log(this.scene.greed)
        console.log(this.scene.sanity)
    }

    SpawnPlayer(object) {
        if (object.type === "Spawn") {
            if (object.name === "playerSpawn") {
                this.player = new Player(object.x, object.y, this);
            }
        }
    }

    Spawn(object) {
        this.coin = []
        if (object.type === "Spawn") {
            if (object.name === "coin") {
                this.coin.push(new Coin(object.x, object.y, this));

            }
            if (object.name === "LevelEnd") {
                this.portal = new Portal(object.x, object.y, this);

            }
        }
        if (object.type === "Enemy") {
            if (object.name === "Squirrel") {
                var squirrel = new Enemy(object.x, object.y, this);
                this.enemies.push(squirrel);
                squirrel.create();
            }

        }
    }

    handleCollision(object1, object2) {

        console.log(this.id);
        if ((this.greed < this.greedMax/2 && this.sanity < this.sanityMax/2) && (this.id === "Level1")) {
            //pure level 2
            this.scene.start("Level2A", { greed: this.greed , sanity: this.sanity });
        }
        else if ((this.greed >= this.greedMax/2 && this.sanity < this.sanityMax) && (this.id === "Level1")) {
          //greed level 2
            this.scene.start("Level2B", { greed: this.greed , sanity: this.sanity });
        }
        else if ((this.greed < this.greedMax && this.sanity >= this.sanityMax/2) && (this.id === "Level1")) {
          //insanity level 2
            this.scene.start("Level2C", { greed: this.greed , sanity: this.sanity });
        }
        else if (( this.greed >= this.greedMax/2 && this.sanity >= this.sanityMax/2) && (this.id === "Level1")) {
          //evil level 2
            this.scene.start("Level2D", { greed: this.greed , sanity: this.sanity});
        }
        else if ((this.greed < this.greedMax/2) && (this.id === "Level2A" || this.id === "Level2B")) {
            //pure level 3
            this.scene.start("Level3B", { greed: this.greed , sanity: this.sanity });
        }
        else if ((this.greed > this.greedMax/2) && (this.id === "Level2A" || this.id === "Level2B")) {
            //greed level 3
            this.scene.start("Level3A", { greed: this.greed , sanity: this.sanity });
        }
    }





    resetTouching() {
        this.player.isTouching = false;
    }

    update(time, delta) {
        this.player.update(time, delta);
        if (this.enemies) {
            for (var i = 0; i < this.enemies.length; i++) {
                this.enemies[i].update(time,delta);
            }
        }
    }


}
