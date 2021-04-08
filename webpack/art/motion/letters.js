
export class Word {
  constructor(letters) {
    this.letters = letters
    this.cols = letters.reduce((len, letter) => len + letter.length, 0)
    this.rows = Math.max(...letters.map(l => l[0].length))

    this.mask = new Array(this.cols).fill(null)
      .map(() => new Array(this.rows).fill(0))

    // Keep track of leftmost column of current letter.
    let col = 0
    for (let l of letters) {
      for (let i = 0; i < l.length; i++) {
        for (let j = 0; j < l[i].length; j++) {
          this.mask[col + i][j] = l[i][j]
        }
      }
      col += l.length
    } 
  }
}

export class CenterFramedWord {
  constructor(w, h, word) {
    if (w < word.cols || h < word.rows) {
      throw new Error(`Can't put word of size (${word.cols}, ${word.rows}) in smaller frame (${w}, ${h})`)
    }
    Object.assign(this, {w, h, word})

    this.frame = new Array(w).fill(null)
      .map(() => new Array(h).fill(0))


    this.left = ~~((w - word.cols) / 2)
    this.top = ~~((h - word.rows) / 2)

    for (let i = 0; i < word.cols; i++) {
      for (let j = 0; j < word.rows; j++) {
        this.frame[this.left + i][this.top + j] = word.mask[i][j]
      }
    }
  }

  letterMasks() {
    let left = this.left
    return this.word.letters.map(l => {
      let mask = new Array(this.w).fill(null)
        .map(() => new Array(this.h).fill(0))
      
      for (let i = 0; i < l.length; i++) {
        for (let j = 0; j < l[0].length; j++) {
          mask[left + i][this.top + j] = l[i][j]
        }
      }
      left += l.length
      return mask
    })
  }
}

/**
 * reflect maps a 2D row-major array to a
 * column-major array, and vice versa.
 */
export function reflect(arr) {
  const width = arr.length
  if (width === 0) return []
  const height = arr[0].length
  const dest = new Array(width).fill(null)
    .map(() => new Array(height).fill(0))

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      dest[i][j] = arr[j][i]
    }
  }

  return dest
}

export function fatten(letter, factor = 2) {
  let fatty = new Array(letter.length * factor).fill(null)
    .map(() => new Array(letter[0].length).fill(0))

  for (let i = 0; i < letter.length; i++) {
    for (let j = 0; j < letter[0].length; j++) {
      for (let x = 0; x < factor; x++) {
        for (let y = 0; y < factor; y++) {
          fatty[factor * i + x][factor * j + y] = letter[i][j]
        }
      }
    }
  }

  return fatty
}

export function invert(letter) {
  let width = letter.length
  let height = letter[0].length
  const flipped = new Array(width).fill(null)
    .map(() => new Array(height).fill(0))

  for (let i = 0; i < flipped.length; i++) {
    for (let j = 0; j < flipped[0].length; j++) {
      flipped[i][j] = !letter[i][j]
    }
  }

  return flipped
}

const e = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 0, 1, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
]
  
const m = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 0, 0, 1, 0, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
]

const a = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 0, 0, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 0, 0, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
]

export const LETTERS = {
  e: reflect(e),
  m: reflect(m),
  a: reflect(a),
}
