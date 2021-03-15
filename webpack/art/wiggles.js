import colormap from 'colormap'

const hsv = colormap({
  colormap: 'hsv',
  nshades: 256,
  format: 'hex',
})

const FRAME_RATE = 30

export default function sketch(p) {
  let lattice
  p.setup = function() {
    p.frameRate(FRAME_RATE)
    p.createCanvas(p.windowWidth, p.windowHeight)
    lattice = new LatticeWiggler(p.windowWidth, p.windowHeight)
  }

  p.draw = function() {
    p.background(0)
    lattice.draw(p)
    lattice.update()
  }
}

export function subway(p) {
  let lattice
  p.setup = function() {
    p.frameRate(60)
    p.createCanvas(p.windowWidth, p.windowHeight)
    lattice = new Subway(p.windowWidth, p.windowHeight)
  }

  p.draw = function() {
    p.background(0)
    lattice.draw(p)
    lattice.update()
  }
}


class LatticeWiggler {
  constructor(w, h, {directions, radius, colormap, max, bias, tightness} = {tightness: -1.2, directions: EIGHT, radius: 10, colormap: hsv, bias: 0.5}) {
    Object.assign(this, {
      w, h, radius, colormap, directions, tightness, bias,
      cols: Math.floor(w / (2 * radius)),
      rows: Math.floor(h / (2 * radius)),
    })

    this.max = max || this.rows * this.cols / 3

    // Initialize lattice of empty cells
    this.lattice = new Array(this.cols).fill(null).map((_,i) =>
      new Array(this.rows).fill(null).map((_, j) => 
        new Cell((2*i + 1) * radius, (2*j + 1) * radius, {r: radius})
      )
    )

    this.x = Math.floor(this.cols / 2)
    this.y = Math.floor(this.rows / 2)
    this.dir = randomKey(directions)
    this.prev = this.dir
    // Keep a reverse colormap for going backwards.
    this.colorIdx = 0
    this.mapcolor = colormap.reduce((acc, curr, i) => ({[curr]: i, ...acc}), {})
    console.log(this.mapcolor)

    // Keep track of previous points for walking back.
    this.path = []
  }

  draw(p) {
    p.curveTightness(this.tightness)
    p.noFill()
    for (const [i, j] of this.path) {
      this.lattice[i][j].draw(p)
    }
  }

  update() { 
    this.path.unshift([this.x, this.y])
    if (this.path.length > this.max)
      this.path.pop()

    this.prev = this.dir
    
    this.dir = this.move()
    const [stepX, stepY] = this.directions[this.dir]
    
    // Update previous lattice point now that direciton is picked.
    this.lattice[this.x][this.y]
      .setDirection(
        this.directions[OPP[this.prev]], 
        this.directions[this.dir])

    // Play with the color a lil bit.
    this.lattice[this.x][this.y].color = this.colormap[this.colorIdx]
    this.colorIdx = cycleWalk(this.colormap.length, this.colorIdx, 4)
    this.colorBreathe(this.colorIdx)

    // Finally update position.
    this.x += stepX
    this.y += stepY
  }

  colorBreathe(idx) {
    for (const [i, j] of this.path) {
      let cell = this.lattice[i][j]
      idx = cycleAvg(this.colormap.length, this.mapcolor[cell.color], idx)
      idx = cycleWalk(this.colormap.length, idx, 3)
      cell.color = this.colormap[idx]
    }
  }

  outOfBounds(stepX, stepY) {
    return  (
      this.x + stepX >= this.cols
      || this.x + stepX < 0
      || this.y + stepY >= this.rows
      || this.y + stepY < 0
    )
  }


  move() {
    // Update direction by calculating allowed dirs and selecting randomly.
    let canContinue = false
    let couldContinue = false
    const bestDirs = []
    const preferredDirs = []
    const allowedDirs = []

    // Check each direction for viability
    for (let d of Object.keys(this.directions)) {
      let [stepX, stepY] = this.directions[d]
      if (d == OPP[this.prev] || this.outOfBounds(stepX, stepY))
        continue
      allowedDirs.push(d)

      // Prefer not revisiting the same cell.
      if (this.lattice[this.x + stepX][this.y + stepY].isEmpty()) {
        if (d == this.dir)
          couldContinue = true
        preferredDirs.push(d)
      }

      // Most prefer not crossing lines at all.
      if (false) {
        if (d == this.dir) 
          canContinue = true
      }
    } 

    if (Math.random() < this.bias && couldContinue) 
      return this.dir
    if (bestDirs.length > 0) 
      return randomItem(bestDirs)
    if (preferredDirs.length > 0) 
      return randomItem(preferredDirs)
    return randomItem(allowedDirs)
  }
}

class Subway extends LatticeWiggler {
  constructor(w, h, opts) {
    super(w, h, opts) 
    this.max = Number.MAX_SAFE_INTEGER
    this.tightness = 0
    this.directions = FOUR
    // Initialize lattice of empty cells
    this.lattice = new Array(this.cols).fill(null).map((_,i) =>
      new Array(this.rows).fill(null).map((_, j) => 
        new Cell((2*i + 1) * this.radius, (2*j + 1) * this.radius, {r: this.radius, dots: true})
      )
    )
  }

  colorBreathe() {}

  move() {
    const allowedDirs = []
    let canContinue = false
    // Check each direction for viability
    for (let d of Object.keys(this.directions)) {
      let [stepX, stepY] = this.directions[d]
      if (d == OPP[this.prev] || this.outOfBounds(stepX, stepY))
        continue
      if (d == this.dir)
        canContinue = true
      allowedDirs.push(d)
    }
    if (canContinue && Math.random() < this.bias)
      return this.dir
    return randomItem(allowedDirs)
  }
}

function cycleWalk(len, i, step = 1) {
  // Update between -step and step
  const update = Math.round(step * (2 * Math.random() - 1))
  return (len + i + update) % len
}

// Return the midpoint between two indices on a circular buffer.
function cycleAvg(len, a, b) {
  // If they're more than half away, go around back.
  if (Math.abs(a - b) > len / 2)  {
    let max = Math.max(a, b)
    let min = Math.min(a, b)
    let avg = (max - len + min) / 2
    return Math.round(len + avg) % len
  }
  return Math.round((a + b) / 2)
}

class Cell {
  constructor(x, y, {r, color, stroke, dots}) {
    // x & y represent top left corner of box
    Object.assign(this, {
      x, y, 
      r: r || 10, 
      color: color || '#fff', 
      stroke: stroke || 5,
    }) 
    this.start = null
    this.end = null
  }

  draw(p) { 
    if (!this.start || !this.end) return
    const [dxStart, dyStart] = this.start
    const [dxEnd, dyEnd] = this.end
    // Current points on the edges of this cell. 
    const x1 = this.x + dxStart * this.r
    const y1 = this.y + dyStart * this.r
    const x2 = this.x + dxEnd * this.r
    const y2 = this.y + dyEnd * this.r

    // Previous and next centers, for curve making
    const xp = this.x + 2 * dxStart * this.r
    const yp = this.y + 2 * dyStart * this.r
    const xa = this.x + 2 * dxEnd * this.r
    const ya = this.y + 2 * dyEnd * this.r

    p.stroke(this.color)
    p.strokeWeight(this.stroke)
    p.curve(xp, yp, x1, y1, x2, y2, xa, ya)
    if (this.dots && dxStart == -dxEnd && dyStart == -dyEnd) {
      p.stroke('#fff')
      p.point(this.x, this.y)
    }
  }

  setDirection(start, end) {
    this.start = start
    this.end = end
  }

  isEmpty() {
    return !this.start || !this.end
  }
}

const EIGHT = {
  NW: [-1, -1],
  N: [0, -1],
  NE: [1, -1],
  E: [1, 0],
  SE: [1, 1],
  S: [0, 1],
  SW: [-1, 1],
  W: [-1, 0],
}

const FOUR = {
  N: [0, -1],
  E: [1, 0],
  S: [0, 1],
  W: [-1, 0],
}

const OPP = {
  N: 'S',
  S: 'N',
  E: 'W',
  W: 'E',
  NW: 'SE',
  SE: 'NW',
  NE: 'SW',
  SW: 'NE',
}

function randomKey(obj) {
  const keys = Object.keys(obj)
  const idx = Math.floor(Math.random() * keys.length)
  return keys[idx]
}

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)]
}
