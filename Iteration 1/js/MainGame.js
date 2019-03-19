var config = {
  type: Phaser.AUTO,
  width: 900,
  height: 1600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        y: 750
      }
    }
    },

  pixelArt: true,

    scene: [Level1, Level2A, Level2B, Level2C, Level2D, Level3A, Level3B],

    callbacks: {
        postBoot: function () {
            resize();
        }
    }
};

var game = new Phaser.Game(config);
window.addEventListener("resize", resize, false);

function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;

        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";

}
