import { RestartButton } from "../components/restart-button.js";

export class Gameover extends Phaser.Scene {
    constructor() {
        super({ key: 'gameover' });

    }
    init(data) {
        //console.log('init', data);
        this.statusGame = data.statusGame;
        this.restartButton = new RestartButton(this, this.statusGame);
    }

    preload() {
        this.restartButton.preload();
        this.load.audio('gamewinsound', '../assets/sounds/gamewin.wav');
        this.load.audio('gameoversound', '../assets/sounds/gameover.wav');
        this.load.image('txtlose', 'assets/img/txtlose.png');
        this.load.image('txtwin', 'assets/img/txtwin.png');
    }

    create() {

        this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'theme');
        this.restartButton.create();
        if (this.statusGame) { //WIN GAME
            /*let styleText = { fontSize: 'bold 80px', fill: '#FFF' }; //boundsAlignH: "center", boundsAlignV: "middle"
            this.add.text(this.sys.game.canvas.width / 2 + 20, 190, 'YOU SURVIVE', styleText).setOrigin(0.5);*/
            let text = this.add.image(this.sys.game.canvas.width / 2 + 20, 200, 'txtwin');
            text.setScale(0.8, 0.8);

            this.gameWinSample = this.sound.add('gamewinsound');
            this.gameWinSample.play();
        } else { //GAME OVER
            //let styleText = { fontSize: 'bold 50px', fill: '#000' };
            //let text = this.add.text(this.sys.game.canvas.width / 2 + 20, 190, 'YOU DID NOT SURVIVE', styleText).setOrigin(0.5);
            let text = this.add.image(this.sys.game.canvas.width / 2 + 20, 200, 'txtlose');
            text.setScale(0.8, 0.8);
            this.gameOverSample = this.sound.add('gameoversound');
            this.gameOverSample.play();
        }
    }
    update() {
        this.restartButton.update();
    }
}