
// Hacky catch for using the real tilde character.
// We save people here by swapping in the right character.
let path = window.location.pathname
if (path.startsWith('/~')) {
  let redirect = '/～' + path.substring(2)
  window.location.replace(redirect)
}

