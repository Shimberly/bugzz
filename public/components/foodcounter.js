export class FoodCounter {
    constructor(relatedScene) {
        this.scene = relatedScene;
        this.cantFood = 11;
        this.percentage = 100 / 11;
        this.leafsType = ['food', 'food2'];

    }

    create() {
        //let cantFood = Math.floor((Math.random() * 6)) + 5; //Num of leaves in the scene between 4 - 10;
        this.scene.foods = this.scene.physics.add.group({
            //repeat: cantFood
            //collideWorldBounds: true
        });
        this.createLeaves();

        this.scene.physics.add.overlap(this.scene.player, this.scene.foods, this.collectFood, null, this);
    }
    collectFood(player, food) {
        food.disableBody(true, true);
        this.scene.foodSound.play();
        this.scene.scoreEvolution++;
        this.scene.evolutionbar.setFrame(this.scene.scoreEvolution);
        this.scene.enemies.createEnemy();
        if (this.scene.scoreEvolution >= this.cantFood) { //TUNEL APPEAR
            let posX = Math.floor(Math.random() * 780) + 15;
            let posY = Math.floor(Math.random() * 545) + 50;
            this.scene.tunel = this.scene.physics.add.sprite(posX, posY, 'tunel');
            this.scene.tunel.setScale(0.9, 0.9);
            this.scene.tunel.anims.play('appearTunel', true);
            this.scene.physics.add.overlap(this.scene.player, this.scene.tunel, this.end, null, this);
        } else if (this.scene.foods.countActive(true) === 0) { //IF THEY EAT ALL
            this.createLeaves();
        }
        if (this.scene.liveCounter.lifes < 3) {

            this.scene.liveCounter.createHearts();
        }
    }

    end() {
        this.scene.endGame(true)
    }
    createLeaves() {
        let cantFood = Math.floor((Math.random() * 2)) + 1; //Num of leaves in the scene between 1 - 3;
        for (let index = 0; index < cantFood; index++) {
            let numLeafType = Math.floor(Math.random() * 2);
            let leafPosX = Math.floor(Math.random() * 780) + 10;
            let leafPosY = Math.floor(Math.random() * 545) + 50;
            let food = this.scene.foods.create(leafPosX, leafPosY, this.leafsType[numLeafType]);
            food.setScale(0.4, 0.4);
        }
    }
}