import { BoundsCheckedLattice } from './lattice'

export const EIGHT = {
  NW: [-1, -1],
  N: [0, -1],
  NE: [1, -1],
  E: [1, 0],
  SE: [1, 1],
  S: [0, 1],
  SW: [-1, 1],
  W: [-1, 0],
}

export const FOUR = {
  N: [0, -1],
  E: [1, 0],
  S: [0, 1],
  W: [-1, 0],
}

export const OPP = {
  N: 'S',
  S: 'N',
  E: 'W',
  W: 'E',
  NW: 'SE',
  SE: 'NW',
  NE: 'SW',
  SW: 'NE',
}

export function reverse([x, y]) {
  return [-x, -y]
}

/**
 * A mobility defines a range of motion across a grid, defining the
 * directions one can move from one cell to the next.
 */
export class MotionStrategy extends BoundsCheckedLattice {
  constructor(w, h, {directions, blocks, homophobia}) {
    super(w, h)
    Object.assign(this, {
      directions: directions || EIGHT,
      blocks: blocks || [],
      // homophobia is bias towards continuing in a straight line.
      homophobia: homophobia || 0.5,
    })
  }

  // Set initial point and direction
  randomize() {
    let dir = randomItem(Object.keys(this.directions))
    let x, y
    do {
      x = ~~(Math.random() * this.w) 
      y = ~~(Math.random() * this.h)
    } while (this.isBlocked(x, y)); // TODO: This can get pretty slow -- maybe precalculate unblocked points?

    Object.assign(this, {x, y, dir})
    return {x, y, dir: this.directions[dir]}
  }

  move() {
    this.dir = this.getMove(this.x, this.y, this.dir)

    let [dx, dy] = this.directions[this.dir]
    this.x += dx
    this.y += dy

    return {x: this.x, y: this.y, dir: [dx, dy]}
  }


  getMove(x, y, current) {
    const preferred = this.preferredDirections(x, y, current)
    const allowed = this.allowedDirections(x, y, current)
    if (Math.random() < this.homophobia && allowed.includes(current)) {
      return current
    }
    if (preferred.length > 0) {
      return randomItem(preferred)
    }
    return randomItem(allowed)
  }

  allowedDirections(x, y, current) {
    return Object.keys(this.directions).filter(d => {
      let [dx, dy] = this.directions[d]
      return (d != OPP[current] && !this.isBlocked(x + dx, y + dy)) 
    })
  }

  preferredDirections(x, y, dir) {
    return this.allowedDirections(x, y, dir)
  }

  isBlocked(x, y) {
    if (this.isOutOfBounds(x, y)) {
      return true
    }

    for (let region of this.blocks) {
      if (region.isBlocked(x, y)) {
        return true
      }
    }

    return false
  }
}

export class PathAvoidingStragegy extends MotionStrategy {
  constructor(w, h, {path, ...rest} = {}) {
    super(w, h, rest)
    this.path = path
  }

  preferredDirections(x, y, dir) {
    return this.allowedDirections(x, y, dir).filter(d => {
      let [dx, dy] = this.directions[d]
      return !this.path.contains(x + dx, y + dy)
    })
  }
}

function randomItem(list) {
  return list[~~(Math.random() * list.length)]
}
