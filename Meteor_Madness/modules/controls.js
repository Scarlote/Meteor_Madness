export let keys = { right: false, left: false }

addEventListener("keydown", e => {
  if (e.key == "ArrowRight" || e.key == "d" || e.key == "D") { keys.right = true }
  if (e.key == "ArrowLeft" || e.key == "a" || e.key == "A") { keys.left = true }
})
addEventListener("keyup", e => {
  if (e.key == "ArrowRight" || e.key == "d" || e.key == "D") { keys.right = false } 
  if (e.key == "ArrowLeft" || e.key == "a" || e.key == "A") { keys.left = false }
})