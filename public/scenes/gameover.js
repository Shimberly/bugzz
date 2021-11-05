import { RestartButton } from "../components/restart-button.js";

export class Gameover extends Phaser.Scene {
    constructor() {
        super({ key: 'gameover' });
        this.restartButton = new RestartButton(this);
    }

    preload() {
        this.load.image('fondo', '../assets/img/fondo.jpg');
        this.restartButton.preload();
    }

    create() {
        this.add.image(410, 250, 'fondo');
        this.restartButton.create();
        //this.gameoverImage = this.add.image(400, 90, 'gameover');
        this.add.text(100, 90, 'OHHH PERDISTE :(', { fontSize: '60px', fill: '#fff' });
    }
}