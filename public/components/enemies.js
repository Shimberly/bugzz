export class Enemies {
    constructor(relatedScene, cant) {
        this.scene = relatedScene;
        this.cantEnemies = cant;
    }

    create() {
        this.scene.bombs = this.scene.physics.add.group();
        this.scene.physics.add.collider(this.scene.player, this.scene.bombs, this.hitbomb, null, this);
        for (let index = 0; index < this.cantEnemies; index++) {
            var x = (this.scene.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400); //CREAR NUMERO RANDOM
            var y = (this.scene.player.y < 400) ? Phaser.Math.Between(300, 600) : Phaser.Math.Between(0, 300); //CREAR NUMERO RANDOM
            var bomb = this.scene.bombs.create(x, y, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(100, 300), Phaser.Math.Between(100, 300));
        }

    }

    hitbomb(player, bomb) {
        this.scene.impactSample.play();
        bomb.disableBody(true, true);
        let gameNotFinished = this.scene.liveCounter.liveLost();
        /*if (!gameNotFinished) {
            //this.setInitialPlatformState();
        }*/

    }

}