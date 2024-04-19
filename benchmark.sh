#!/bin/bash

# Check or install dependencies
source ./benchmark/benchmark-dependencies.sh

# Set up benchmark parameters
source ./benchmark/benchmark.env.sh

function main(){
    local option=${1-}
    if [[ "${option}" == "classic" ]]; then
        source ./benchmark/classic-benchmark.sh
    elif [[ "${option}" == "evaluation" ]]; then
        source ./benchmark/eval-benchmark.sh
    fi
}

main "${@}"