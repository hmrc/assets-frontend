#!/bin/bash
cd assets/
if [[ -n $1 ]]; then
	case "$1" in

	"dev") echo "Starting grunt dev mode..."
		  grunt
		  ;;
	"build") echo "Starting grunt build task..."
				grunt build
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
