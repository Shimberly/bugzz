export class Enemies {

    constructor(relatedScene, cant) {
        this.scene = relatedScene;
        this.cantEnemies = cant;
    }
    init() {
        this.direction = Phaser.Math.Between(0, 3); //UP
        //let moveEvent: Phaser.Time.TimerEvent;
    }
    create() {
        this.scene.spiders = this.scene.physics.add.group({
            collideWorldBounds: true,
            bounceX: 1,
            bounceY: 1
        });
        //this.scene.spiders.play('moveSpider', true);
        //this.scene.spiders.anims.play('moveSpider', true);
        this.scene.physics.add.collider(this.scene.player, this.scene.spiders, this.hitEnemy, null, this);
        for (let index = 0; index < this.cantEnemies; index++) {
            var x = Phaser.Math.Between(100, 790)
            var y = Phaser.Math.Between(0, 500);
            var spider = this.scene.spiders.create(x, y, 'spider');
            spider.anims.play('moveSpider', true);
            let direction = Phaser.Math.Between(0, 3);
            let speed = Phaser.Math.Between(100, 300);
            switch (direction) {
                case 0: //UP
                    spider.setVelocity(0, -speed);
                    break

                case 1: // DOWN:
                    spider.setVelocity(0, speed)
                    spider.flipY = true;
                    break

                case 2: // LEFT
                    spider.setVelocity(-speed, 0);
                    spider.angle = -90;
                    break

                case 3: //RIGHT
                    spider.setVelocity(speed, 0);
                    spider.angle = 90;
                    break
            }
            //spider.setVelocity(Phaser.Math.Between(100, 300), Phaser.Math.Between(100, 300));
            spider.setScale(0.8, 0.8);
        }
    }

    hitEnemy(player, spider) {
        this.scene.impactSample.play();
        spider.disableBody(true, true);
        let gameNotFinished = this.scene.liveCounter.liveLost();
        /*if (!gameNotFinished) {
            //this.setInitialPlatformState();
        }*/

    }
    randomDirection(actualDirection) {
        let newDirection = Phaser.Math.Between(0, 3)
        while (newDirection === actualDirection) {
            newDirection = Phaser.Math.Between(0, 3)
        }

        return newDirection
    }

    /* moverEnemigos() {
 
         let enemyVelocity = Phaser.Math.Between(100, 300);
         this.direction = this.randomDirection(this.direction);
         switch (this.direction) {
             case 0: //UP
                 this.setVelocity(0, -speed)
                 break
 
             case 1: // DOWN:
                 this.setVelocity(0, speed)
                 break
 
             case 2: // LEFT
                 this.setVelocity(-speed, 0)
                 break
 
             case 3: //RIGHT
                 this.setVelocity(speed, 0)
                 break
         }
     }*/
}

/*
Phaser.Actions.RandomRectangle(group.getChildren(), this.cameras.main);

    Phaser.Actions.Call(group.getChildren(), function (ball) {
        ball.body.onWorldBounds = true;
    });

    this.physics.world.on('worldbounds', onWorldBounds);
}

function onWorldBounds (body)
{
    var ball = body.gameObject;
    var frame = ball.frame.name;

    frame += 1;
    frame %= 5;

    ball.setFrame(frame);
}
*/
/*
Enemy = function () {
    this.x = game.world.randomX;
    this.y = game.world.randomY;
    this.minSpeed = -75;
    this.maxSpeed = 75;
    this.vx = Math.random() * (this.maxSpeed - this.minSpeed + 1) - this.minSpeed;
    this.vy = Math.random() * (this.maxSpeed - this.minSpeed + 1) - this.minSpeed;
    this.enemySprite = game.add.sprite(this.x, this.y, "enemy");
    this.enemySprite.anchor.setTo(0.5, 0.5);
    this.enemySprite.body.collideWorldBounds = true;
    this.enemySprite.body.bounce.setTo(1, 1);
    this.enemySprite.body.velocity.x = this.vx;
    this.enemySprite.body.velocity.y = this.vy;
    this.enemySprite.body.immovable = true;
}
var game = new Phaser.Game(600, 400, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var numOfEnemies = 10;
var player; var enemies;
function preload() {
    game.load.image('enemy', 'assets/ball.png');
    game.load.spritesheet("player", "assets/player.png", 20, 20, 2);
}
function create() {
    game.stage.backgroundColor = 0x8C8C8C;
    player = game.add.sprite(100, 100, "player");
    player.name = "Player";
    player.animations.add("pulse");
    player.animations.play("pulse", 20, true);
    player.anchor.setTo(0.5, 0.5); enemies = [];
    for (var i = 0; i < numOfEnemies; i++) {
        enemies.push(new Enemy());
    }
}
function update() {
    Player.x = game.input.x; player.y = game.input.y;
    for (var i = 0; i < numOfEnemies; i++) {
        game.physics.collide(player, enemies[i].enemySprite, killPlayer, null, this)
    }
}
function killPlayer() {
    console.log('You Died');
}*/