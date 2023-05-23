import * as assets from "../modules/assets.js"

const CANVAS = document.querySelector("canvas")
const CONTEXT = CANVAS.getContext("2d")

CANVAS.width = 450, CANVAS.height = 450

export let meteorStorage = []

class Meteor {
  constructor( x, y, vx, vy, r, c, lL ) {
    this.x = x, this.y = y
    this.vx = vx, this.vy = vy
    this.r = r
    this.c = c

    this.rotation = 0, this.rotationVelocity = 0
    this.live = 0, this.liveLimit = lL
    this.sprite = assets.METEOR_SPRITE
    this.fragmentQuantity = 3

    this.leftSide = {
      x: this.x - this.r, y: this.y - this.r,
      w: this.r, h: this.r * 2 + 8
    }
    this.rightSide = {
      x: this.x, y: this.y - this.r,
      w: this.r, h: this.r * 2 + 8

    }
    for (let n = 1; n <= this.fragmentQuantity; n++) {
      this["fragment" + n] = {
        x: this.x, vx: 0, y: this.y, vy: 0, r: this.r / 2.25, c: "red"
      }
    }
  }
  draw() {
          CONTEXT.save()
          CONTEXT.translate(this.x, this.y)
          CONTEXT.rotate(this.rotation)
          CONTEXT.beginPath()
          CONTEXT.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
          CONTEXT.drawImage(this.sprite, -this.r, -this.r, this.r * 2, this.r * 2)
          CONTEXT.restore()
          CONTEXT.closePath()
  }
  drawFragments() {
    for (let n = 1; n <= this.fragmentQuantity; n++) {
      if (this["fragment" + n].x + this["fragment" + n].r <= CANVAS.width / 2
       || this["fragment" + n].x - this["fragment" + n].r>= 100
       || this["fragment" + n].y + this["fragment" + n].r <= CANVAS.height / 2
       || this["fragment" + n].y - this["fragment" + n].r >=  100) {

        CONTEXT.beginPath()
        CONTEXT.arc(
          this["fragment" + n].x, this["fragment" + n].y, 
          this["fragment" + n].r, 
          0, 2 * Math.PI)
        CONTEXT.drawImage(assets.FRAGMENT_SPRITE, this["fragment" + n].x - this["fragment" + n].r, this["fragment" + n].y - this["fragment" + n].r, this["fragment" + n].r * 2, this["fragment" + n].r * 2)
      }
    }
  }
  update() {
    this.drawFragments()

    if (this.y - this.r <= CANVAS.height
    && this.y + this.r >= 0
    && this.x - this.r <= CANVAS.width
    && this.x + this.r >= 0) {
      this.draw()
    }

    this.x += this.vx, this.y += this.vy  
    this.rotation += this.rotationVelocity

    this.leftSide.x = this.x - this.r, this.leftSide.y = this.y - this.r
    this.rightSide.x = this.x, this.rightSide.y = this.y - this.r

    for (let n = 1; n <= this.fragmentQuantity; n++) {
      this["fragment" + n].x += this["fragment" + n].vx
      this["fragment" + n].y += this["fragment" + n].vy
    }
  }
}

export function pushMeteor() {
  let randomXPos = Math.floor(Math.random() * CANVAS.width + 1)
  let X = randomXPos; let Y = 0 - 25

  let randomVX = Math.floor(Math.random() * 3 + 1)
  if (randomVX == 1) { window.VX =  0.45 }
  else if (randomVX == 2) { window.VX = -0.45 }
  else { window.VX = 0 }

  let randomVY = Math.floor(Math.random() * 3 + 1)
  if (randomVY == 1) { window.VY = 1.75 }
  else if (randomVY == 2) { window.VY = 2.5 }
  else { window.VY = 3.25 }

  let randomR = Math.floor(Math.random() * 3 + 1)
  if (randomR == 1) { window.R = 22, window.LL = 2 }
  else if (randomR == 2) { window.R = 24, window.LL = 4 }
  else { window.R = 26, window.LL = 6 }

  let C = "white"

  let METEOR = new Meteor( X, Y, VX, VY, R, C, LL )
  meteorStorage.push(METEOR)
}

setInterval(() => { pushMeteor() }, 550 )