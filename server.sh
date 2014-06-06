#!/bin/bash
cd assets/

if [ "$(gem list SASS -i)" != "true" ]; then
	echo "It appears that Gem SASS is not installed on your machine."
	echo "Running bundler install..."
	bundle install
fi

if [[ -n $1 ]]; then
	case "$1" in

	"dev") echo "Starting grunt dev mode..."
		  npm install
		  grunt
		  ;;
	"build") echo "Starting grunt build task..."
				npm install
				grunt build
				;;
	"buildQA") echo "Starting grunt build task..."
				npm install
				grunt buildQA:${BUILD_NUMBER}
				;;
	"release") echo "Starting grunt build task..."
				npm install
				grunt release
				;;
	"test")  echo "Starting grunt test task..."
				grunt test
				;;
	*)  echo "invalid parameter '$1'"
		;;
	esac
else
	port=${1-3002}
	echo "Starting  simple server on port $port."
	python -m SimpleHTTPServer $port
fi
