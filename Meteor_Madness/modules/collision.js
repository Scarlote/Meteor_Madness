export function collisionDetection(e1, e2) {
  if (e1.x < e2.x + e2.r
   && e1.x + e1.w > e2.x - e2.r
   && e1.y < e2.y + e2.r
   && e1.y + e1.h > e2.y - e2.r) {

    return true

  } else if (e1.x < e2.x + e2.w
          && e1.x + e1.w > e2.x
          && e1.y < e2.y + e2.h
          && e1.y + e1.h > e2.y) {

    return true

  } else {

    return false

  }
}