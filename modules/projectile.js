import * as assets from "../modules/assets.js"
import * as player from "../modules/player.js"
import * as Meteor from "../modules/meteor.js"
import * as collision from "../modules/collision.js"

const CANVAS = document.querySelector("canvas")
const CONTEXT = CANVAS.getContext("2d")

CANVAS.width = 450, CANVAS.height = 450

export let projectileStorage = []

class Projectile {
  constructor( x, y, vy, w, h, c ) {
    this.x = x, this.y = y
    this.vy = vy
    this.w = w, this.h = h
    this.c = c
    this.sprite = assets.PROJECTILE_SPRITE
  }
  draw() {
      CONTEXT.drawImage(
        this.sprite, 
        this.x, this.y, 
        this.w, this.h)
  }
  update() {
    if (this.y + this.h >= 0) {
      this.draw()
    }

    this.y += this.vy

    for (let i = 0; i < Meteor.meteorStorage.length; i++) {
      const meteor = Meteor.meteorStorage[i];

      if (collision.collisionDetection(this, meteor)) {

          this.y = 0 - 100
          meteor.vy += -0.55
          meteor.sprite = assets.METEOR_DAMAGED_SPRITE
          setTimeout(() => {
            meteor.sprite = assets.METEOR_SPRITE
          }, 100)
          assets.meteorDamagedSound()

          meteor.live += 1   
          if (meteor.live == meteor.liveLimit) { 
            meteor.r = 0
            assets.meteorExplodeSound()
          
            for (let n = 1; n <= meteor.fragmentQuantity; n++) {
              var randomVX = Math.random()
              var signVX = Math.random() < 0.5 ? -1 : 1
              var adjustedVX = signVX * (Math.floor(randomVX * 3) + 1.25)
              meteor["fragment" + n].vx = adjustedVX
              
              var randomVY = Math.random()
              var signVY = Math.random() < 0.5 ? -1 : 1
              var adjustedVY = signVY * (Math.floor(randomVY * 3) + 1.25)
              meteor["fragment" + n].vy = adjustedVY
            }
        }
      }

      if (collision.collisionDetection(this, meteor.leftSide)) { 
        meteor.vx = 0.75, meteor.rotationVelocity += 0.02
      }

      if (collision.collisionDetection(this, meteor.rightSide)) { 
         meteor.vx = -0.75, meteor.rotationVelocity += -0.02
       }

       if (meteor.r == 22 || meteor.r == 24 || meteor.r == 26) {
          for (let n = 1; n <= meteor.fragmentQuantity; n++) {
            meteor["fragment" + n].x = meteor.x
            meteor["fragment" + n].y = meteor.y
          }
       }
    }
  }
}

export function pushProjectile() {
  assets.projectileSound()

  let X = player.SHIP.x + player.SHIP.w / 2 - player.SHIP.w / 6 / 2; let Y = player.SHIP.y
  let VY = -15
  let W = player.SHIP.w / 8; let H = player.SHIP.h / 4
  let C = "#7de5ec"

  let PROJECTILE = new Projectile( X, Y, VY, W, H, C )
  projectileStorage.push(PROJECTILE)
}

setInterval(() => { pushProjectile() }, 125)

assets.backgroundMusic()
