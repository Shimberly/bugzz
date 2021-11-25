export class LiveCounter {
    constructor(scene, initialLives) {
        this.scene = scene;
        this.initialLives = initialLives;
        this.lifes = 3;
        this.lastLife;
    }
    preload() {

    }

    create() {
        let displacement = 50;
        let firstPosition = 800 - ((this.initialLives) * displacement);
        this.liveImages = this.scene.physics.add.staticGroup({
            setScale: { x: 0.4, y: 0.4 },
            key: 'life',
            frameQuantity: this.initialLives,
            gridAlign: {
                width: this.initialLives,
                height: 1,
                cellWidth: displacement,
                cellHeight: 30,
                x: firstPosition,
                y: 2
            }
        });
        this.scene.hearts = this.scene.physics.add.group({
        });
        this.scene.physics.add.overlap(this.scene.player, this.scene.hearts, this.collectHeart, null, this);
    }
    liveLost() {
        if (this.lifes === 0) {
            this.scene.endGame();
            return false;
        } else {
            let currentLiveLost = this.liveImages.getFirstAlive();
            this.lastLife = currentLiveLost;
            currentLiveLost.disableBody(true, true);
            this.lifes--;
            return true;
        }

    }
    createHearts() {
        if (this.scene.hearts.countActive(true) === 0) {
            let posX = Math.floor(Math.random() * 780) + 10;
            let posY = Math.floor(Math.random() * 545) + 50;
            let heart = this.scene.hearts.create(posX, posY, 'life');
            heart.setScale(0.3, 0.3);
        }

    }
    collectHeart(player, heart) {
        this.lifes++;
        this.scene.lifeSound.play();
        /*if (this.lifes === 2) {
            this.liveImages[1].enableBody(true, this.liveImages[1].x, this.liveImages[1].y, true, true)
        }
        if (this.lifes === 3) {
            this.liveImages[2].enableBody(true, this.liveImages[1].x, this.liveImages[1].y, true, true)
        }*/
        //let currentLiveLost = this.liveImages.getFirstDead();
        this.lastLife.enableBody(true, this.lastLife.x, this.lastLife.y, true, true);
        heart.disableBody(true, true);
        /*this.liveImages.children.iterate(function (child, i) {
            child.enableBody(true, child.x, child.y, true, true); //RESET FOOD

        });*/
    }
}