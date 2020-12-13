import Typewriter from 'typewriter-effect/dist/core'

function login() {
  const $terminal = document.getElementById('terminal')
  const tw = new Typewriter($terminal, {
    autoStart: false,
    delay: 25,
  })

  tw.pasteString('localhost> ')
    .pauseFor(2000)
    .typeString('ssh guest@robwhit.sh<br/>')
    .pauseFor(1000)
    .callFunction(() => (console.log('starting'), 0))
    .pasteString('<span class="green">guest</span>@<span class="purp">robwhit.sh</span>:~ $ ')
    .pauseFor(1000)
    .typeString('ls -F<br/>')
    .pauseFor(500)
    .pasteString('me/      projects/      robwhit.sh*<br/>')
    .pasteString('<span class="green">guest</span>@<span class="purp">robwhit.sh</span>:~ $ ')
    .pauseFor(1000)
    .typeString('exec robwhit.sh')
    .pauseFor(2000)
    .typeString('<br/>')
    .pauseFor(500)
    .callFunction(() => {
      console.log('in the callback')
      window.location.replace('/home')
    }).start()
}


setTimeout(() => {
  // Hide the header & footer during the funky login sequence.
  let hide = $e => $e.style.display = 'none'
  for (let $e of document.getElementsByTagName('header')) hide($e)
  for (let $e of document.getElementsByTagName('footer')) hide($e)
  
  // Do the little type dance.
  login()
}, 1)
