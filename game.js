
let HasFlashlight = false
let HasGun = false
let gunAmmo = 6
let MedallionHalfOne = false
let MedallionHalfTwo = false

class UnfamilarRoom extends AdventureScene {
    constructor() {
        super("UnfamilarRoom", "Unfamiliar room");
    }
    preload() {
        this.load.image('background', 'ASSETS/ENLARGE.png');
    }

    onEnter() {
        this.add.image(0, 0, "background").setOrigin(0, 0).setDisplaySize(this.w * .75, this.h);
        let door = this.add.text(this.w * 0.06, this.w * 0.25, "🔒")
        .setFontSize(this.s * 4)
        .setPadding(this.s,this.s * 2)
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
                door.setText("🔓");
                this.gotoScene('Tunnel');
            }
        })

        
        
        

        let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑")
            .setFontSize(this.s * 2)
            .setInteractive()
            .setPadding(this.s,this.s * 2)
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
    preload(){
        this.load.image('Tunnel', 'ASSETS/TunnelBIG.png');
    }
    onEnter() {
        this.add.image(0, 0, "Tunnel").setOrigin(0, 0).setDisplaySize(this.w * .75, this.h);

        let desertedEnt = this.add.text(this.w * 0.34, this.w * 0.3, "🚪")
        .setFontSize(this.s * 4)
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
        .on('pointerdown', () => {
            this.showMessage("You open the door and walk through.");
            this.gotoScene('Pool');
        })
        if (HasFlashlight == false) {
            console.log("HasFlashlight is false")
            waterEnt.alpha = 0;
        }
            
    }
}

class Pool extends AdventureScene {
    constructor() {
        super("Pool", "Pool");
    }
    onEnter() {

        this.tweenText(this.add.text(this.w * 0.3, this.w * 0.4, "LOOKS LIKE ITS JUST A POOL"),2000)
        // delay then go to next scene
        this.time.delayedCall(7000, () => {
            this.gotoScene('Tunnel');
        })
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
    preload() {
        this.load.audio('shot', 'ASSETS/SHOT.WAV');
        this.load.audio('death', 'ASSETS/SCREAM.ogg');
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
                    this.sound.add('shot', { loop: false })
                    this.sound.play('shot')
                    let roll = 6; 
                    // Math.floor( Math.random() * 6 ) + 1;
                    if (roll === 6){
                        this.sound.add('death', { loop: false })
                        this.sound.play('death')
                        this.showMessage("You shoot the creature in the head.You walk over to the creature and take the medallion. Tossing the gun as well");
                        this.gainItem('medallionHalfOne');
                        MedallionHalfOne = true;
                        this.loseItem('gun');
                        bigFoot.alpha = 0;
                        gun.alpha = 0;
                        this.gotoScene('DesertIsland'); // need to make this scene
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
        this.tweenText(this.add.text(this.w * 0.2, this.w * 0.1, "🚪DONE")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("Guess this is only door left. What an adventure.");
        })
        .on('pointerdown', () => {
            this.showMessage("You open the door and walk through. You are greeted by a bright light. You walk towards it. You are blinded by the light. You wake up in your bed. It was all a dream.");
            this.gotoScene('Victory'); // need to make this scene
        })
        , 3000)
        
    }
}

class Victory extends AdventureScene {
    constructor() {
        super("Victory", "Victory");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "All of it was a dream. But it was real. My adventure was.")
        this.add.text(this.w * 0.3, this.w * 0.5, "Menu")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("You won. Play again?");
        })
        .on('pointerdown', () => {
            this.gotoScene('Menu');
        });
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
            this.time.delayedCall(1000, () => this.scene.start('Intro'));
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
    scene: [Tunnel,UnfamilarRoom,Menu,Intro,DesertIsland,GrandGate,Plane,Forest,BeastCreature,GameOver,Victory,Pool,Outro],
    title: "Adventure Game",
});

