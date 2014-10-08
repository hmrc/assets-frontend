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

	"dev") deps && output "Starting grunt in dev mode..."
	  grunt
	  ;;
	"build") deps && output "Starting grunt build task..."
		grunt build
		;;
	"test")  deps && output "Starting grunt test task..."
		grunt test
		;;
	*)  echo "invalid parameter '$1'"
		;;
	esac
else
	port=${1-9032}
	echo "Starting simple server on port $port..."
	python -m SimpleHTTPServer $port
fi
