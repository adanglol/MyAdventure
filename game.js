
let HasFlashlight = false
let HasGun = false
let gunAmmo = 6
let MedallionHalfOne = false
let MedallionHalfTwo = false

class UnfamilarRoom extends AdventureScene {
    constructor() {
        super("UnfamilarRoom", "Unfamiliar room");
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
                    this.gotoScene('Tunnel');
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

class Tunnel extends AdventureScene {
    constructor() {
        super("Tunnel", "Tunnel");
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
                this.gotoScene('DesertIsland');
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

// TO IMPLEMENT CLASS DEMO3 which is deserted island do logic with demo2
class DesertIsland extends AdventureScene {
    constructor() {
        super("DesertIsland", "Desert Island");
    }
    onEnter() {
        const grandGateDoor = this.add.text(this.w * 0.1, this.w * 0.1, "🚪Grand Gate Door")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("Looks like a grand door. It's locked by some contrapcion needing some sort of medallion.");
        })
        .on('pointerdown', () => {
            if (MedallionHalfOne == false){
                console.log("MedallionHalfOne is false")
                this.showMessage("You try to open the door but it's locked!");
            } else if (MedallionHalfOne == true){
                this.showMessage("Looks like you have the medallion. You place it in the contraption and the door opens.");
                this.gotoScene('GrandGate'); // need to make this scene
            }
        });

        const plane = this.add.text(this.w * 0.5, this.w * 0.1, "🛩️ Plane")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("From afar it looks to be a plane. Think it has seen better days.");
        })
        .on('pointerdown', () => {
            this.showMessage("Doesn't hurt to check it out does it? You walk over to the plane.");
            this.gotoScene('Plane'); // need to make this scene
        });

        const trail = this.add.text(this.w * 0.1, this.w * 0.5, "🌳 Trail")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("Looks like a trail. It leads to a forest. Deeper into the island.");
        })
        .on('pointerdown', () => {
            this.showMessage("You walk down the trail.");
            this.gotoScene('Forest'); // need to make this scene
        });

    }
}

class Plane extends AdventureScene {
    constructor() {
        super("Plane", "Plane");
    }
    onEnter() {
        const gun = this.add.text(this.w * 0.1, this.w * 0.1, "🔫 Revolver")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("It's a Revolver. Looks like it's been here for a while. Looks like it's loaded with 6 shots.");
        })
        .on('pointerdown', () => {
            this.showMessage("You pick up the gun. Guess it will come in handy.");
            this.gainItem('gun');
            HasGun = true;
            console.log(HasGun)
            this.tweens.add({
                targets: gun,
                y: `-=${2 * this.s}`,
                alpha: { from: 1, to: 0 },
                duration: 500,
                onComplete: () => gun.destroy()
            });
        });
        if (MedallionHalfOne == true){
            gun.alpha = 0;
        }



        this.add.text(this.w * 0.3, this.w * 0.4, "GO BACK")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("You've got no other choice, really.");
        })
        .on('pointerdown', () => {
            this.gotoScene('DesertIsland');
        });
        
    }
}

class Forest extends AdventureScene {
    constructor() {
        super("Forest", "Forest");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "WE ARE IN FURTHER")
        this.add.text(this.w * 0.3, this.w * 0.5, "👺")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("You see a strange creature. It looks like it's holding something.");
        })
        .on('pointerdown', () => {
            this.showMessage("You walk over to the creature.");
            this.gotoScene('BeastCreature'); // need to make this scene
        });
    }
}

class BeastCreature extends AdventureScene {
    constructor() {
        super("BeastCreature", "Beast's Lair");
    }
    onEnter() {
        const bigFoot = this.add.text(this.w * 0.3, this.w * 0.4, "👺")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("As you approach the creature you can see it's holding a medallion. It looks like it's been broken in half.");
        })
        .on('pointerdown', () => {
            this.showMessage("Before long you end up stepping on a twig. The creature turns around and sees you. It starts to run towards you.");
            if(HasGun == true){
                this.showMessage("Looks like you have a gun.")
                const gun = this.add.text(this.w * 0.1, this.w * 0.1, "🔫")
                .setFontSize(this.s * 2)
                .setInteractive()
                .on('pointerover', () => {
                    this.showMessage("You have 6 shots. Do you shoot?");
                })
                .on('pointerdown', () => {
                    let roll = Math.floor( Math.random() * 6 ) + 1;
                    if (roll === 6){
                        this.showMessage("You shoot the creature in the head.You walk over to the creature and take the medallion. Tossing the gun as well");
                        this.gainItem('medallionHalfOne');
                        MedallionHalfOne = true;
                        this.loseItem('gun');
                        bigFoot.alpha = 0;
                        gun.alpha = 0;
                        this.gotoScene('Plane'); // need to make this scene
    
                    } else {
                        gunAmmo--;
                        this.showMessage(`You missed you have ${gunAmmo} shots left. Thankfully the creature is occupied with the sound of the gunshot`)
                        console.log(gunAmmo)
                    }
                    if (gunAmmo === 0){
                        this.showMessage("You are out of ammo. The creature notices the gunshots. The Creature catches up to you and kills you.");
                        gun.destroy();
                        this.loseItem('gun');
                        this.gotoScene('GameOver'); // need to make this scene
                    }
                    
                });
            } else if (HasGun == false){
                this.showMessage("You are defenseless. You try to run but the creature is too fast. It catches up to you in blink of an eye.");
                this.gotoScene('GameOver'); // need to make this scene
            }
        });
    }
}

class GameOver extends AdventureScene {
    constructor() {
        super("GameOver", "Game Over");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "GAME OVER")
        this.add.text(this.w * 0.3, this.w * 0.5, "Play Again?")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("You died. Play again?");
        })
        .on('pointerdown', () => {
            this.gotoScene('Menu');
        });
    }
}



class GrandGate extends AdventureScene {
    constructor() {
        super("GrandGate", "Grand Gate");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "GRANDNESS")
    }
}




class Menu extends Phaser.Scene {
    constructor() {
        super('Menu')
        console.log("Menu constructor")
    }
    create() {
        HasFlashlight = false
        HasGun = false
        gunAmmo = 6
        MedallionHalfOne = false
        MedallionHalfTwo = false
        console.log(HasFlashlight, HasGun, gunAmmo, MedallionHalfOne, MedallionHalfTwo)
        const centerX = this.game.config.width / 2;
        const centerY = this.game.config.height / 2;
        this.add.text(centerX - 100,centerY, "The Closet").setFontSize(50);
        this.add.text(centerX -100 ,centerY +100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('DesertIsland'));
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
                    this.time.delayedCall(1000, () => this.scene.start('UnfamilarRoom'));
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
    scene: [Menu,Intro,UnfamilarRoom,Tunnel,DesertIsland,GrandGate,Plane,Forest,BeastCreature,GameOver,Outro],
    title: "Adventure Game",
});

