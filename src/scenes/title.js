import { pointerUp } from '../utils/buttons.js'
import { flashElement } from '../utils/common.js'
import CONST from '../constants.js'

export default class Title extends Phaser.Scene {

    // Vars
    handlerScene = false
    sceneStopped = false

    constructor() {
        super({ key: 'title' })
    }

    preload() {
        this.sceneStopped = false
        this.width = this.game.screenBaseSize.width
        this.height = this.game.screenBaseSize.height
        this.canvasWidth = this.sys.game.canvas.width
        this.canvasHeight = this.sys.game.canvas.height
        this.handlerScene = this.scene.get('handler')
        this.handlerScene.sceneRunning = 'title'
        // Bindings
        this.pointerUp = pointerUp.bind(this)
        this.flashElement = flashElement.bind(this)
    }
    create() {
        const { width, height, canvasWidth, canvasHeight } = this
        // CONFIG SCENE         
        this.handlerScene.updateResize(this)
        if (this.game.debugMode)
            this.add.image(0, 0, 'guide').setOrigin(0).setDepth(1)
        // CONFIG SCENE 

        // GAME OBJECTS

        // paralax backgrounds    
        // Find the center of the top space
        const topBackgroundXOrigin = canvasWidth / 2
        const topBackgroundYOrigin = height / 3
        // Base width and height of the images
        const imageBaseWidth = this.game.screenBaseSize.maxWidth
        const imageBaseHeight = 720

        this.titleBg = this.add.tileSprite(topBackgroundXOrigin, topBackgroundYOrigin, imageBaseWidth, imageBaseHeight, 'title-background')

        this.highwayBg = this.add.tileSprite(topBackgroundXOrigin, height - 48, imageBaseWidth, 96, 'highway')

        const titleText = this.add.bitmapText(width / 2, (height / 2) - 100, 'gem', 'Saving the day', 40).setOrigin(0.5)
        titleText.setTint(0xFEAE34)

        const titleTextB = this.add.bitmapText(width / 2, (height / 2) - 102, 'gem', 'Saving the day', 40).setOrigin(0.5)
        titleTextB.setTint(0x353D56)

        this.tweens.add({
            targets: titleText,
            alpha: { from: .2, to: 1 },
            props: {
                y: { value: '+=10', duration: 2000, ease: 'Sine.easeInOut' },
            },
            ease: 'Linear',
            duration: 2000,
            repeat: -1,
            yoyo: true
        })

        this.tweens.add({
            targets: titleTextB,
            props: {
                y: { value: '+=10', duration: 2000, ease: 'Sine.easeInOut' },
            },
            duration: 2000,
            repeat: -1,
            yoyo: true
        })

        this.memok = this.add.sprite(width / 2, height - 80, 'memok').setOrigin(0.5)
        this.memok.play(CONST.ANIM.FLY + '-memok')
        // GAME OBJECTS

    }

    update(t, dt) {
        this.titleBg.tilePositionX += dt * .08
        this.highwayBg.tilePositionX += dt * .05
    }

}