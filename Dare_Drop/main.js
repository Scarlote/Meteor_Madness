//import * as assets from "./modules/assets.js"
import * as controls from "./modules/controls.js"

/////////////////////////////////////////////////////

const CANVAS = document.getElementById("dd-canvas")
const CONTEXT = CANVAS.getContext("2d")

CANVAS.width = document.querySelector(".slide").clientWidth, CANVAS.height = document.querySelector(".slide").clientHeight

/////////////////////////////////////////////////////

const GRAVITY = CANVAS.height / 3000

class Player {
  constructor() {
    this.x = CANVAS.width / 2, this.y = CANVAS.height / 2
    this.vx = 0, this.vy = 0
    this.r = CANVAS.width * 0.035
    this.c = "white"
  } 
  draw() {
    CONTEXT.beginPath()
    CONTEXT.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    CONTEXT.fillStyle = this.c, CONTEXT.fill()
  }
  update() {
    this.draw()

    this.x += this.vx, this.y += this.vy

    if (this.y + this.r + this.vy <= CANVAS.height) { 
      this.vy += GRAVITY
    } else { this.vy = 0 }

    if      (controls.keys.right) { 
      if (this.vx < 3) { this.vx += CANVAS.width / 3500 }
    }
    else if (controls.keys.left) { 
      if (this.vx > -3) { this.vx += CANVAS.width / -3500 }
    }
  }
}

const PLAYER = new Player()

/////////////////////////////////////////////////////

let platformStorage = []

class Platform {
  constructor( x, y, w, h, vy, c ) {
    this.x = x, this.y = y
    this.w = w, this.h = h
    this.vy = vy
    this.c = c
  }
  draw() {
    CONTEXT.fillStyle = this.c
    CONTEXT.fillRect(this.x, this.y, this.w, this.h)
  }
  update() {
    this.draw()

    this.y += this.vy

    if (PLAYER.y + PLAYER.r > this.y
     && PLAYER.y - PLAYER.r < this.y
     && PLAYER.x + PLAYER.r > this.x
     && PLAYER.x - PLAYER.r < this.x + this.w) {
      PLAYER.vy = this.vy
    }
  }
}

function pushPlatform() {
  let randomX = Math.floor(Math.random() * CANVAS.width)
  let X = randomX
  let Y = CANVAS.height
  let W = CANVAS.width * 0.2; let H = CANVAS.height * 0.025
  let VY = CANVAS.height / -500
  let C = "coral"

  let PLATFORM = new Platform( X, Y, W, H, VY, C )
  platformStorage.push(PLATFORM)
}

/////////////////////////////////////////////////////

class Wall {
  constructor( x, y ) {
    this.x = x, this.y = y
    this.w = CANVAS.width * 0.15, this.h = CANVAS.height
    this.c = "black"
  }
  draw() {
    CONTEXT.fillStyle = this.c
    CONTEXT.fillRect(this.x, this.y, this.w, this.h)
  }
  update() {
    this.draw()
  }
}

const WALLS = [
  new Wall( 0, 0 ),
  new Wall( CANVAS.width - CANVAS.width * 0.15, 0 )
]

/////////////////////////////////////////////////////

function ddStart() {
  document.getElementById("dd-main").style.display = "none"
  document.getElementById("dd-loading").style.display = "flex"
  document.getElementById("dd-loader").style.animation = "load 3s forwards"

  setTimeout(() => {
    document.getElementById("dd-loading").style.display = "none"
    main()
    window.platformInterval = setInterval(() => { pushPlatform() }, 2500) 
  }, 3500)
}

document.getElementById("dd-start-btn").onclick = () => { ddStart() }
document.getElementById("dd-fullscreen-btn").onclick = () => { 
  document.getElementById("dd-slide").requestFullscreen()
  document.getElementById("dd-slide").style.border = "0px 25rem 0px 25rem"
  ddStart()
}


document.getElementById("dd-restart-btn").onclick = () => {
  window.location.reload()
}

function main() {
  requestAnimationFrame(main)
  CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height)
  CONTEXT.imageSmoothingEnabled = false;

  platformStorage.forEach((PLATFORM) => {
    PLATFORM.update()
  })

  PLAYER.update()
  WALLS.forEach((WALL) => {
    WALL.update()
  })
}