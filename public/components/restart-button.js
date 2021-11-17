export class RestartButton {
    constructor(scene, statusGame) {
        this.relatedScene = scene;
        this.btnVelocity = 120;
        this.flagVelocity = 0;
        this.statusGame = statusGame;
    }

    // otros métodos de la clase
    preload() {
        this.relatedScene.load.spritesheet('btnreiniciar',
            'assets/img/btnreiniciar.png',
            { frameWidth: 200, frameHeight: 118 }
        );
        this.relatedScene.load.spritesheet('btnwin',
            'assets/img/btnwin.png',
            { frameWidth: 268, frameHeight: 75 }
        );
    }

    create() {
        if (this.statusGame) {
            this.relatedScene.anims.create({
                key: 'btnwinright',
                frames: this.relatedScene.anims.generateFrameNumbers('btnwin', { start: 0, end: 1 }),
                frameRate: 5,
                repeat: -1
            });
            this.relatedScene.anims.create({
                key: 'btnwinleft',
                frames: this.relatedScene.anims.generateFrameNumbers('btnwin', { start: 2, end: 3 }),
                frameRate: 5,
                repeat: -1
            });
            this.startButton = this.relatedScene.physics.add.sprite(201, 310, 'btnwin').setInteractive({ cursor: 'pointer' });
            this.startButton.anims.play('btnwinright', true);

        } else {
            this.relatedScene.anims.create({
                key: 'btnreiniciarright',
                frames: this.relatedScene.anims.generateFrameNumbers('btnreiniciar', { start: 0, end: 3 }),
                frameRate: 5,
                repeat: -1
            });
            this.relatedScene.anims.create({
                key: 'btnreiniciarleft',
                frames: this.relatedScene.anims.generateFrameNumbers('btnreiniciar', { start: 4, end: 7 }),
                frameRate: 5,
                repeat: -1
            });
            this.startButton = this.relatedScene.physics.add.sprite(201, 310, 'btnreiniciar').setInteractive({ cursor: 'pointer' });

            this.startButton.anims.play('btnreiniciarright', true);

        }
        this.startButton.setVelocityX(this.btnVelocity);
        this.startButton.setScale(0.8, 0.8);
        this.startButton.on('pointerover', () => {
            this.flagVelocity = this.startButton.body.velocity.x;
            this.startButton.setVelocityX(0);
        });
        this.startButton.on('pointerout', () => {
            this.startButton.setVelocityX(this.flagVelocity);

        });
        this.startButton.on('pointerdown', () => {
            this.relatedScene.scene.start('firstphase');
        });



    }
    update() {
        if (this.statusGame) {
            if (this.startButton.x >= 550) {
                this.startButton.setVelocityX(-this.btnVelocity);
                this.startButton.anims.play('btnwinleft', true);
            } else if (this.startButton.x <= 200) {
                this.startButton.anims.play('btnwinright', true);
                this.startButton.setVelocityX(this.btnVelocity);
            }
        } else {
            if (this.startButton.x >= 550) {
                this.startButton.setVelocityX(-this.btnVelocity);
                this.startButton.anims.play('btnreiniciarleft', true);
            } else if (this.startButton.x <= 200) {
                this.startButton.anims.play('btnreiniciarright', true);
                this.startButton.setVelocityX(this.btnVelocity);
            }
        }

    }
}