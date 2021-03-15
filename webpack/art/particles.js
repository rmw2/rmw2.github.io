const FRAME_RATE = 30

export default function sketch(p) {
  let swarm 
  p.setup = function setup() {
    p.background(0)
    p.frameRate(FRAME_RATE)
    p.createCanvas(p.windowWidth, p.windowHeight)
    swarm = new ParticleSwarm(p.windowWidth, p.windowHeight)
  }

  p.draw = function draw() {
    p.clear()
    swarm.draw(p)
  }
}

const GRAVITATIONAL_CONSTANT = 10e7
const CONNECT_THRESHOLD = 100
const N_PARTICLES = 50 
const MAX_VELOCITY = 3
const MAX_R = 8

class ParticleSwarm {
  constructor(width, height, n = N_PARTICLES) {
    this.particles = new Array(n).fill(0).map(_ => new Particle(width, height))
  }

  draw(p) {
    for (const particle of this.particles) {
      // Draw each particle 
      particle.update()
      particle.draw(p) 
    }

    // Draw lines between nearby particles
    for (const i in this.particles) {
      for (const other of this.particles.slice(i))  {
        let current = this.particles[i]
        let {x: x1, y: y1} = current
        let {x: x2, y: y2} = other 

        // Don't let dist be zero for division reasons.
        let dist = p.dist(x1, y1, x2, y2) || 1
        if (dist < CONNECT_THRESHOLD) {
          // Calculate gravity and update particle velocities
          let f = GRAVITATIONAL_CONSTANT * current.mass * other.mass / (dist * dist)

          // Decompose force along x/y axes.
          let fy = (y2 - y1) / dist
          let fx = (x2 - x1) / dist
      
          // Accelerate each particle according to gravitational force.
          let dt = 1 / FRAME_RATE
          current.vx += dt * fx / current.mass
          current.vy += dt * fy / current.mass

          other.vx -= dt * fx / other.mass
          other.vy -= dt * fy / other.mass

          let closeness = CONNECT_THRESHOLD / dist
          let opacity = Math.min(0.05 * closeness, 0.9)
          let color = `rgba(255,255,255,${opacity.toFixed(2)})`
          p.stroke(color)
          p.line(x1, y1, x2, y2)
        }
      }
    }
  }
}


class Particle {
  constructor(width, height) {
    this.width = width
    this.height = height

    this.x = random(0, width)
    this.y = random(0, height)
    this.r = random(1, MAX_R)
    this.vx = random(-MAX_VELOCITY, MAX_VELOCITY)
    this.vy = random(-MAX_VELOCITY, MAX_VELOCITY)

    this.mass = this.r * this.r
  }
  
  draw(p) {
    // p.noStroke()
    p.fill('rgba(255,255,255,0.25)')
    p.stroke('rgba(255,255,255,0.25)')
    p.ellipse(this.x, this.y, this.r)
  }

  update() {
    // Slow down if we hit some max.
    if (Math.abs(this.vx) > MAX_VELOCITY) {
      this.vx *= 0.98
    }
    if (Math.abs(this.vy) > MAX_VELOCITY) {
      this.vy *= 0.95    
    }
    if (this.x < 0 || this.x > this.width)
      this.vx *= -1
    if (this.y < 0 || this.y > this.height)
      this.vy *= -1
    this.x += this.vx
    this.y += this.vy
  }
}

function random(lo, hi) {
  return lo + (hi - lo) * Math.random()
}
