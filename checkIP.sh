#!/usr/bin/env bash

if [ "$(uname)" == "Darwin" ]; then
    echo "UNIX";      
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    echo "UNIX";
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
    echo "WIN";
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
    echo "WIN";
fi