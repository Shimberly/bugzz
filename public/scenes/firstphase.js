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
        //this.load.setBaseURL('http://labs.phaser.io');

        //ADD IMG
        this.load.image('fondo', 'assets/img/fondo.jpg');
        this.load.image('star', 'assets/img/star.png');
        this.load.image('bomb', 'assets/img/bomb.png');
        this.load.image('heart', 'assets/img/life.png');
        //this.load.spritesheet('fullscreen', 'assets/ui/fullscreen.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player',
            'assets/img/player.png',
            { frameWidth: 32, frameHeight: 48 }
        );
        //ADD SOUNDS
        this.load.audio('startgamesound', '../assets/sounds/startgame.ogg');
        this.load.audio('impactsound', '../assets/sounds/impact.ogg');
        this.load.audio('catchsound', '../assets/sounds/catch.ogg');
    }

    create() {
        this.add.image(0, 0, 'fondo').setOrigin(0, 0);
        //SONIDO
        this.startGameSample = this.sound.add('startgamesound');
        this.impactSample = this.sound.add('impactsound');
        this.catchSample = this.sound.add('catchsound');
        this.startGameSample.play();
        //JUGADOR
        this.player = this.physics.add.sprite(100, 450, 'player');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'player', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        //TECLAS
        this.cursors = this.input.keyboard.createCursorKeys();

        //ESTRELLAS
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 3,
            setXY: { x: 12, y: 10, stepX: 50, stepY: 30 }
        });
        this.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            child.setCollideWorldBounds(true);
        })
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        //TEXTOS
        this.barraText = this.add.text(16, 16, 'Evolucion: ' + this.scoreEvolution, { fontSize: '32px', fill: '#000' });
        //this.vidaText = this.add.text(300, 16, 'Vidas: ' + this.lifes, { fontSize: '32px', fill: '#000' });
        this.liveCounter.create();

        //BOMBAS
        this.bombs = this.physics.add.group();

        this.physics.add.collider(this.player, this.bombs, this.hitbomb, null, this);

        //DISPAROS
        this.disparos = this.physics.add.group({
            key: 'bomb'
            //maxSize: 100,
        });

        //PANTALLA COMPLETA
        /*var button = this.add.image(800 - 16, 16, 'fullscreen', 0).setOrigin(1, 0).setInteractive();
    
        button.on('pointerup', function () {
    
            if (this.scale.isFullscreen) {
                button.setFrame(0);
    
                this.scale.stopFullscreen();
            }
            else {
                button.setFrame(1);
    
                this.scale.startFullscreen();
            }
        }, this);*/
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


    collectStar(player, star) {
        star.disableBody(true, true);
        this.catchSample.play();
        this.scoreEvolution += 5;
        this.barraText.setText('Evolucion: ' + this.scoreEvolution); //ACTUALIZA BARRA EVOLUCION
        if (this.scoreEvolution === 100) {
            this.endGame(true);
        }

        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate(function (child) {
                child.enableBody(true, child.x, child.y, true, true); //ACTIVA ESTRELLAS DE NUEVO
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
        if (!gameNotFinished) {
            //this.setInitialPlatformState();
        }
        /*this.vidaText.setText('Vidas: ' + this.lifes);
        if (this.lifes === 0) {
            /*this.physics.pause();
            player.setTint(0xff0000);
            player.anims.play('turn');
            this.endGame();
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
            this.player.anims.play('right', true);
        }
        if (this.cursors.down.isDown && this.cursors.right.isDown) {
            this.player.setVelocityY(playerVelocity);
            this.player.setVelocityX(playerVelocity);
            this.player.anims.play('right', true);
        }
        if (this.cursors.up.isDown && this.cursors.left.isDown) {
            this.player.setVelocityY(-playerVelocity);
            this.player.setVelocityX(-playerVelocity);
            this.player.anims.play('left', true);
        }
        if (this.cursors.down.isDown && this.cursors.left.isDown) {
            this.player.setVelocityY(playerVelocity);
            this.player.setVelocityX(-playerVelocity);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-playerVelocity);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(playerVelocity);
            this.player.anims.play('right', true);
        }
        else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-playerVelocity);
        }
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(playerVelocity);
        }
        else {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            this.player.anims.play('turn');
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
//this.doggy50.setOrigin(0,0);  CAMBIAR POSICION
/*this.doggy50.flipX = true; (Girar la sprite horizontalmente).
this.doggy50.flipY = true; (Girar la sprite verticalmente).
this.doggy50.setVisible(0); (0, ocultar sprite, 1 mostrar sprite).
this.doggy50.setScale(scalaX,scalaY);(Escalar sprite)
this.doggy50.setAlpha(1); (Transparencia)
this.doggy50.setTint(color en hexadecimal); (solo funciona con WebGL)
this.doggy50.x = numero; (Posición en la escena)
this.doggy50.y = numero; (Posición en la escena)
this.doggy50.angle = 0; (Giro del sprite en grados).
this.doggy50.setDepth(0); (Profundidad de los sprites, de 0 en adelante).*/