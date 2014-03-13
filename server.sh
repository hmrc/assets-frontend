#!/bin/bash
cd assets/
if [[ -n $1 ]]; then
	if [ $1 == "node" ]
	then
		echo "Starting default grunt task..."
		grunt
	else

		echo "invalid parameter '$1' expecting ./start-server node"
	fi
else
	port=${1-3002}
	echo "Starting  simple server on port $port."
	python -m SimpleHTTPServer $port
fi
