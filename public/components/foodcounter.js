export class FoodCounter {
    constructor(relatedScene) {
        this.scene = relatedScene;
    }

    create() {
        let cantFood = Math.floor((Math.random() * 6)) + 5; //Num of leaves in the scene between 4 - 10;
        let leafsType = ['food', 'food2'];


        //console.log('cant: ' + cantFood + ', type: ' + leafsType[numLeafType] + ' , X: ' + leafPosX + ' Y: ' + leafPosY)
        //ESTRELLAS
        this.scene.foods = this.scene.physics.add.group({
            //repeat: cantFood
        });
        for (let index = 0; index < cantFood; index++) {
            let numLeafType = Math.floor(Math.random() * 2);
            let leafPosX = Math.floor(Math.random() * 800);
            let leafPosY = Math.floor(Math.random() * 550) + 50;
            let food = this.scene.foods.create(leafPosX, leafPosY, leafsType[numLeafType]);
            food.setCollideWorldBounds(true);
            food.setScale(0.3, 0.3);
        }

        this.scene.physics.add.overlap(this.scene.player, this.scene.foods, this.collectFood, null, this);
    }
    collectFood(player, food) {
        food.disableBody(true, true);
        this.scene.catchSample.play();
        this.scene.scoreEvolution += 5;
        this.scene.barraText.setText('Evolucion: ' + this.scene.scoreEvolution); //ACTUALIZA BARRA EVOLUCION
        if (this.scene.scoreEvolution === 100) {
            this.scene.endGame(true);
        }

        if (this.scene.foods.countActive(true) === 0) {
            this.scene.foods.children.iterate(function (child) {
                child.enableBody(true, child.x, child.y, true, true); //ACTIVA COMIDA DE NUEVO
            });
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400); //CREAR NUMERO RANDOM
            var bomb = this.scene.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
    }
}


/*
this.scene.foods.children.iterate(function (child) {

    child.x = leafPosX;
    child.y = leafPosY;
    child.setCollideWorldBounds(true);
    child.setScale(0.5, 0.5);
})*/
