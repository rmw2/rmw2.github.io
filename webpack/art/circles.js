import colormap from 'colormap'

export default function sketch(p) {
  let sprites = []
  const nSpirals = 16
  p.setup = function setup() {
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.background(0)
    sprites.push(new HarmonicSpirals(p.windowWidth / 2, p.windowHeight / 2, {
      nSpirals,
      outerRadius: Math.max(p.windowWidth, p.windowHeight) / 2 + 100,
      colors: colormap({
        colormap: 'earth',
        nShades: nSpirals,
        format: 'hex',
      })      
    }))
  }

  p.draw = function draw() {
    p.background(0,0,0,100)
    for (const s of sprites) {
      s.draw(p)
    }
  }
}

export class CircleWheel {
  constructor(cx, cy, {n, outerRadius, circleRadius, color, theta0}) {
    Object.assign(this, {
      cx, cy, 
      n: n || 10, 
      outerRadius: outerRadius || 300, 
      circleRadius: circleRadius || 50, 
      color: color || '#aabacf',
      theta0: theta0 || 0,
    })
  }

  draw(p) {
    for (let i = 0, theta = this.theta0; i < this.n; i++, theta += 2 * Math.PI / this.n) {
      let cx = this.cx + this.outerRadius * Math.cos(theta)
      let cy = this.cy + this.outerRadius * Math.sin(theta)

      p.fill(this.color)
      p.ellipse(cx, cy, this.circleRadius)
    }
  }
}

export class CircleSpiral {
  constructor(cx, cy, {n, outerRadius, innerRadius, circleRadius, color, theta0, loops}) {
    Object.assign(this, {
      cx, cy, 
      n: n || 10, 
      outerRadius: outerRadius || 300, 
      innerRadius: innerRadius || 100,
      circleRadius: circleRadius || 50, 
      color: color || '#aabacf',
      theta0: theta0 || 0,
      loops: loops || 1,
    })
  }
  
  draw(p) {
    let dTheta = 2 * this.loops * Math.PI / this.n
    let dR = (this.outerRadius - this.innerRadius) / this.n
    for (let i = 0, theta = this.theta0, r = this.innerRadius; i < this.n; i++, r += dR, theta += dTheta) {
      let cx = this.cx + r * Math.cos(theta)
      let cy = this.cy + r * Math.sin(theta)

      p.fill(this.color)
      p.ellipse(cx, cy, this.circleRadius)
    }
  }
}

export const RotationMixin = (Superclass) => class extends Superclass {
  constructor(cx, cy, {vtheta, ...rest}) {
    super(cx, cy, {...rest})

    this.vtheta = vtheta || 0
  }

  draw(p) {
    this.theta0 += this.vtheta

    super.draw(p)
  }
}

export const RotatingCircleWheel = RotationMixin(CircleWheel)
export const RotatingCircleSpiral = RotationMixin(CircleSpiral)

export class HarmonicSpirals {
  constructor(cx, cy, {circleRadius, innerRadius, outerRadius, loops, nCircles, nSpirals, colors}) {
    Object.assign(this, {
      cx, cy,
      loops: loops || 3,
      circleRadius: 10,
      innerRadius: innerRadius || 50,
      outerRadius: outerRadius || 600,
      nCircles: nCircles || 31,
      nSpirals: nSpirals || 16,
      colors: colors || [],
    })

    if (colors.length && colors.length < nSpirals) {
      throw new Error(`Colors array must have at least as many colors as number of spirals (${this.nSpirals})`)
    }

    this.spirals = []
    for (let i = 1; i < this.nSpirals + 1; i++) {
      this.spirals.push(new RotatingCircleSpiral(cx, cy, {
        n: this.nCircles,
        loops: 4,
        circleRadius: this.circleRadius,
        innerRadius: this.innerRadius,
        outerRadius: this.outerRadius,
        vtheta: (i % 2 ? -1 : 1) * Math.PI / (64 + i),
        color: this.colors[i - 1],
      }))
    }
  }

  draw(p) {
    this.spirals.map(s => s.draw(p))
  }
}
