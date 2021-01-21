import p5 from 'p5'

import sketch from './art/particles.js'

function setScrollIndicator() {
  let $main = document.getElementById('main')
  let $scroll = document.getElementById('scroll-indicator-content') 

  let distanceToBottom = $main.scrollHeight - $main.scrollTop - $main.clientHeight
  console.log(`${distanceToBottom} = ${$main.scrollHeight} - ${$main.scrollTop} - ${$main.clientHeight}`)
  if (distanceToBottom < 1)  {
    $scroll.innerHTML = '(EOF)'
  } else {
    $scroll.innerHTML = ':'
  }
}

function getFontSizeInPixels($el) {
  let style = window.getComputedStyle($el, null).getPropertyValue('line-height');
  let fontSize = parseFloat(style.substring(0, style.length - 2)); 
  return fontSize
}

function scrollDown() {
  let $main = document.getElementById('main')
  let sz = getFontSizeInPixels($main)

  $main.scrollBy(0, sz)
}

function scrollUp() {
  let $main = document.getElementById('main')
  let sz = getFontSizeInPixels($main)
  $main.scrollBy(0, -sz)
}


function main() {
  // Setup scroll behavior 
  let $main = document.getElementById('main')
  $main.addEventListener('scroll', setScrollIndicator)
  
  window.addEventListener('keydown', function(event) {
    if (event.key === 'j') scrollDown()
    else if (event.key === 'k') scrollUp()
  })

  setScrollIndicator()
  // Hacky extra call to setScrollbar to avoid
  // crashing into the css wipe-down effect... :(
  setTimeout(setScrollIndicator, 1000)

  // Set up p5 sketch on background
  console.log('making a p5')
  window.p5 = new p5(sketch, 'bg-canvas')
}

// Hacky callback enqueue to ensure this runs after the page loads.
setTimeout(main, 0)
