import { pointerOver, pointerUp } from '../utils/buttons.js'
import { flashElement } from '../utils/common.js'
import CONST from '../constants.js'

export default class Title extends Phaser.Scene {
    constructor() {
        super({ key: 'title' })
    }
    preload() {
        this.sceneStopped = false
        this.width = this.game.screenBaseSize.width
        this.height = this.game.screenBaseSize.height
        this.handlerScene = this.scene.get('handler')
        this.handlerScene.sceneRunning = 'title'
        // Bindings
        this.pointerUp = pointerUp.bind(this)
        this.flashElement = flashElement.bind(this)
    }
    create() {
        const { width, height } = this
        if (this.game.debugMode)
            this.add.image(0, 0, 'guide').setOrigin(0).setDepth(1)

        // HANDLER SCENE            
        this.scale.on('resize', this.resize, this)

        const scaleWidth = this.scale.gameSize.width
        const scaleHeight = this.scale.gameSize.height

        this.parent = new Phaser.Structs.Size(scaleWidth, scaleHeight)
        this.sizer = new Phaser.Structs.Size(width, height, Phaser.Structs.Size.FIT, this.parent)

        this.parent.setSize(scaleWidth, scaleHeight)
        this.sizer.setSize(scaleWidth, scaleHeight)

        this.updateCamera()
        // HANDLER SCENE

        // // Config for paralax backgrounds

        // // Get the window sizes
        // const windowWidth = window.innerWidth;
        // const windowHeight = window.innerHeight;

        // // Find the center of the top space
        // const topBackgroundXOrigin = windowWidth / 2;
        // const topBackgroundYOrigin = (windowHeight / 5) * 1.5;
        // const topBackgroundHeight = (windowHeight / 5) * 3;

        // // Base width and height of the images
        // const imageBaseWidth = 1280;
        // const imageBaseHeight = 720;
        // const heightRatio = topBackgroundHeight / imageBaseHeight;

        // this.titleBg = this.add.tileSprite(topBackgroundXOrigin, topBackgroundYOrigin, imageBaseWidth, imageBaseHeight, "title-background");
        // this.titleBg.setScrollFactor(0);

        // this.highwayBg = this.add.tileSprite(topBackgroundXOrigin, this.height - 40, imageBaseWidth, 96, "highway");
        // this.highwayBg.setScrollFactor(0);

        const titleText = this.add.bitmapText(this.width / 2, (this.height / 2) - 100, "gem", "Saving the day", 40).setOrigin(0.5);
        titleText.setTint(0xFEAE34);

        const titleTextB = this.add.bitmapText(this.width / 2, (this.height / 2) - 102, "gem", "Saving the day", 40).setOrigin(0.5);
        titleTextB.setTint(0x353D56);

        // this.tweens.add({
        //     targets: titleText,
        //     alpha: { from: .2, to: 1 },
        //     props: {
        //         y: { value: "+=10", duration: 2000, ease: "Sine.easeInOut" },
        //     },
        //     ease: "Linear",
        //     duration: 2000,
        //     repeat: -1,
        //     yoyo: true
        // });

        // this.tweens.add({
        //     targets: titleTextB,
        //     props: {
        //         y: { value: "+=10", duration: 2000, ease: "Sine.easeInOut" },
        //     },
        //     duration: 2000,
        //     repeat: -1,
        //     yoyo: true
        // });        

        // const playBtn = this.add.sprite(this.width / 2, this.height / 2, "button").setOrigin(0.5).setInteractive({ cursor: "pointer" });;
        // const playTxt = this.add.bitmapText(playBtn.x, playBtn.y - 10, "gem", "Play", 34).setOrigin(.5);
        // playTxt.setTint(0x353D56);

        // playBtn.on("pointerover", function () {
        //     this.setTint(0xFEAE34);
        // });

        // playBtn.on("pointerout", function () {
        //     this.clearTint();
        // });

        // playBtn.on("pointerup", function () {
        //     this.game.sound.stopAll();
        //     this.scene.start("gameScene");
        // }, this);

        // this.memok = this.add.sprite(this.width / 2, this.height - 80, "memok").setOrigin(0.5);
        // this.memok.play(CONST.ANIM.FLY + "-memok");

        // this.add.bitmapText(this.width / 2, this.height - 10, "gem", "A game by shimozurdo", 18).setOrigin(.5);

    }
    resize(gameSize) {
        if (!this.sceneStopped) {
            const width = gameSize.width
            const height = gameSize.height

            this.parent.setSize(width, height)
            this.sizer.setSize(width, height)

            this.updateCamera()
        }
    }

    updateCamera() {
        const camera = this.cameras.main

        const x = Math.ceil((this.parent.width - this.sizer.width) * 0.5)
        const y = Math.ceil((this.parent.height - this.sizer.height) * 0.5)
        const scaleX = this.sizer.width / this.game.screenBaseSize.width
        const scaleY = this.sizer.height / this.game.screenBaseSize.height

        //camera.setViewport(x, y, this.sizer.width, this.sizer.height)
        camera.setZoom(Math.max(scaleX, scaleY))
        camera.centerOn(this.game.screenBaseSize.width / 2, this.game.screenBaseSize.height / 2)
        this.handlerScene.updateCamera()
    }

    getZoom() {
        return this.cameras.main.zoom
    }

}



// import CONST from './const.js'

// const titleScene = new Phaser.Class({
//     Extends: Phaser.Scene,
//     initialize:
//         function titleScene() {
//             Phaser.Scene.call(this, "titleScene");
//         },
//     preload: function () {
//         this.width = this.cameras.main.width;
//         this.height = this.cameras.main.height;
//     },
//     create: function () {

//         // Config for paralax backgrounds

//         // Get the window sizes
//         const windowWidth = window.innerWidth;
//         const windowHeight = window.innerHeight;

//         // Find the center of the top space
//         const topBackgroundXOrigin = windowWidth / 2;
//         const topBackgroundYOrigin = (windowHeight / 5) * 1.5;
//         const topBackgroundHeight = (windowHeight / 5) * 3;

//         // Base width and height of the images
//         const imageBaseWidth = 1280;
//         const imageBaseHeight = 720;
//         const heightRatio = topBackgroundHeight / imageBaseHeight;

//         this.titleBg = this.add.tileSprite(topBackgroundXOrigin, topBackgroundYOrigin, imageBaseWidth, imageBaseHeight, "title-background");
//         this.titleBg.setScrollFactor(0);

//         this.highwayBg = this.add.tileSprite(topBackgroundXOrigin, this.height - 40, imageBaseWidth, 96, "highway");
//         this.highwayBg.setScrollFactor(0);

//         const titleText = this.add.bitmapText(this.width / 2, (this.height / 2) - 100, "gem", "Saving the day", 40).setOrigin(0.5);
//         titleText.setTint(0xFEAE34);

//         const titleTextB = this.add.bitmapText(this.width / 2, (this.height / 2) - 102, "gem", "Saving the day", 40).setOrigin(0.5);
//         titleTextB.setTint(0x353D56);

//         this.tweens.add({
//             targets: titleText,
//             alpha: { from: .2, to: 1 },
//             props: {
//                 y: { value: "+=10", duration: 2000, ease: "Sine.easeInOut" },
//             },
//             ease: "Linear",
//             duration: 2000,
//             repeat: -1,
//             yoyo: true
//         });

//         this.tweens.add({
//             targets: titleTextB,
//             props: {
//                 y: { value: "+=10", duration: 2000, ease: "Sine.easeInOut" },
//             },
//             duration: 2000,
//             repeat: -1,
//             yoyo: true
//         });        

//         const playBtn = this.add.sprite(this.width / 2, this.height / 2, "button").setOrigin(0.5).setInteractive({ cursor: "pointer" });;
//         const playTxt = this.add.bitmapText(playBtn.x, playBtn.y - 10, "gem", "Play", 34).setOrigin(.5);
//         playTxt.setTint(0x353D56);

//         playBtn.on("pointerover", function () {
//             this.setTint(0xFEAE34);
//         });

//         playBtn.on("pointerout", function () {
//             this.clearTint();
//         });

//         playBtn.on("pointerup", function () {
//             this.game.sound.stopAll();
//             this.scene.start("gameScene");
//         }, this);

//         this.memok = this.add.sprite(this.width / 2, this.height - 80, "memok").setOrigin(0.5);
//         this.memok.play(CONST.ANIM.FLY + "-memok");

//         this.add.bitmapText(this.width / 2, this.height - 10, "gem", "A game by shimozurdo", 18).setOrigin(.5);

//     }, update: function () {
//         this.titleBg.tilePositionX += .5;
//         this.highwayBg.tilePositionX += .3;
//     }
// });

// export default titleScene;