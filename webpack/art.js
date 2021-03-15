import p5 from 'p5'

import * as sketches from './art/index.js'
console.log(sketches)

// Leaky abstraction :( -- assuming there is a sketch named particles imported above.
const DEFAULT_SKETCH = 'particles'

function main() {
  console.log('main')
  window.onhashchange = mountSketch
  if (!window.location.hash) {
    window.location.hash = DEFAULT_SKETCH
  }
  mountSketch()
}

function mountSketch() {
  // Use hash to select sketch to mount (removing '#' character).
  let s = window.location.hash.substring(1)
  if (s === '' || !sketches[s]) {
    window.location.hash = DEFAULT_SKETCH
    return
  }
  console.log('mounting', s, sketches[s])
  document.getElementById('bg-canvas').innerHTML = ''
  window.p = new p5(sketches[s], 'bg-canvas')
}

setTimeout(main, 0)
