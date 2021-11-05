var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#ffffff',
    physics: {
        default: 'arcade',
        arcade: {
            fps: 60,
            gravity: { y: 0 }, //300
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

//game.scene.add('GameScene', GameScene);
//game.scene.add('TitleScene', PreloadScene);
var cursors, player, stars, bombs;
var disparos;
var score = 0;
var scoreText;
var gameOver = false;
var game = new Phaser.Game(config);

function preload() {
    //this.load.setBaseURL('http://labs.phaser.io');

    //AGREGAR IMAGENES
    this.load.image('fondo', 'assets/img/fondo.jpg');
    this.load.image('star', 'assets/img/star.png');
    this.load.image('bomb', 'assets/img/bomb.png');
    this.load.spritesheet('player',
        'assets/img/player.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create() {
    this.add.image(0, 0, 'fondo').setOrigin(0, 0);

    //JUGADOR
    player = this.physics.add.sprite(100, 450, 'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

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
    cursors = this.input.keyboard.createCursorKeys();

    //ESTRELLAS
    stars = this.physics.add.group({
        key: 'star',
        repeat: 8,
        setXY: { x: 12, y: 10, stepX: 50, stepY: 30 }
    });
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setCollideWorldBounds(true);
    })
    this.physics.add.overlap(player, stars, collectStar, null, this);

    //TEXTO SCORE
    scoreText = this.add.text(16, 16, 'score:0', { fontSize: '32px', fill: '#000' });

    //BOMBAS
    bombs = this.physics.add.group();

    this.physics.add.collider(player, bombs, hitbomb, null, this);

    //DISPAROS
    disparos = this.physics.add.group({
        key: 'bomb',
        //maxSize: 100,
    });
}
function update() {
    movTeclas(this);
    game.input.keyboard.onUpCallback = function (key) {
        if (key.keyCode === Phaser.KeyCode.G) {
            // La tecla G acaba de ser pulsada y soltada. Si se mantuviese la tecla pulsada no pasaría nada.
            disparar(player);
        }
    }
}
function collectStar(player, star) {
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score); //ACTUALIZA SCORE

    if (stars.countActive(true) === 0) {
        stars.children.iterate(function (child) {
            child.enableBody(true, child.x, child.y, true, true); //ACTIVA ESTRELLAS DE NUEVO
        });
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400); //CREAR NUMERO RANDOM
        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
}
function hitbomb(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
}
function disparar(player) {
    let bullet = this.disparos.get(player.x + 17, player.y - 30);
    if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.body.setVelocityX(200);
        bullet.body.setVelocityY(-200);
        console.log('disparo');
    }
}
function movTeclas() { //ACCIONES DEL TECLADO
    let playerVelocity = 160;
    if (cursors.up.isDown && cursors.right.isDown) {
        player.setVelocityY(-playerVelocity);
        player.setVelocityX(playerVelocity);
        player.anims.play('right', true);
    }
    if (cursors.down.isDown && cursors.right.isDown) {
        player.setVelocityY(playerVelocity);
        player.setVelocityX(playerVelocity);
        player.anims.play('right', true);
    }
    if (cursors.up.isDown && cursors.left.isDown) {
        player.setVelocityY(-playerVelocity);
        player.setVelocityX(-playerVelocity);
        player.anims.play('left', true);
    }
    if (cursors.down.isDown && cursors.left.isDown) {
        player.setVelocityY(playerVelocity);
        player.setVelocityX(-playerVelocity);
        player.anims.play('left', true);
    }
    else if (cursors.left.isDown) {
        player.setVelocityX(-playerVelocity);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(playerVelocity);
        player.anims.play('right', true);
    }
    else if (cursors.up.isDown) {
        player.setVelocityY(-playerVelocity);
    }
    else if (cursors.down.isDown) {
        player.setVelocityY(playerVelocity);
    }
    else {
        player.setVelocityX(0);
        player.setVelocityY(0);
        player.anims.play('turn');
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