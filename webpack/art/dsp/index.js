import p5 from 'p5'
import 'p5/lib/addons/p5.sound'

export default class DSP {
  constructor(input) {
    this._input = input

    this._amp = new p5.Amplitude()
    this._amp.setInput(input)
    
    this._fft = new p5.FFT()
    this._fft.setInput(input)
    input.connect(this._fft)

    let amplitudes = input.getPeaks()
    this.maxLevel = Math.max(...amplitudes)
    // this.peaks = input.processPeaks()
  }

  update() {
    this.spectrum = this._fft.analyze()
    this.logSpectrum = this._fft.logAverages(this._fft.getOctaveBands()).map(x => x / 255)

    this.level = this._amp.getLevel() / this.maxLevel
    // precompute some nice convenient items & normalize to 0-1
    this.bass = this._fft.getEnergy('bass') / 255
    this.lomid = this._fft.getEnergy('lowMid') / 255
    this.mid = this._fft.getEnergy('mid') / 255
    this.himid = this._fft.getEnergy('highMid') / 255
    this.treble = this._fft.getEnergy('treble') / 255

    // Get the centroid
    this.centroid = this._fft.getCentroid()
  }
}

