#!/bin/bash

# ensure that ctrl-c kills both child processes
cleanup() {
  kill $JEKYLL_PID $WEBPACK_PID
}
trap cleanup INT

# Start jekyll dev server to watch site files and serve on 4000
bundle exec jekyll serve &
JEKYLL_PID=$!

# Start webpack to watch javascript in ./webpack/ and recompile.
# Outputs to assets/js/ which will trigger a rebuild by jekyll server.
./node_modules/.bin/webpack --watch &
WEBPACK_PID=$!

# Block forever (until ctrl-c).
tail -f /dev/null
