import * as assets from "./modules/assets.js"
import * as player from "./modules/player.js"
import * as controls from "./modules/controls.js"
import * as Meteor from "./modules/meteor.js"
import * as projectile from "./modules/projectile.js"
import * as Star from "./modules/star.js"

/////////////////////////////////////////////////////

const CANVAS = document.querySelector("canvas")
const CONTEXT = CANVAS.getContext("2d")
CANVAS.width = 450, CANVAS.height = 450

/////////////////////////////////////////////////////

CONTEXT.imageSmoothingEnabled = false;

/////////////////////////////////////////////////////

window.onload = function main() {
  requestAnimationFrame(main)
  CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height)

  Star.starBackgroundStorage.forEach((STARBG) => {
    STARBG.update()
  })
  Star.starStorage.forEach((STAR) => {
    STAR.update()
  })
  Meteor.meteorStorage.forEach((METEOR) => {
    METEOR.update()
  })
  projectile.projectileStorage.forEach((PROJECTILE) => {
    PROJECTILE.update()
  })

  player.SHIP.update()
}
