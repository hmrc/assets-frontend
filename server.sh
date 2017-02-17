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
  "vrt") output "Starting vrts..."
    # make sure we're not on master
    BRANCH=$(git branch | grep \* | cut -d ' ' -f2)
    if [ "$BRANCH" = "master" ]; then
      output "Vrts not run on $BRANCH branch."
      exit 0
    fi

    # Store some vars for later
    COMMIT=${TRAVIS_PULL_REQUEST_BRANCH:-$BRANCH} \
    BRANCHPOINT=$(git merge-base master HEAD) &&

    # run VRTs
    git checkout $BRANCHPOINT &&
    npm run vrt:baseline &&
    git checkout $COMMIT &&
    npm run vrt:compare
    ;;
  "build") deps && output "Starting gulp build task..."
    if [[ -n $2 ]]; then
      npm run build $2
    else
      npm run build
    fi
    ;;
  "test-dev") deps && output "Auto watch tests..."
    npm run test:dev
    ;;
  "test") deps && output "Starting gulp test task..."
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
