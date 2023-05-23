import * as player from "../modules/player.js"
import * as controls from "../modules/controls.js"

const CANVAS = document.querySelector("canvas")
const CONTEXT = CANVAS.getContext("2d")

CANVAS.width = 450, CANVAS.height = 450

export let starStorage = []
export let starBackgroundStorage = []

class Star {
  constructor( x, y, vx, vy, w, h, c ) {
    this.x = x, this.y = y
    this.vx = vx, this.vy = vy
    this.w = w, this.h = h
    this.c = c
  }
  draw() {
      CONTEXT.fillStyle = this.c
      CONTEXT.fillRect(this.x, this.y, this.w, this.h)
  }
  update() {
    if (this.y <= CANVAS.height
     && this.x <= CANVAS.width
     && this.x + this.w >= 0) {
      this.draw()
    }

    this.x += this.vx, this.y += this.vy

    for (let i = 0; i < starStorage.length; i++) {
      const star = starStorage[i];
    for (let i = 0; i < starBackgroundStorage.length; i++) {
      const starBg = starBackgroundStorage[i];

    if      (controls.keys.right)  { star.vx = -0.6, starBg.vx = -0.4 } 
    else if (controls.keys.left)   { star.vx = 0.6, starBg.vx = 0.4   } 
    else    { star.vx = 0, starBg.vx = 0                     }
    }
  }
  }
}

function pushBackgroundStar() {
  let randomXPos = Math.floor(Math.random() * CANVAS.width + 1)
  let X = randomXPos; let Y = 0
  let VX = 0; let VY = 1
  let W = player.SHIP.w / 14; let H = player.SHIP.h / 14
  let C = "gray"

  let STAR = new Star( X, Y, VX, VY, W, H, C )
  starBackgroundStorage.push(STAR)

//////////////////////////////////////////////////////////

  let randomXPos2 = Math.floor(Math.random() * CANVAS.width + 1)

  let X2 = randomXPos2; let Y2 = 0
  let VX2 = 0; let VY2 = 0.5
  let W2 = player.SHIP.w / 16; let H2 = player.SHIP.h / 16
  let C2 = "#333"

  let STAR2 = new Star( X2, Y2, VX2, VY2, W2, H2, C2 )
  starBackgroundStorage.push(STAR2)
}

export function pushStar() {
  let randomXPos3 = Math.floor(Math.random() * CANVAS.width + 1)
  let X3 = randomXPos3; let Y3 = 0
  let VX3 = 0; let VY3 = 2
  let W3 = player.SHIP.w / 12; let H3 = player.SHIP.h / 12
  let C3 = "white"

  let STAR3 = new Star( X3, Y3, VX3, VY3, W3, H3, C3 )
  starStorage.push(STAR3)
}

setInterval(() => { pushBackgroundStar() }, 500)
setInterval(() => { pushStar() }, 325)