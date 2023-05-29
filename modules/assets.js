/////////////////////////////////////////////////////
///////////////////////////////////////////// SPRITES

// SHIP

export const SHIP_SPRITE = new Image()
SHIP_SPRITE.src = "./assets/sprites/SHIP_SPRITE.png"

// PROJECTILE

export const PROJECTILE_SPRITE = new Image()
PROJECTILE_SPRITE.src = "./assets/sprites/PROJECTILE_SPRITE.png"

// METEOR

export const METEOR_SPRITE = new Image()
METEOR_SPRITE.src = "./assets/sprites/METEOR_SPRITE.png"

export const METEOR_DAMAGED_SPRITE = new Image()
METEOR_DAMAGED_SPRITE.src = "./assets/sprites/METEOR_DAMAGED_SPRITE.png"

export const FRAGMENT_SPRITE = new Image()
FRAGMENT_SPRITE.src = "./assets/sprites/FRAGMENT_SPRITE.png"

////////////////////////////////////////////////////
///////////////////////////////////////////// AUDIOS

export function projectileSound() {
    let sound = new Audio("./assets/sounds/SHOOT_SOUND.wav")
    sound.play()
    sound.volume = 0.02
}

export function meteorExplodeSound() {
    let sound = new Audio("./assets/sounds/EXPLOSION_SOUND.wav")
    sound.play()
    sound.volume = 0.2
}

export function meteorDamagedSound() {
  let sound = new Audio("./assets/sounds/METEOR_DAMAGED_SOUND.wav")
  sound.play()
  sound.volume = 0.2
}

export function backgroundMusic() {
  let sound = new Audio("./assets/sounds/theme.mp3")
  sound.play()
  sound.volume = 0.6
}
