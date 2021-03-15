import p5 from 'p5'
import 'p5/lib/addons/p5.sound'
import colormap from 'colormap'

import DSP from './dsp'
import { HarmonicSpirals } from './circles'

export default function sketch(p) {
  let audio, dsp, sprites = [], playing = false
  const nSpirals = 16
  const cmap = colormap({
    colormap: 'cubehelix',
    nShades: 4 * nSpirals,
    format: 'hex',
  }) 

  p.preload = function preload() {
    audio = p.loadSound('./assets/mp3/voodoo.mp3')
  }
  
  p.setup = function setup() {
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.background(0)

    dsp = new DSP(audio)

    sprites.push(new MusicalHarmonicSpirals(dsp, p.windowWidth / 2, p.windowHeight / 2, {
      nSpirals,
      loops: 2,
      innerRadius: 10,
      outerRadius: Math.max(p.windowWidth, p.windowHeight) / 2 + 100,
      colors: cmap.concat(cmap.reverse())
    }))
  }

  p.draw = function draw() {
    p.background(0,0,0,200)
    dsp.update()
    p.noStroke()
    for (const s of sprites) {
      s.draw(p)
    }
  }
  
  function toggle()  {
    if (!playing) {
      console.log('playing')
      audio.play()
      // audio.play(0, 1, 1, 40)
    } else {
      console.log('pausing')
      audio.pause()
    }
    playing = !playing
  }

  p.touchStarted = toggle
}

class MusicalHarmonicSpirals extends HarmonicSpirals {
  constructor(dsp, cx, cy, {...rest}) {
    super(cx, cy, {...rest}) 

    this.dsp = dsp
  }

  draw(p) {
    const { logSpectrum, bass, centroid } = this.dsp

    let centroidOffset = Math.trunc(centroid / 20)
    console.log(centroidOffset % this.colors.length)
    this.spirals.map((s, i) => {
      s.circleRadius = this.circleRadius * (0.1 + 2 * logSpectrum[i + 5] * logSpectrum[i + 5])
      s.innerRadius = this.innerRadius * (1 + bass)

      let colorIdx = (i + centroidOffset) % this.colors.length
      let color = this.colors[colorIdx]
      s.color = color
    })
    super.draw(p)
  }
}
