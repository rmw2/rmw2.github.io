
export class Cell {
  constructor(x, y, {r, color, stroke, dots, useCache = true} = {}) {
    // x & y represent top left corner of box
    Object.assign(this, {
      x, y, 
      r: r || 10, 
      color: color || '#fff', 
      stroke: stroke || 5,
      dots: dots || false,
      useCache: useCache,
      rendered: true,
    }) 
    this.start = null
    this.end = null
  }

  draw(p) { 
    if (this.useCache) {
      if (this.rendered) return
      // Start by clearing square
      p.fill(0)
      p.noStroke()
      p.rect(this.x - this.r, this.y - this.r, 2*this.r, 2*this.r)
    }

    if (this.dots) {
      p.strokeWeight(10)
      p.stroke('#ffffff')
      p.point(this.x, this.y)
    }

    if (!this.start || !this.end) {
      return
    }

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

    this.rendered = true
  }

  setDirection(start, end) {
    this.start = start
    this.end = end
    this.rendered = false
  }

  isEmpty() {
    return !this.start || !this.end
  }

  // Relevant if useCacheing is enabled.
  clear() {
    this.start = null
    this.end = null
    this.rendered = false
  }
}
