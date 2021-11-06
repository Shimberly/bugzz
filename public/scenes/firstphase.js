import { LiveCounter } from "../components/livecounter.js";

export class FirstPhase extends Phaser.Scene {
    constructor() {
        super({ key: 'firstphase' });
    }
    init() {
        this.scoreEvolution = 0;
        this.liveCounter = new LiveCounter(this, 3);
    }

    preload() {
        //ADD IMG
        this.load.image('background', 'assets/img/fondo.jpg');
        this.load.image('bomb', 'assets/img/bomb.png');
        this.load.image('life', 'assets/img/life.png');
        this.load.image('food', 'assets/img/food.png');
        this.load.image('food2', 'assets/img/food2.png');
        //this.load.spritesheet('fullscreen', 'assets/ui/fullscreen.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('babyplayer',
            'assets/img/babyplayer.png',
            { frameWidth: 75, frameHeight: 30 }
        );
        //ADD SOUNDS
        this.load.audio('startgamesound', '../assets/sounds/startgame.ogg');
        this.load.audio('impactsound', '../assets/sounds/impact.ogg');
        this.load.audio('catchsound', '../assets/sounds/catch.ogg');
    }

    create() {
        //this.add.image(0, 0, 'fondo').setOrigin(0, 0);

        this.background = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'background');
        this.background.setScale(0.2, 0.2);
        this.food2 = this.add.image(200, 200, 'food2');
        this.food2.setScale(0.5, 0.5);
        //SONIDO
        this.startGameSample = this.sound.add('startgamesound');
        this.impactSample = this.sound.add('impactsound');
        this.catchSample = this.sound.add('catchsound');
        this.startGameSample.play();
        //JUGADOR
        this.player = this.physics.add.sprite(100, 450, 'babyplayer');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('babyplayer', { start: 0, end: 3 }),
            frameRate: 7
        });
        //TECLAS
        this.cursors = this.input.keyboard.createCursorKeys();

        //ESTRELLAS
        this.foods = this.physics.add.group({
            key: 'food',
            repeat: 3,
            setXY: { x: 12, y: 10, stepX: 50, stepY: 30 }
        });
        this.foods.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            child.setCollideWorldBounds(true);
            child.setScale(0.5, 0.5);
        })
        this.physics.add.overlap(this.player, this.foods, this.collectFood, null, this);

        //TEXTOS
        this.barraText = this.add.text(16, 16, 'Evolucion: ' + this.scoreEvolution, { fontSize: '32px', fill: '#000' });
        this.liveCounter.create();

        //BOMBAS
        this.bombs = this.physics.add.group();

        this.physics.add.collider(this.player, this.bombs, this.hitbomb, null, this);

        //DISPAROS
        this.disparos = this.physics.add.group({
            key: 'bomb'
            //maxSize: 100,
        });

    }
    update() {
        this.movTeclas();
        this.input.keyboard.onUpCallback = function (key) {
            if (key.keyCode === Phaser.KeyCode.G) {
                // La tecla G acaba de ser pulsada y soltada. Si se mantuviese la tecla pulsada no pasaría nada.
                this.disparar(player);
            }
        }
    }

    collectFood(player, food) {
        food.disableBody(true, true);
        this.catchSample.play();
        this.scoreEvolution += 5;
        this.barraText.setText('Evolucion: ' + this.scoreEvolution); //ACTUALIZA BARRA EVOLUCION
        if (this.scoreEvolution === 100) {
            this.endGame(true);
        }

        if (this.foods.countActive(true) === 0) {
            this.foods.children.iterate(function (child) {
                child.enableBody(true, child.x, child.y, true, true); //ACTIVA COMIDA DE NUEVO
            });
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400); //CREAR NUMERO RANDOM
            var bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
    }
    hitbomb(player, bomb) {
        this.lifes--;
        this.impactSample.play();
        bomb.disableBody(true, true);
        let gameNotFinished = this.liveCounter.liveLost();
        /*if (!gameNotFinished) {
            //this.setInitialPlatformState();
        }*/

    }
    disparar(player) {
        let bullet = this.disparos.get(player.x + 17, player.y - 30);
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.setVelocityX(200);
            bullet.body.setVelocityY(-200);
            //console.log('disparo');
        }
    }
    movTeclas() { //ACCIONES DEL TECLADO
        let playerVelocity = 160;
        if (this.cursors.up.isDown && this.cursors.right.isDown) {
            this.player.setVelocityY(-playerVelocity);
            this.player.setVelocityX(playerVelocity);
            this.player.anims.play('move', true);
            this.player.flipX = true; //(Girar la sprite horizontalmente)
        }
        if (this.cursors.down.isDown && this.cursors.right.isDown) {
            this.player.setVelocityY(playerVelocity);
            this.player.setVelocityX(playerVelocity);
            this.player.anims.play('move', true);
            this.player.flipX = true; //(Girar la sprite horizontalmente)
        }
        if (this.cursors.up.isDown && this.cursors.left.isDown) {
            this.player.setVelocityY(-playerVelocity);
            this.player.setVelocityX(-playerVelocity);
            this.player.anims.play('move', true);
            this.player.flipX = false; //(Girar la sprite horizontalmente)
        }
        if (this.cursors.down.isDown && this.cursors.left.isDown) {
            this.player.setVelocityY(playerVelocity);
            this.player.setVelocityX(-playerVelocity);
            this.player.anims.play('move', true);
            this.player.flipX = false; //(Girar la sprite horizontalmente)

        }
        else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-playerVelocity);
            this.player.anims.play('move', true);
            this.player.flipX = false; //(Girar la sprite horizontalmente)
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(playerVelocity);
            this.player.anims.play('move', true);
            this.player.flipX = true; //(Girar la sprite horizontalmente)
        }
        else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-playerVelocity);
            this.player.anims.play('move', true);
        }
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(playerVelocity);
            this.player.anims.play('move', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            this.player.anims.stop();
        }

    }

    endGame(completed = false) {
        if (!completed) {
            this.scene.start('gameover');
        } else {
            this.scene.start('gamewin');
        }
    }
}
