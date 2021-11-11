export class Enemies {
    constructor(relatedScene, cant) {
        this.scene = relatedScene;
        this.cantEnemies = cant;
    }

    create() {
        this.scene.spiders = this.scene.physics.add.group();
        //this.scene.spiders.play('moveSpider', true);
        //this.scene.spiders.anims.play('moveSpider', true);
        this.scene.physics.add.collider(this.scene.player, this.scene.spiders, this.hitEnemy, null, this);
        for (let index = 0; index < this.cantEnemies; index++) {
            var x = Phaser.Math.Between(300, 790)
            var y = Phaser.Math.Between(0, 590);
            var spider = this.scene.spiders.create(x, y, 'spider');
            spider.anims.play('moveSpider', true);
            spider.setBounce(1);
            spider.setCollideWorldBounds(true);
            spider.setVelocity(Phaser.Math.Between(100, 300), Phaser.Math.Between(100, 300));
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

}