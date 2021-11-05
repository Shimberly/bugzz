import { RestartButton } from "../components/restart-button.js";

export class Gamewin extends Phaser.Scene {
    constructor() {
        super({ key: 'gamewin' });
        this.restartButton = new RestartButton(this);
    }

    preload() {
        this.load.image('background', '../assets/img/fondo.jpg');
        this.restartButton.preload();

        this.load.audio('gamewinsound', '../assets/sounds/gamewin.ogg');
    }

    create() {
        this.add.image(410, 250, 'background');
        this.restartButton.create();
        //this.congratsImage = this.add.image(400, 90, 'gamewin');
        this.add.text(100, 90, 'WII GANASTE :3', { fontSize: '60px', fill: '#fff' });

        this.gameWinSample = this.sound.add('gamewinsound');
        this.gameWinSample.play();
    }
}