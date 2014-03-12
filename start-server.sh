#!/bin/bash
cd assets/
if [[ -n $1 && $1 -eq "node" ]]; then

		echo "Starting default grunt task..."
		grunt

else
	port=${1-3002}
	echo "Starting  simple server on port $port."
	python -m SimpleHTTPServer $port
fi
