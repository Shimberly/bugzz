import { LiveCounter } from "../components/livecounter.js";
import { FoodCounter } from "../components/foodcounter.js";
import { Enemies } from "../components/enemies.js";

export class FirstPhase extends Phaser.Scene {
  constructor() {
    super({ key: "firstphase" });
  }
  init() {
    this.scoreEvolution = 0;
    this.liveCounter = new LiveCounter(this, 3);
    this.foodCounter = new FoodCounter(this);
    this.enemies = new Enemies(this, 5);
  }

  preload() {
    this.load.image("background", "public/assets/img/fondo.jpg");
    this.load.image("life", "public/assets/img/life.png");
    this.load.image("food", "public/assets/img/food.png");
    this.load.image("food2", "public/assets/img/food2.png");
    this.load.image("spiderweb", "public/assets/img/spiderweb.png");
    this.load.image("tunelprb", "public/assets/img/tunelprb.png");
    //this.load.spritesheet('fullscreen', 'assets/ui/fullscreen.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet("evolutionbar", "public/assets/img/evolution.png", {
      frameWidth: 150,
      frameHeight: 25,
    });
    this.load.spritesheet("spider", "public/assets/img/spiderbc.png", {
      frameWidth: 73,
      frameHeight: 95,
    });
    this.load.spritesheet("babyplayer", "public/assets/img/babyplayer.png", {
      frameWidth: 39,
      frameHeight: 22,
    });
    this.load.spritesheet("babyplayer2", "public/assets/img/babyplayer2.png", {
      frameWidth: 22,
      frameHeight: 39,
    });
    this.load.spritesheet("tunel", "public/assets/img/tunel.png", {
      frameWidth: 90,
      frameHeight: 60,
    });

    //ADD SOUNDS
    this.load.audio("startgamesound", "public//assets/sounds/startgame.ogg");
    //this.load.audio('impactsound', 'public//assets/sounds/impact.ogg');
    this.load.audio("impactsound", "public//assets/sounds/enemyhit.wav");
    this.load.audio("foodsound", "public//assets/sounds/foodcounter.wav");
    this.load.audio("lifesound", "public/./assets/sounds/earnlife.wav");
    this.load.audio(
      "backgroundsound",
      "public//assets/sounds/backgroundmusic.mp3"
    );
  }

  create() {
    this.background = this.add.image(
      this.sys.game.canvas.width / 2,
      this.sys.game.canvas.height / 2,
      "background"
    );
    this.background.setScale(0.2, 0.2);

    //textotiempo
    this.timeGame = 0;
    var timeTextStyle = { font: "16px Roboto", fill: "#000" }; // stroke: '#000',strokeThickness: 4
    this.txttimegame = this.add.text(
      this.sys.game.canvas.width - 30,
      this.sys.game.canvas.height - 18,
      this.formatTime(this.timeGame),
      timeTextStyle
    );
    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.conteo,
      callbackScope: this,
      loop: true,
    });
    //SONIDO
    this.startGameSound = this.sound.add("startgamesound");
    this.backgroundSound = this.sound.add("backgroundsound");
    this.impactSound = this.sound.add("impactsound");
    this.foodSound = this.sound.add("foodsound");
    this.lifeSound = this.sound.add("lifesound");
    this.startGameSound.play();
    this.backgroundSound.loop = true;
    this.backgroundSound.play();

    //JUGADOR Y TUNEL
    this.player = this.physics.add.sprite(50, 550, "babyplayer");
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.flipX = true;
    this.player.setSize(30, 10, true);
    this.player.setDepth(1);
    this.anims.create({
      key: "moveHor",
      frames: this.anims.generateFrameNumbers("babyplayer", {
        start: 0,
        end: 1,
      }),
      frameRate: 7,
    });
    this.anims.create({
      key: "moveVer",
      frames: this.anims.generateFrameNumbers("babyplayer2", {
        start: 0,
        end: 1,
      }),
      frameRate: 7,
    });
    this.anims.create({
      key: "moveSpider",
      frames: this.anims.generateFrameNumbers("spider", { start: 0, end: 1 }),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: "appearTunel",
      frames: this.anims.generateFrameNumbers("tunel", { start: 2, end: 0 }),
      frameRate: 4,
      repeat: -1,
    });
    //TECLAS
    this.cursors = this.input.keyboard.createCursorKeys();

    //TEXTOS
    this.liveCounter.create(); //CREAR VIDAS
    this.foodCounter.create(); //CREATE FOOD RANDOM
    this.evolutionbar = this.physics.add
      .sprite(10, 5, "evolutionbar")
      .setOrigin(0, 0);
    this.evolutionbar.setScale(1.5, 1.5);
    this.evolutionbar.setFrame(this.scoreEvolution);

    //ENEMIES
    this.enemies.create();
    /*
                //DISPAROS
                this.disparos = this.physics.add.group({
                    key: 'bomb'
                    //maxSize: 100,
                });*/
    this.physics.world.setBoundsCollision(true, true, true, true);
  }
  update(time) {
    this.movTeclas();
    this.input.keyboard.onUpCallback = function (key) {
      if (key.keyCode === Phaser.KeyCode.G) {
        // La tecla G acaba de ser pulsada y soltada. Si se mantuviese la tecla pulsada no pasaría nada.
        this.disparar(player);
      }
    };
    //this.timeGame = time * 0.001;
    //this.txttimegame.setText(Math.round(this.timeGame));
    /*let currentEnemy = this.player;
        this.physics.world.on("worldbounds", function (body) {
            if (body) {
                console.log(body);
                if (body.gameObject.texture.key === 'spider') {
                    if ((config.height - body.position.y) <= body.height) {
                        body.gameObject.disableBody(true, true);
                    }
                }
            }
        });*/
    /*if (!this.physics.world.bounds.contains(currentEnemy.x, currentEnemy.y)) {
    currentEnemy.destroy()
}*/

    /*if (Phaser.Geom.Intersects.RectangleToRectangle(currentEnemy.body, this.physics.world.bounds)) {
            console.log("miau");
        }*/
  }

  onWorldBounds(body) {
    var spider = body.gameObject;
    //var frame = ball.frame.name;

    ball.setFrame(frame);
  }
  salir() {
    console.log("salio");
  }
  disparar(player) {
    let bullet = this.disparos.get(player.x + 17, player.y - 30);
    if (bullet) {
      bullet.setActive(true);
      bullet.setVisible(true);
      bullet.body.setVelocityX(200);
      bullet.body.setVelocityY(-200);
    }
  }
  movTeclas() {
    //ACCIONES DEL TECLADO
    let playerVelocity = 190;
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-playerVelocity);
      this.player.anims.play("moveHor", true);
      this.player.flipX = false; //(Girar la sprite horizontalmente)
      this.player.flipY = false;
      this.player.setSize(30, 10, true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(playerVelocity);
      this.player.anims.play("moveHor", true);
      this.player.flipX = true; //(Girar la sprite horizontalmente)
      this.player.flipY = false;
      this.player.setSize(30, 10, true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-playerVelocity);
      this.player.anims.play("moveVer", true);
      this.player.flipY = false; //(Girar la sprite verticalmente)
      this.player.flipX = false;
      this.player.setSize(10, 30, true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(playerVelocity);
      this.player.anims.play("moveVer", true);
      this.player.flipY = true;
      this.player.flipX = false;
      this.player.setSize(10, 30, true);
    } else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      this.player.anims.stop();
    }
  }

  endGame(completed = false) {
    this.backgroundSound.stop();
    if (!completed) {
      this.scene.start("gameover", { statusGame: 2, timeGame: this.timeGame });
    } else {
      this.scene.start("gameover", { statusGame: 1, timeGame: this.timeGame });
    }
  }
  conteo() {
    this.timeGame += 1;
    this.txttimegame.setText(this.formatTime(this.timeGame));
  }
  formatTime(seconds) {
    // Minutes
    var minutes = Math.floor(seconds / 60);
    // Seconds
    var partInSeconds = seconds % 60;
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2, "0");
    // Returns formated time
    return `${minutes}:${partInSeconds}`;
  }
}
