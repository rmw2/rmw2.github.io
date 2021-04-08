

/** 
 * BoundsCheckedLattice is a mixin that supports checking whether a given
 * x,y pair is in bounds, assuming the class contains properties w & h.
 */ 
export class BoundsCheckedLattice {
  constructor(w, h) {
    this.w = w
    this.h = h
  }

  isOutOfBounds(x, y) {
    return  (
      x >= this.w
      || x < 0
      || y >= this.h
      || y < 0
    )
  }

  requireInBounds(x, y) {
    if (this.isOutOfBounds(x, y)) {
      throw new Error(`(${x}, ${y}) is out of bounds on lattice of size ${this.w}x${this.h}`)
    }
  }
}

/**
 * LatticePath keeps track of an ordered set of points (up to a given limit) on a 2d lattice.
 * Pushing to the buffer adds the new point, and removes the least recently added point
 * (if the buffer is larger than its limit).  LatticePath also upports querying membership 
 * of given point in the buffer. Duplicating points in the buffer are supported. 
 */
export class LatticePath extends BoundsCheckedLattice {
  constructor(width, height, capacity = 1000) {
    super(width, height)
    // 2D array keep track of number of references to each point in the buffer.
    this.lattice = new Array(width).fill(null)
        .map(() => new Array(height).fill(0))

    this.capacity = capacity
    this.buf = new Array(this.capacity).fill([])
    this.head = 0
    this.tail = 0
    this.length = 0
  }

  push([x, y]) {
    this.requireInBounds(x, y)
    this.buf[this.head] = [x, y]
    this.head = (this.head + 1) % this.capacity
    this.lattice[x][y]++ 
    if (this.length < this.capacity) {
      this.length++
    } else {
      this.tail = (this.tail + 1) % this.capacity
    }
  }

  pop() {
    let [x, y] = this.buf[this.head]
    this.buf[this.head] = []
    // Negative numbers mod negative, so ensure we always have a positive index.
    this.head = (this.capacity + this.head - 1) % this.capacity
    this.lattice[x][y]--
    this.length--
  }

  contains(x, y) {
    return !this.isOutOfBounds(x, y) && this.lattice[x][y] > 0
  }

  toArray() {
    let arr = new Array(this.length).fill([])
    for (
        let iBuf = this.tail, iArr = 0; 
        iArr < this.length; 
        iBuf = (iBuf + 1) % this.capacity, iArr++
      ) {
      arr[iArr] = this.buf[iBuf]
    }
    return arr
  }

  *[Symbol.iterator]() {
    let n = this.length 
    for (
        let iBuf = this.tail, iArr = 0;
        iArr < this.length;
        iBuf = (iBuf + 1) % this.capacity, iArr++
    ) {
      yield this.buf[iBuf]
    }
  }
}



/**
 * A BlockRegion is simply a 2D binary array, representing occupied points,
 * and supporting block flips and automatically bounds-checked emptiness queries.
 * An out of bounds point is considered to be empty.
 */
export class BlockRegion extends BoundsCheckedLattice {
  constructor(lattice) {
    // lattice is assumed to be a 2D, non-ragged, column-major array.
    super(lattice.length, lattice[0].length)

    // This instance owns its own lattice. 
    this.lattice = lattice.map(column => [...column])
  }

  isBlocked(x, y) {
    return !this.isOutOfBounds(x, y) && this.lattice[x][y]
  }

  block(x, y) {
    this.requireInBounds(x, y) 
    this.lattice[x][y] = true
  }

  unblock(x, y) {
    this.requireInBounds(x, y)
    this.lattice[x][y] = false
  }

  flip(x, y) {
    this.requireInBounds(x, y) 
    this.lattice[x][y] = !this.lattice[x][y]
  }
}

