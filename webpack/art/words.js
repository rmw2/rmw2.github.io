import 'p5/lib/addons/p5.sound'
import colormap from 'colormap'

import DSP from './dsp'
import { Cell } from './motion/cell'
import { ColorChangingWiggler } from './motion/wiggler'
import { MotionStrategy, FOUR } from './motion/strategies'
import { LatticePath, BlockRegion } from './motion/lattice'
import { Word, CenterFramedWord, fatten, invert, LETTERS } from './motion/letters'

import { MusicalHarmonicSpirals } from './harmonic'

const hsv = colormap({
  colormap: 'hsv',
  nshades: 256,
  format: 'hex',
})

const FRAME_RATE = 30
const MOBILE_SIZE = 650

const EMMA = [LETTERS.e, LETTERS.m, LETTERS.m, LETTERS.a]

export function emma(p) {
  let fg, bg, buf, audio, playing, dsp, font
  let W, H

  let funThreshold = 23
  let tx, ty

  const nSpirals = 8
  const cmap = colormap({
    colormap: 'cubehelix',
    nShades: 4 * nSpirals,
    format: 'hex',
  }) 

  p.preload = function preload() {
    audio = p.loadSound('./assets/mp3/peurdesfilles.mp3')
  }

  p.setup = function() {
    W = p.windowWidth
    H = p.windowHeight

    p.frameRate(FRAME_RATE)
    p.createCanvas(W, H)

    buf = p.createGraphics(W, H)
    fg = new SwoopyLetters(W, H)

    dsp = new DSP(audio)
    bg = new MusicalHarmonicSpirals(dsp, W / 2, H / 2, {
      nSpirals,
      loops: 2,
      innerRadius: 300,
      outerRadius: Math.max(W, H) / 2 + 100,
      colors: cmap.concat(cmap.reverse())
    })

    p.background(0)
    // Text location
    tx = W / 2
    ty = H / 2 - 200

    p.textAlign(p.CENTER, p.CENTER)
    p.textSize(36)
    p.textFont('Comic Sans')
  }

  p.draw = function() {
    p.background(0, 0, 0, 200)
    dsp.update()

    let t = audio.currentTime()

    if (t > funThreshold) {
      bg.draw(p)

      // Draw birthday message
      p.fill(55 + 200 * dsp.treble)

      if (Math.random() < 0.05) {
        tx = (W / 2 - 200) + ~~(Math.random() * 400)
        ty = Math.random() > 0.5 ? H / 2 - 200 - ~~(Math.random() * 200) : H / 2 + 200 + ~~(Math.random() * 200)
      }
      p.text('happy birthday', tx, ty)
    }
    fg.draw(buf)

    p.drawingContext.globalAlpha = dsp.bass * dsp.bass * Math.min((1 + t) / funThreshold, 1)
    p.image(buf, 0, 0)
    p.drawingContext.globalAlpha = 1

    if (playing) {
      fg.update()
    } else {
      p.fill(255)
      p.text('click me :)', W/2, H/2)
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

class SwoopyLetters {
  constructor(w, h, {letters, radius, colors} = {}) {
    Object.assign(this, {
      w, h,
      letters: (letters || EMMA).map(l => fatten(l, 3)),
      radius: radius || 10,
      colors: colors || colormap({
        colormap: 'hsv',
        nShades: 256,
        format: 'hex',
      })
    })

    Object.assign(this, {
      cols: Math.floor(w / this.radius),
      rows: Math.floor(h / this.radius),
    })

    this.word = new Word(this.letters)
    this.framed = new CenterFramedWord(this.cols, this.rows, this.word)
    let wiggle = (mask) => new ColorChangingWiggler(this.cols, this.rows, {
        colors: this.colors,
        colorDrift: 5,
        strat: new MotionStrategy(this.cols, this.rows, {
          blocks: [new BlockRegion(invert(mask))]
        })
      })
    let masks = this.framed.letterMasks()
    this.wigglers = []
    for (let i = 0; i < masks.length; ++i) {
      this.wigglers.push(wiggle(masks[i]), wiggle(masks[i]))
    }
  }

  draw(p) {
    this.wigglers.map(w => w.draw(p))
  }

  update() {
    this.wigglers.map(w => w.update())
  }
}

class WigglyNegativeSpaceLetters {
  constructor(w, h, {letters, radius = 10, colors, nWigglers = 10} = {}) {
    Object.assign(this, {
      w, h, nWigglers, radius,
      letters: (letters || EMMA).map(l => fatten(l, 3)),
      colors: colors || colormap({
        colormap: 'hsv',
        nShades: 256,
        format: 'hex',
      }),
    })

    Object.assign(this, {
      cols: Math.floor(w / this.radius),
      rows: Math.floor(h / this.radius),
    })

    this.word = new Word(this.letters)
    this.framed = new CenterFramedWord(this.cols, this.rows, this.word)
    let block = new BlockRegion(this.framed.frame)
    
    this.wigglers = []
    for (let i = 0; i < nWigglers; ++i) {
      this.wigglers.push(
        new ColorChangingWiggler(this.cols, this.rows, {
          colors: this.colors,
          colorDrift: 5,
          strat: new MotionStrategy(this.cols, this.rows, {
            blocks: [block],
            directions: FOUR,
          })
        })
      )
    }  
  }

  draw(p) {
    this.wigglers.map(w => w.draw(p))
  }

  update() {
    this.wigglers.map(w => w.update())
  }
}

class FixedLetters {
  constructor(w, h, {word, radius} = {}) {
    Object.assign(this, {
      w, h,
      word: word || new Word(EMMA),
      radius: radius || 10,
    })

    // Calculated properties
    Object.assign(this, {
      cols: this.word.length,
      rows: this.word[0].length,
    })


    this.lattice = new Array(this.cols).fill(null).map((_,i) =>
      new Array(this.rows).fill(null).map((_, j) => 
        new Cell(
          (2*i + 1) * this.radius, 
          (2*j + 1) * this.radius, 
          {r: this.radius, dots: !!this.word[i][j]}, 
        )
      )
    )

  }

  draw(p) {
    p.fill('#FFFFFF')
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.lattice[i][j].draw(p)
      }
    }
  }

  update() {}
}
