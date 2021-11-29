import { RestartButton } from "../components/restart-button.js";

export class Gameover extends Phaser.Scene {
    constructor() {
        super({ key: 'gameover' });

    }
    init(data) {
        //console.log('init', data);
        this.statusGame = data.statusGame;
        this.restartButton = new RestartButton(this, this.statusGame);
        this.timeGame = data.timeGame;
    }

    preload() {
        this.restartButton.preload();
        this.load.audio('gamewinsound', '../assets/sounds/gamewin.wav');
        this.load.audio('gameoversound', '../assets/sounds/gameover.wav');
        this.load.image('theme', '../assets/img/inicio.jpg');
        this.load.image('txtlose', 'assets/img/txtlose.png');
        this.load.image('txtwin', 'assets/img/txtwin.png');
        this.load.image('txtstart', 'assets/img/txtstart.png');
    }

    create() {

        this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'theme');
        this.restartButton.create();
        switch (this.statusGame) {

            case 1: //WIN
                let styleText = { fontSize: 'italic 25px Roboto', fill: '#FFF' }; //boundsAlignH: "center", boundsAlignV: "middle"
                //this.add.text(this.sys.game.canvas.width / 2 + 20, 190, 'YOU SURVIVE', styleText).setOrigin(0.5);
                this.text = this.add.image(this.sys.game.canvas.width / 2, 370, 'txtwin');
                this.gameSound = this.sound.add('gamewinsound');
                this.gameSound.play();
                this.txtGame = this.add.text(this.sys.game.canvas.width / 2, 420, `Your time was ${Math.round(this.timeGame)} seconds`, styleText).setOrigin(0.5);
                break;
            case 2: //LOSE
                //let styleText = { fontSize: 'bold 50px', fill: '#000' };
                //let text = this.add.text(this.sys.game.canvas.width / 2 + 20, 190, 'YOU DID NOT SURVIVE', styleText).setOrigin(0.5);
                this.text = this.add.image(this.sys.game.canvas.width / 2, 370, 'txtlose');
                this.gameSound = this.sound.add('gameoversound');
                this.gameSound.play();
                break;
            default:
                this.text = this.add.image(this.sys.game.canvas.width / 2, 370, 'txtstart');
                break;

        }
        this.text.setScale(0.5, 0.5);
    }
    update() {
        this.restartButton.update();
    }
}