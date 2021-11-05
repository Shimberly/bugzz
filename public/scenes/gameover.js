import { RestartButton } from "../components/restart-button.js";

export class Gameover extends Phaser.Scene {
    constructor() {
        super({ key: 'gameover' });
        this.restartButton = new RestartButton(this);
    }

    preload() {
        this.load.image('background', '../assets/img/fondo.jpg');
        this.restartButton.preload();

        this.load.audio('gameoversound', '../assets/sounds/gameover.ogg');
    }

    create() {
        this.add.image(410, 250, 'background');
        this.restartButton.create();
        //this.gameoverImage = this.add.image(400, 90, 'gameover');
        this.add.text(100, 90, 'OHHH PERDISTE :(', { fontSize: '60px', fill: '#fff' });

        this.gameOverSample = this.sound.add('gameoversound');
        this.gameOverSample.play();
    }
}