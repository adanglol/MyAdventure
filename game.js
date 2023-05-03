let HasFlashlight = false // This is a global variable
console.log(HasFlashlight) // This will print false
class Demo1 extends AdventureScene {
    constructor() {
        super("Demo1", "Unfamiliar room");
    }

    onEnter() {

        let clip = this.add.text(this.w * 0.3, this.w * 0.3, "📎 paperclip")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Metal, bent."))
            .on('pointerdown', () => {
                this.showMessage("No touching!");
                this.tweens.add({
                    targets: clip,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑 key")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a nice key.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the key.");
                this.gainItem('key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 Closet door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("key")) {
                    this.showMessage("You've got the key for this door.");
                } else {
                    this.showMessage("It's locked. Can you find a key?");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("key")) {
                    this.loseItem("key");
                    this.showMessage("*squeak*");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('Demo2');
                }
            })

            let flashlight = this.add.text(this.w * 0.2, this.w * 0.5, "🔦 flashlight")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a flashlight.");
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the flashlight.");
                this.gainItem('flashlight');
                HasFlashlight = true;
                console.log(HasFlashlight)
                this.tweens.add({
                    targets: flashlight,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => flashlight.destroy()
                });
            });

    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("Demo2", "Tunnel");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('Demo1');
            });

            let desertedEnt = this.add.text(this.w * 0.1, this.w * 0.1, "🚪Door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a door. Looks like its been here for a while. Looks like it's unlocked.");
            })
            .on('pointerdown', () => {
                this.showMessage("You open the door and walk through.");
                this.gotoScene('Demo3');
            });


            
            let waterEnt = this.add.text(this.w * 0.5, this.w * 0.1, "🚪 Hidden Door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Looks like brining the flashlight was a good idea. Helping spot a hidden door.");
            })
            if (HasFlashlight == false) {
                console.log("HasFlashlight is false")
                waterEnt.alpha = 0;
            }
            



        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

class Menu extends Phaser.Scene {
    constructor() {
        super('Menu')
        console.log("Menu constructor")
    }
    create() {
        const centerX = this.game.config.width / 2;
        const centerY = this.game.config.height / 2;
        this.add.text(centerX - 100,centerY, "The Closet").setFontSize(50);
        this.add.text(centerX -100 ,centerY +100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('Demo1'));
        });
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('Intro');
    }
    preload() {
        this.load.audio('intro', 'assets/INTRO.wav')

    }
    create() {
        this.sound.add('intro', { loop: false })
        this.sound.play('intro')
        const centerX = this.game.config.width / 2;
        const centerY = this.game.config.height / 2;
        let textIntro = "As I slowly regained consciousness, I realized that I was lying in an unfamiliar bed.\n\nThe room around me was dimly lit and sparsely furnished, with a single window covered by heavy drapes.\n\n It took me a few moments to gather my bearings and try to piece together how I had ended up here."
        const introText = this.add.text(centerX, centerY, textIntro, { fontSize: 30, align: 'center', wordWrap: { width: 600 } });
        introText.setOrigin(0.5, 0.5);
        this.tweens.add({
            targets: introText,
            alpha: { from: 0, to: 1 },
            duration: 10000,
            onComplete: () => {
                const clickText = this.add.text(centerX, centerY + 300, "Click anywhere to continue.").setFontSize(30).setOrigin(0.5, 0.5);
                this.tweens.add({
                    targets: clickText,
                    alpha: { from: 0, to: 1 },
                    duration: 1000,
                    repeat: -1,
                    yoyo: true
                });
                this.input.on('pointerdown', () => {
                    this.cameras.main.fade(1000, 0, 0, 0);
                    // stop music
                    this.sound.stopAll();
                    this.time.delayedCall(1000, () => this.scene.start('Demo1'));
                });
            }
        });

    }
}



class Outro extends Phaser.Scene {
    constructor() {
        super('Outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('Menu'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Menu,Intro,Demo1, Demo2, Outro],
    title: "Adventure Game",
});

