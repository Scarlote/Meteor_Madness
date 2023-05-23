import * as assets from "../modules/assets.js"
import * as controls from "../modules/controls.js"

const CANVAS = document.querySelector("canvas")
const CONTEXT = CANVAS.getContext("2d")

CANVAS.width = 450, CANVAS.height = 450

class Ship {
  constructor() {
    this.x = CANVAS.width / 2 - 22.5, this.y = CANVAS.height - 90
    this.vx = 0, this.vy = 0
    this.w = 50, this.h = 50
    this.c = "white"
    this.sprite = assets.SHIP_SPRITE
  }
  draw() {
    CONTEXT.drawImage(
      this.sprite,
      this.x, this.y,
      this.w, this.h
    )
  }
  update() {
    this.draw()

    this.x += this.vx, this.y += this.vy

    if      (controls.keys.right) { this.vx = 3.75}
    else if (controls.keys.left) { this.vx = -3.75 }
    else    { this.vx = 0                 }
  }
}

export const SHIP = new Ship()