// Import styles
import './index.css'
import * as PIXI from 'pixi.js'
import 'pixi-spine'
import { config } from './config'

const game = new PIXI.Application({ width: 1920, height: 1080 })
document.body.appendChild(game.view)
window.game = game

game.loader
    .add(config)
    .load(create)

function create() {
    config.forEach(el => {
        if (el.url.indexOf('json') !== -1) {
            // This is Spine
            game[el.name] = new PIXI.spine.Spine(game.loader.resources[el.name].spineData)
            game[el.name].x = el.x || 0
            game[el.name].y = el.y || 0
            game[el.name].alpha = el.alpha || 1
            game[el.name].state.setAnimation(0, el.anim || 'idle', (typeof el.repeat === 'undefined') ? true : el.repeat)
            game.stage.addChild(game[el.name])
        } else {
            // This is Sprite
            game[el.name] = new PIXI.Sprite(PIXI.utils.TextureCache[el.name])
            game[el.name].x = el.x || 0
            game[el.name].y = el.y || 0
            game[el.name].alpha = el.alpha || 1
            game.stage.addChild(game[el.name])
        }
    })
}