#!/bin/bash

output() {
  printf "\n$1\n"
}

deps() {
  echo "Checking for dependancies..."
  npm install
}

cd assets/

if [[ -n $1 ]]; then
  case "$1" in

  "dev") deps && output "Starting gulp in dev mode..."
    npm run-script dev
    ;;
  "build") deps && output "Starting gulp build task..."
    if [[ -n $2 ]]; then
      npm run-script build $2
    else
      npm run-script build
    fi
    ;;
  "test")  deps && output "Starting gulp test task..."
    npm run-script test
    ;;
  *)  echo "invalid parameter '$1'"
    ;;
  esac
else
  port=${1-9032}
  echo "Starting simple server on port $port..."
  python -m SimpleHTTPServer $port
fi
