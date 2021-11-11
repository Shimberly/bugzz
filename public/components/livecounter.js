export class LiveCounter {
    constructor(scene, initialLives) {
        this.relatedScene = scene;
        this.initialLives = initialLives;
    }
    preload() {

    }

    create() {
        let displacement = 50;
        let firstPosition = 800 - ((this.initialLives) * displacement);
        this.liveImages = this.relatedScene.physics.add.staticGroup({
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
    }
    liveLost() {
        if (this.liveImages.countActive() == 1) {
            this.relatedScene.endGame();
            return false;
        }
        let currentLiveLost = this.liveImages.getFirstAlive();
        currentLiveLost.disableBody(true, true);
        return true;
    }
}