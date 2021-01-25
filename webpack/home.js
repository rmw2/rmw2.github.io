
function setupHotkeys() {
  // This is tightly coupled to the list in the home markdown file.
  // TODO: combine these, maybe with react.
  window.addEventListener('keydown', function(event) {
    switch (event.key) {
      case '0': window.location.assign('/blank'); break
      case '1': window.location.assign('/me'); break
      case '2': window.location.assign('/projects'); break
      case '3': window.location.assign('/README'); break
      case '4': window.location.assign('/thoughts'); break
      case 's': window.location.assign('http://spaghet.monster'); break
      case 'q': document.getElementById('container').style.display = 'none'
    }
  })
}


setTimeout(setupHotkeys, 0)
