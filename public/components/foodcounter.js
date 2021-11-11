export class FoodCounter {
    constructor(relatedScene) {
        this.scene = relatedScene;
    }

    create() {
        //let cantFood = Math.floor((Math.random() * 6)) + 5; //Num of leaves in the scene between 4 - 10;
        let cantFood = 11;
        let leafsType = ['food', 'food2'];
        this.scene.foods = this.scene.physics.add.group({
            //repeat: cantFood
        });
        for (let index = 0; index < cantFood; index++) {
            let numLeafType = Math.floor(Math.random() * 2);
            let leafPosX = Math.floor(Math.random() * 800);
            let leafPosY = Math.floor(Math.random() * 545) + 50;
            let food = this.scene.foods.create(leafPosX, leafPosY, leafsType[numLeafType]);
            food.setCollideWorldBounds(true);
            food.setScale(0.3, 0.3);
        }

        this.scene.physics.add.overlap(this.scene.player, this.scene.foods, this.collectFood, null, this);
    }
    collectFood(player, food) {
        food.disableBody(true, true);
        this.scene.catchSample.play();
        this.scene.scoreEvolution++;
        this.scene.evolutionbar.setFrame(this.scene.scoreEvolution);
        if (this.scene.scoreEvolution === 100) {
            this.scene.endGame(true);
        }

        if (this.scene.foods.countActive(true) === 0) { //IF THEY EAT ALL
            this.scene.endGame(true);
            /*this.scene.foods.children.iterate(function (child) {
                child.enableBody(true, child.x, child.y, true, true); //RESET FOOD
            });
            */
        }
    }
}