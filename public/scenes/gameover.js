import { RestartButton } from "../components/restart-button.js";

export class Gameover extends Phaser.Scene {
    constructor() {
        super({ key: 'gameover' });
        this.restartButton = new RestartButton(this);

    }
    init(data) {
        //console.log('init', data);
        this.statusGame = data.statusGame;
    }

    preload() {
        this.restartButton.preload();
        this.load.audio('gamewinsound', '../assets/sounds/gamewin.ogg');
        this.load.audio('gameoversound', '../assets/sounds/gameover.ogg');
    }

    create() {

        this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'theme');
        this.restartButton.create();
        if (this.statusGame) { //WIN GAME
            let styleText = { fontSize: 'bold 80px', fill: '#FFF' }; //boundsAlignH: "center", boundsAlignV: "middle"
            this.add.text(this.sys.game.canvas.width / 2, 250, 'YOU SURVIVE', styleText).setOrigin(0.5);

            this.gameWinSample = this.sound.add('gamewinsound');
            this.gameWinSample.play();
        } else { //GAME OVER
            let styleText = { fontSize: 'bold 80px', fill: '#000' };
            let text = this.add.text(this.sys.game.canvas.width / 2, 250, 'GAME OVER', styleText).setOrigin(0.5);

            this.gameOverSample = this.sound.add('gameoversound');
            this.gameOverSample.play();
        }


    }
}