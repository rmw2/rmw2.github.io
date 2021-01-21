import Typewriter from 'typewriter-effect/dist/core'

import dump from './assets/dump.txt'

function login() {
  const $terminal = document.getElementById('terminal')
  const tw = new Typewriter($terminal, {
    autoStart: false,
    delay: 10,
  })

  tw.pasteString('<span class="green">guest</span>@<span class="purp">robwhit.sh</span>:~ $ ')
    .pauseFor(200)
    .typeString('sudo apt-get install robwhit.sh<br/>')
    .pauseFor(1000)
    .callFunction(() => {
      const dumpLines = dump.split('\n')
      let i = 0
      function dumpNext() {
        if (i < dumpLines.length) {
          const $line = document.createElement('pre')
          $line.innerHTML = dumpLines[i] || ' '
          $terminal.appendChild($line)
          $line.scrollIntoView()
          i++
          setTimeout(dumpNext, 10)
        } else {
          window.location.replace('/～')
        }
      }
      dumpNext()
    }).start()




    /*  .pauseFor(1000)
    .pasteString('<span class="green">guest</span>@<span class="purp">robwhit.sh</span>:~ $ ')
    .pauseFor(2000)
    .typeString('ls -F<br/>')
    .pauseFor(100)
    .pasteString('me/      projects/      robwhit.sh*<br/>')
    .pasteString('<span class="green">guest</span>@<span class="purp">robwhit.sh</span>:~ $ ')
    .pauseFor(2000)
    .typeString('cat robwhit.sh<br/>')
    .pauseFor(100)
    .pasteString('cat: robwhit.sh: Permission denied<br/>')
    .pasteString('<span class="green">guest</span>@<span class="purp">robwhit.sh</span>:~ $ ')
    .pauseFor(2000)
    .typeString('stat -c "%U %A" robwhit.sh<br/>')
    .pauseFor(100)
    .pasteString('robwhit -rwx--x--x<br/>')
    .pasteString('<span class="green">guest</span>@<span class="purp">robwhit.sh</span>:~ $ ')
    .pauseFor(2000) .typeString('./robwhit.sh') .pauseFor(2000) .typeString('<br/>') .pauseFor(500) 
    */
}


setTimeout(() => {
  // Hide the header & footer during the funky login sequence.
  let hide = $e => $e.style.display = 'none'
  for (let $e of document.getElementsByTagName('header')) hide($e)
  for (let $e of document.getElementsByTagName('footer')) hide($e)
  
  // Do the little type dance.
  login()
}, 1)
