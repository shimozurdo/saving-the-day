import Handler from './scenes/handler.js'
import Title from './scenes/title.js'
import Preload from './scenes/preload.js'
import Hub from './scenes/hub.js'
// import Menu from './scenes/menu.js'

// Aspect Ratio 4:3
const MAX_SIZE_WIDTH_SCREEN = 1920
const MAX_SIZE_HEIGHT_SCREEN = 1440
const MIN_SIZE_WIDTH_SCREEN = 480
const MIN_SIZE_HEIGHT_SCREEN = 360
const SIZE_WIDTH_SCREEN = 800
const SIZE_HEIGHT_SCREEN = 600

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        parent: 'game',
        width: SIZE_WIDTH_SCREEN,
        height: SIZE_HEIGHT_SCREEN,
        min: {
            width: MIN_SIZE_WIDTH_SCREEN,
            height: MIN_SIZE_HEIGHT_SCREEN
        },
        max: {
            width: MAX_SIZE_WIDTH_SCREEN,
            height: MAX_SIZE_HEIGHT_SCREEN
        }
    },
    physics: {
        default: 'arcade',
        arcade: { debug: true }
    },
    dom: {
        createContainer: true
    },
    scene: [Handler, Hub, Preload, Title]
}

const game = new Phaser.Game(config)

// Global Vars
game.debugMode = false
game.embedded = true // game is embedded into a html iframe/object

game.showfadeOutBg = false

game.screenBaseSize = {
    maxWidth: MAX_SIZE_WIDTH_SCREEN,
    minHeight: MAX_SIZE_HEIGHT_SCREEN,
    minWidth: MIN_SIZE_WIDTH_SCREEN,
    maxHeight: MIN_SIZE_HEIGHT_SCREEN,
    width: SIZE_WIDTH_SCREEN,
    height: SIZE_HEIGHT_SCREEN
}
game.orientation = "landscape"

