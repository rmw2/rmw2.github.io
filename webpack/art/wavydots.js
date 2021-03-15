import colormap from 'colormap'

export default function sketch(p) {
  let waves = []
  p.setup = function setup() {
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.background(0)
    
    waves.push(
      new FlowingWavySnowflake(p.windowWidth / 2, p.windowHeight / 2)
      // new FlowingDottedWave(50, p.windowHeight / 2, p.windowWidth - 50, p.windowHeight / 2),
      //      new FlowingDottedWave(50, p.windowHeight / 2, p.windowWidth - 50, p.windowHeight / 2)
    )
  }

  p.draw = function draw() {
    p.background(0)
    for (let wave of waves) {
      wave.draw(p)
    }
  }
}

class DottedWave {
  constructor(x0, y0, x1, y1, params = {}) {
    this.points = {x0, y0, x1, y1}      
    this.params = {
      gap: 20,
      amp: 200,
      mapname: 'portland',
      offset: 1,
      freq: 2,
      phase: 0,
    }
    Object.assign(this.params, params)
  }

  draw(p) {
    const { x0, y0, x1, y1 } = this.points
    const { phase, gap, amp, offset, freq, mapname } = this.params

    let width = x1 - x0
    let height = y1 - y0
    let rise = height / width

    let points = [x0 - gap, y0 - rise * gap - amp * Math.sin(Math.PI * (x0 - gap) / width)]
    if (offset > 0) {
      points.push(x0, y0)
    }

    for (let x = x0 + offset; x <= x1; x += gap) {
      let y = y0 + rise * (x - x0) + amp * Math.sin(freq * Math.PI * x / width + phase) 
      points.push(x, y)
    }

    let colors = colormap({
      colormap: mapname,
      nShades: parseInt(points.length / 4),
      format: 'hex'
    }) 
    for (let i = colors.length, last = colors[colors.length - 1]; i < points.length; i++) {
      colors.push(last)
    }

    p.noFill()
    p.strokeWeight(1)
    p.curveTightness(0.1)
    for (let i = 0; i < points.length - 8; i += 4) {
      let curve = points.slice(i, i + 8) 
      p.stroke(p.color(colors[i / 4]))
      p.curve(...curve)
    }
  
    // Guide line
    p.stroke(255, 255, 255, 50)
    p.line(x0, y0, x1, y1)

  }
}

class FlowingDottedWave extends DottedWave {
  constructor(...args) {
    super(...args)
    this.params.direction = 1
  }

  draw(p) {
    // Make the dotted line wiggle
    this.params.offset = (this.params.offset + 0.1) % (this.params.gap*2)
    // Adjust the frequency & phase
    this.params.freq += this.params.direction / 10
    this.params.phase += this.params.direction * this.params.freq * Math.PI / 16

    if (Math.random() < 0.1)  {
      this.params.amp += 10 * (Math.random() - 0.5)
    }
    if (Math.random() < 0.01) {
      this.params.direction *= -1
    }
    if (Math.random() < 0.01) {
      this.params.gap += this.params.direction
    }
    super.draw(p)
  }
}

class FlowingWavySnowflake {
  constructor(cx, cy, len = 400, n = 4, params = {amp: 100, freq: 4}) {
    this.waves = []    
    for (let i = 0; i < n; i++) {
      const theta = (2*i + 1) * Math.PI / n 
      this.waves.push(
        new DottedWave(cx, cy, cx + len * Math.cos(theta), cy + len * Math.sin(theta))
      )
    }
  }

  draw(p) {
    for (const wave of this.waves) {
      wave.params.offset = (wave.params.offset + 0.1) % (wave.params.gap*2)
      wave.draw(p)
    }
  }
}

