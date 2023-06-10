/////////////////////////////////////////////////////
///////////////////////////////////////////// SPRITES

// SHIP

export const SHIP_SPRITE = new Image()
SHIP_SPRITE.src = "../Meteor_Madness/assets/sprites/SHIP_SPRITE.png"

// PROJECTILE

export const PROJECTILE_SPRITE = new Image()
PROJECTILE_SPRITE.src = "../Meteor_Madness/assets/sprites/PROJECTILE_SPRITE.png"

// METEOR

export const METEOR_SPRITE = new Image()
METEOR_SPRITE.src = "../Meteor_Madness/assets/sprites/METEOR_SPRITE.png"

export const METEOR_DAMAGED_SPRITE = new Image()
METEOR_DAMAGED_SPRITE.src = "../Meteor_Madness/assets/sprites/METEOR_DAMAGED_SPRITE.png"

export const FRAGMENT_SPRITE = new Image()
FRAGMENT_SPRITE.src = "../Meteor_Madness/assets/sprites/FRAGMENT_SPRITE.png"

////////////////////////////////////////////////////
///////////////////////////////////////////// AUDIOS

export function projectileSound() {
    let sound = new Audio("../Meteor_Madness/assets/sounds/PROJECTILE_SOUND.mp3")
    sound.play(), sound.volume = 0.03
}

export function meteorExplodeSound() {
    let sound = new Audio("../Meteor_Madness/assets/sounds/EXPLOSION_SOUND.wav")
    sound.play(), sound.volume = 0.1
}

export function meteorDamagedSound() {
  let sound = new Audio("../Meteor_Madness/assets/sounds/METEOR_DAMAGED_SOUND.wav")
  sound.play(), sound.volume = 0.1
}

export let sound = new Audio()
export function backgroundMusic() {
  sound = new Audio("../Meteor_Madness/assets/sounds/BACKGROUND_SOUND.mp3")
  sound.play(), sound.volume = 0.1
}
