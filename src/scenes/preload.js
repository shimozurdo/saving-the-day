import { createAnimation } from '../utils/common.js'
import CONST from '../constants.js'

export default class Preload extends Phaser.Scene {

    // Vars
    handlerScene = null
    sceneStopped = false

    constructor() {
        super({ key: 'preload' })
    }

    preload() {
        // static images
        this.load.image('logo', 'assets/logo.png')
        this.load.image('guide', 'assets/images/960x540-guide.png')
        this.load.image('title-background', 'assets/title-background.png')
        this.load.image('highway', 'assets/highway.png')
        this.load.image('button', 'assets/button.png')
        this.load.image('tileSetImg', 'assets/tileSet.png')
        this.load.image('bucket', 'assets/bucket.png')
        this.load.image('mask', 'assets/mask.png')
        this.load.image('hand', 'assets/hand.png')
        this.load.image('vaccine', 'assets/vaccine.png')
        this.load.image('ambulance', 'assets/ambulance.png')
        this.load.image('manager', 'assets/manager.png')
        this.load.image('close', 'assets/close.png')
        this.load.image('battery', 'assets/battery.png')
        // sprite sheets
        this.load.spritesheet('show-more-text', 'assets/show-more-text.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('cross', 'assets/cross.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('help-alert', 'assets/help-alert.png', { frameWidth: 64, frameHeight: 32 })
        this.load.spritesheet('memok', 'assets/memok.png', { frameWidth: 48, frameHeight: 64 })
        this.load.spritesheet('wilmer', 'assets/wilmer.png', { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet('ada', 'assets/ada.png', { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet('ada-mask', 'assets/ada-mask.png', { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet('ada-sick', 'assets/ada-mask.png', { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet('ada-sick-mask', 'assets/ada-sick-mask.png', { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet('evan', 'assets/evan.png', { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet('evan-mask', 'assets/evan-mask.png', { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet('evan-sick', 'assets/evan-sick.png', { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet('evan-sick-mask', 'assets/evan-sick-mask.png', { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet('warning', 'assets/warning.png', { frameWidth: 8, frameHeight: 16 })
        this.load.spritesheet('selected-item', 'assets/selected-item.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('arrow-down', 'assets/arrow-down.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('selected-guest', 'assets/selected-guest.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('gears', 'assets/gears.png', { frameWidth: 32, frameHeight: 32 })
        // fonts
        this.load.bitmapFont('gem', 'assets/gem.png', 'assets/gem.xml')
        // Json
        this.load.tilemapTiledJSON('map', 'assets/tileMap.json')
        // audio
        this.load.audio('pleasant-creek-loop', ['assets/pleasant-creek-loop.mp3', 'assets/pleasant-creek-loop.ogg'])
        this.load.audio('intro-theme', ['assets/intro-theme.mp3', 'assets/intro-theme.ogg'])
        //---------------------------------------------------------------------->
        this.canvasWidth = this.sys.game.canvas.width
        this.canvasHeight = this.sys.game.canvas.height

        this.width = this.game.screenBaseSize.width
        this.height = this.game.screenBaseSize.height

        this.handlerScene = this.scene.get('handler')
        this.handlerScene.sceneRunning = 'preload'
        this.sceneStopped = false

        let progressBox = this.add.graphics()
        progressBox.fillStyle(0x000, 0.8)
        progressBox.fillRect((this.canvasWidth / 2) - (210 / 2), (this.canvasHeight / 2) - 5, 210, 30)
        let progressBar = this.add.graphics()

        this.load.on('progress', (value) => {
            progressBar.clear()
            progressBar.fillStyle(0xFF5758, 1)
            progressBar.fillRect((this.canvasWidth / 2) - (200 / 2), (this.canvasHeight / 2), 200 * value, 20)
        })

        this.load.on('complete', () => {
            progressBar.destroy()
            progressBox.destroy()
            this.time.addEvent({
                delay: this.game.debugMode ? 3000 : 4000,
                callback: () => {
                    this.sceneStopped = true
                    this.scene.stop('preload')
                    this.handlerScene.launchScene('title')
                },
                loop: false
            })
        })

        //binding actions to this scene
        this.createAnimation = createAnimation.bind(this)
    }

    create() {
        const { width, height } = this
        // CONFIG SCENE         
        this.handlerScene.updateResize(this)
        if (this.game.debugMode)
            this.add.image(0, 0, 'guide').setOrigin(0).setDepth(1)
        // CONFIG SCENE 

        // BACKGROUND
        this.add.image(width / 2, (height / 2), 'logo').setOrigin(.5)
        // BACKGROUND

        // ANIMATIONS       
        this.createAnimation(CONST.ANIM.WALK + '-ada', 'ada', 4, -1)
        this.createAnimation(CONST.ANIM.WALK + '-ada-mask', 'ada-mask', 4, -1)
        this.createAnimation(CONST.ANIM.WALK + '-ada-sick', 'ada-sick', 4, -1)
        this.createAnimation(CONST.ANIM.WALK + '-ada-sick', '-ada-sick', 4, -1)
        this.createAnimation(CONST.ANIM.WALK + '-ada-sick-mask', 'ada-sick-mask', 4, -1)
        this.createAnimation(CONST.ANIM.WALK + '-evan', 'evan', 4, -1)
        this.createAnimation(CONST.ANIM.WALK + '-evan-mask', 'evan-mask', 4, -1)
        this.createAnimation(CONST.ANIM.WALK + '-evan-sick', 'evan-sick', 4, -1)
        this.createAnimation(CONST.ANIM.WALK + '-evan-sick', '-evan-sick', 4, -1)
        this.createAnimation(CONST.ANIM.WALK + '-evan-sick-mask', 'evan-sick-mask', 4, -1)
        this.createAnimation(CONST.ANIM.FLY + '-memok', 'memok', 4, -1)
        this.createAnimation(CONST.ANIM.IDLE + '-wilmer', 'wilmer', 4, -1)
        this.createAnimation(CONST.ANIM.BLINK + '-show-more-text', 'show-more-text', 4, -1)
        this.createAnimation(CONST.ANIM.BLINK + '-help-alert', 'help-alert', 4, -1)
        this.createAnimation(CONST.ANIM.BLINK + '-selected-item', 'selected-item', 4, -1)
        this.createAnimation(CONST.ANIM.BLINK + '-selected-guest', 'selected-guest', 4, -1)
        this.createAnimation(CONST.ANIM.BLINK + '-arrow-down', 'arrow-down', 4, -1)
        this.createAnimation(CONST.ANIM.BLINK + '-warning', 'warning', 4, 1)
        this.createAnimation(CONST.ANIM.WAIT + '-arrow-gears', 'gears', 4, -1)
        // ANIMATIONS
    }
}