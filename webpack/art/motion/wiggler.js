import makeColormap from 'colormap'

import { BoundsCheckedLattice } from './lattice'
import { MotionStrategy, reverse } from './strategies'
import { Cell } from './cell'

const hsv = makeColormap({
  colormap: 'hsv',
  nShades: 256,
  format: 'hex',
})

export class Wiggler extends BoundsCheckedLattice {
  constructor(w, h, {strat, radius, tightness, color} = {}) {
    super(w, h)

    Object.assign(this, {
      radius: radius || 5,
      tightness: tightness || -1.2,
    }) 

    this.strat = strat || new MotionStrategy(w, h)

    this.lattice = new Array(w).fill(null).map((_,i) =>
      new Array(h).fill(null).map((_, j) => 
        new Cell((2*i + 1) * this.radius, (2*j + 1) * this.radius, {
          r: this.radius,
          color: color || '#ff0000',
        })
      )
    )

    // Strat keeps track of position and direction, but we duplicate it here
    // and also keep track of previous direction for drawing cells.
    const {x, y, dir} = strat.randomize()
    Object.assign(this, {x, y, currDir: dir, prevDir: dir})
  }

  draw(p) {
    p.curveTightness(this.tightness)
    p.noFill()
    for (let i = 0; i < this.w; i++) {
      for (let j = 0; j < this.h; j++) {
        this.lattice[i][j].draw(p)
      }
    }
  }

  update() {
    const {x, y, dir} = this.strat.move()

    this.x = x
    this.y = y
    this.prevDir = this.currDir
    this.currDir = dir
    
    this.lattice[x][y].setDirection(
      reverse(this.prevDir), this.currDir)
  }
}

export class ColorChangingWiggler extends Wiggler {
  constructor(w, h, {
        colors = hsv, // Array of hex strings; colors to choose from.
        colorDrift = 1,    // int; range of possible updates per step.
        colorIdx,
        ...rest
      } = {}) {
    super(w, h, rest)
    this.colors = colors
    this.colorDrift = colorDrift
    this.colorIdx = colorIdx !== undefined ? colorIdx : ~~(Math.random() * colors.length)
  }

  update() {
    super.update()

    let update = ~~(2 * (Math.random() - 0.5) * this.colorDrift)
    this.colorIdx = (this.colorIdx + this.colors.length + update) % this.colors.length
    this.lattice[this.x][this.y].color = this.colors[this.colorIdx]
  }
}
