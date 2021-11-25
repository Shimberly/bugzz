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

        this.scene.overlapFood = this.scene.physics.add.overlap(this.scene.player, this.scene.foods, this.collectFood, null, this);
    }
    collectFood(player, food) {
        food.disableBody(true, true);
        this.scene.foodSound.play();
        this.scene.scoreEvolution++;
        this.scene.evolutionbar.setFrame(this.scene.scoreEvolution);
        this.scene.enemies.createEnemy();
        this.scene.enemies.resetDirectionEnemies();
        player.setTint(0x00ff00);
        this.scene.colliderEnemies.active = false;
        this.scene.overlapFood.active = false;
        this.scene.time.addEvent({ delay: 1500, callback: this.clearPlayer, args: [player], callbackScope: this, loop: false });
        if (this.scene.scoreEvolution >= this.cantFood) { //TUNEL APPEAR
            let posX = Math.floor(Math.random() * 750) + 30;
            let posY = Math.floor(Math.random() * 520) + 50;
            this.scene.tunel = this.scene.physics.add.sprite(posX, posY, 'tunel');
            this.scene.tunel.setScale(0.8, 0.8);
            this.scene.tunel.body.setSize(30, 33, true);
            this.scene.tunel.anims.play('appearTunel', true);
            this.scene.physics.add.overlap(this.scene.player, this.scene.tunel, this.end, null, this);
        } else if (this.scene.foods.countActive(true) === 0) { //IF THEY EAT ALL
            this.createLeaves();
        }
        if (this.scene.liveCounter.lifes < 3) {

            this.scene.liveCounter.createHearts();
        }
    }
    clearPlayer(player) { //AFTER SECONDS DO THIS
        player.clearTint();
        this.scene.colliderEnemies.active = true;
        this.scene.overlapFood.active = true;
    }
    end() {
        this.scene.endGame(true)
    }
    createLeaves() {
        let rndFood = 0;
        if (this.scene.scoreEvolution > this.cantFood - 2) {
            rndFood = 1;
        } else {
            rndFood = Math.floor((Math.random() * 2)) + 1; //Num of leaves in the scene between 1 - 2;
        }

        for (let index = 0; index < rndFood; index++) {
            let numLeafType = Math.floor(Math.random() * 2);
            let leafPosX = Math.floor(Math.random() * 780) + 10;
            let leafPosY = Math.floor(Math.random() * 545) + 50;
            let food = this.scene.foods.create(leafPosX, leafPosY, this.leafsType[numLeafType]);
            food.setScale(0.4, 0.4);
        }
    }
}