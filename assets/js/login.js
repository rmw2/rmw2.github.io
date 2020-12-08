import Typewriter from 'typewriter-effect/dist/core'

function main() {
  let tw = new Typewriter('#typewriter', {
    autoStart: false,
    cursor: '_',
  })

  tw.pasteString('> ')
    .pauseFor(2000)
    .typeString('ssh guest@robwhit')
    .pauseFor(100)
    .typeString('\n')
    .pauseFor(500)

}


main()
