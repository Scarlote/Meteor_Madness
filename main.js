import * as assets from "./modules/assets.js"
import * as controls from "./modules/controls.js"
import * as collision from "./modules/collision.js"

/////////////////////////////////////////////////////

const CANVAS = document.querySelector("canvas")
const CONTEXT = CANVAS.getContext("2d")

CANVAS.width = window.innerHeight / 1.25, CANVAS.height = window.innerHeight / 1.25

/////////////////////////////////////////////////////

let alive = true
let audioFlag = false

class Ship {
  constructor() {
    this.x = CANVAS.width / 2 - CANVAS.width * 0.1 / 2, this.y = CANVAS.height - CANVAS.height * 0.1 * 2
    this.vx = 0, this.vy = 0
    this.w = CANVAS.width * 0.1, this.h = CANVAS.height * 0.1
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

    if      (controls.keys.right && alive == true) { 
      if (this.vx < 4) { this.vx += CANVAS.width / 2000 }
    }
    else if (controls.keys.left && alive == true) { 
      if (this.vx > -4) { this.vx += CANVAS.width / -2000 }
    }

    if (this.x + this.w < 0) { this.x = CANVAS.width }
    else if (this.x > CANVAS.width) { this.x = 0 - this.w }
  }
}

const SHIP = new Ship()

/////////////////////////////////////////////////////

let meteorStorage = []

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

    for (let n = 1; n <= this.fragmentQuantity; n++) {
      if (collision.collisionDetection(SHIP, this["fragment" + n]) && !audioFlag) {
        alive = false, SHIP.vy = 1.5
        assets.meteorExplodeSound()
        audioFlag = true
      } 
    }
    if (collision.collisionDetection(SHIP, this) && !audioFlag) {
      alive = false, SHIP.vy = 1.5
      assets.meteorExplodeSound()
      audioFlag = true
    }
  }
}

function pushMeteor() {
  let randomXPos = Math.floor(Math.random() * CANVAS.width + 1)
  let X = randomXPos; let Y = -25

  let randomVX = Math.floor(Math.random() * 3 + 1)
  if (randomVX == 1) { window.VX =  CANVAS.width / 750 }
  else if (randomVX == 2) { window.VX = CANVAS.width / -750 }
  else { window.VX = 0 }

  let randomVY = Math.floor(Math.random() * 3 + 1)
  if (randomVY == 1) { window.VY = CANVAS.height / 250 }
  else if (randomVY == 2) { CANVAS.height / 200 }
  else { window.VY = CANVAS.height / 150 }

  let R = CANVAS.width * 0.05
  let LL = 3

  let C = "white"

  let METEOR = new Meteor( X, Y, VX, VY, R, C, LL )
  meteorStorage.push(METEOR)
}

/////////////////////////////////////////////////////

let projectileStorage = []

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

    for (let i = 0; i < meteorStorage.length; i++) {
      const meteor = meteorStorage[i];

      if (collision.collisionDetection(this, meteor)) {

          this.y = 0 - 100
          meteor.vy += CANVAS.height / -500
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
        meteor.vx = 0.75, meteor.rotationVelocity += CANVAS.width / 27500
      }

      if (collision.collisionDetection(this, meteor.rightSide)) { 
         meteor.vx = -0.75, meteor.rotationVelocity += CANVAS.width / -27500
       }

       if (meteor.r == CANVAS.width * 0.05 || meteor.r == CANVAS.width * 0.054 || meteor.r == CANVAS.width * 0.058) {
          for (let n = 1; n <= meteor.fragmentQuantity; n++) {
            meteor["fragment" + n].x = meteor.x
            meteor["fragment" + n].y = meteor.y
          }
       }
    }
  }
}

function pushProjectile() {
  assets.projectileSound()

  let X = SHIP.x + SHIP.w / 2 - SHIP.w / 6 / 2; let Y = SHIP.y
  let VY = CANVAS.height / -30
  let W = SHIP.w * 0.22; let H = SHIP.h * 0.25
  let C = "#7de5ec"

  let PROJECTILE = new Projectile( X, Y, VY, W, H, C )
  projectileStorage.push(PROJECTILE)
}

/////////////////////////////////////////////////////

let starStorage = []
let starBackgroundStorage = []

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

    if      (controls.keys.right && alive == true)  { star.vx = CANVAS.width / -700, starBg.vx = CANVAS.width / -1400 } 
    else if (controls.keys.left && alive == true)   { star.vx = CANVAS.width / 700, starBg.vx = CANVAS.width / 1400   } 
    else    { star.vx = 0, starBg.vx = 0                     }
    }
  }
  }
}

function pushBackgroundStar() {
  let randomXPos = Math.floor(Math.random() * CANVAS.width + 1)
  let X = randomXPos; let Y = 0
  let VX = 0; let VY = CANVAS.height / 400
  let W = CANVAS.width * 0.0075; let H = CANVAS.height * 0.0075
  let C = "gray"

  let STAR = new Star( X, Y, VX, VY, W, H, C )
  starBackgroundStorage.push(STAR)
}

function pushStar() {
  let randomXPos3 = Math.floor(Math.random() * CANVAS.width + 1)
  let X3 = randomXPos3; let Y3 = 0
  let VX3 = 0; let VY3 = CANVAS.height / 200
  let W3 = CANVAS.width * 0.01; let H3 = CANVAS.height * 0.01
  let randomC = Math.random()
  let C3 = "white"

  let STAR3 = new Star( X3, Y3, VX3, VY3, W3, H3, C3 )
  starStorage.push(STAR3)
}

/////////////////////////////////////////////////////

document.addEventListener("keydown", function(event) {
  if (event.key === "s") {
      toggleFullScreen();
  }
  if (event.key === " ") { 
    assets.backgroundMusic()
    main()
    window.meteorInterval = setInterval(() => { pushMeteor() }, 750 )
    window.projectileInterval = setInterval(() => { pushProjectile() }, 140) 
    window.bgStarInterval = setInterval(() => { pushBackgroundStar() }, 500)
    window.starInterval = setInterval(() => { pushStar() }, 325)
  }
});

function toggleFullScreen() {
    if (!document.fullscreenElement) { CANVAS.requestFullscreen();
    } else if (document.exitFullscreen) { document.exitFullscreen(); }
}

function main() {
  requestAnimationFrame(main)
  CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height)
  CONTEXT.imageSmoothingEnabled = false;

  starBackgroundStorage.forEach((STARBG) => {
    STARBG.update()
  })
  starStorage.forEach((STAR) => {
    STAR.update()
  })
  meteorStorage.forEach((METEOR) => {
    METEOR.update()
  })
  projectileStorage.forEach((PROJECTILE) => {
    PROJECTILE.update()
  })

  SHIP.update()

  if (alive == false) {
    clearInterval(projectileInterval)
  }
}
