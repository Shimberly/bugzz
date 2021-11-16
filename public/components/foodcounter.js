export class FoodCounter {
    constructor(relatedScene) {
        this.scene = relatedScene;
        this.cantFood = 1;
        //this.percentage = 100 / this.cantFood;
    }

    create() {
        //let cantFood = Math.floor((Math.random() * 6)) + 5; //Num of leaves in the scene between 4 - 10;

        let leafsType = ['food', 'food2'];
        this.scene.foods = this.scene.physics.add.group({
            //repeat: cantFood
            //collideWorldBounds: true
        });
        for (let index = 0; index < this.cantFood; index++) {
            let numLeafType = Math.floor(Math.random() * 2);
            let leafPosX = Math.floor(Math.random() * 780) + 10;
            let leafPosY = Math.floor(Math.random() * 545) + 50;
            let food = this.scene.foods.create(leafPosX, leafPosY, leafsType[numLeafType]);
            food.setScale(0.4, 0.4);
        }

        this.scene.physics.add.overlap(this.scene.player, this.scene.foods, this.collectFood, null, this);
    }
    collectFood(player, food) {
        food.disableBody(true, true);
        this.scene.catchSample.play();
        this.scene.scoreEvolution++;
        this.scene.evolutionbar.setFrame(this.scene.scoreEvolution);


        if (this.scene.foods.countActive(true) === 0) { //IF THEY EAT ALL

            let posX = Math.floor(Math.random() * 780) + 10;
            let posY = Math.floor(Math.random() * 545) + 50;
            this.scene.tunel = this.scene.physics.add.sprite(posX, posY, 'tunel');
            this.scene.tunel.setScale(0.7, 0.7);
            this.scene.tunel.anims.play('appearTunel', true);
            this.scene.physics.add.overlap(this.scene.player, this.scene.tunel, this.end, null, this);
            /*this.scene.foods.children.iterate(function (child) {
                child.enableBody(true, child.x, child.y, true, true); //RESET FOOD
            });*/

        }
    }
    end() {
        this.scene.endGame(true)
    }
}