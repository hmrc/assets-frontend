#!/bin/bash

output() {
  printf "\n$1\n"
}

deps() {
  echo "Checking for dependencies..."
  npm install
}

if [[ -n $1 ]]; then
  case "$1" in

  "dev") deps && output "Starting gulp in dev mode..."
    npm run dev
    ;;
  "release") deps && output "Starting gulp release task..."
    npm run release
    ;;
  "test-dev")  deps && output "Auto watch tests..."
    npm run test:dev
    ;;
  "test")  deps && output "Starting gulp test task..."
    npm run test
    ;;
  *)  echo "invalid parameter '$1'"
    ;;
  esac
else
  port=${1-9032}
  echo "Starting simple server on port $port..."
  cd target
  python -m SimpleHTTPServer $port
fi
