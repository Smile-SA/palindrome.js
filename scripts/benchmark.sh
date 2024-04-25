#!/bin/bash

# Check or install dependencies
source ./scripts/benchmark/benchmark-dependencies.sh

# Set up benchmark parameters
source ./scripts/benchmark/benchmark.env.sh

function main(){
    declare -g BENCHMARK_TYPE
    declare -g BENCHMARK_MODE

    BENCHMARK_TYPE=${1:-classic}
    BENCHMARK_MODE=${2:-headless}

    # set the HEADLESS env value
    if [[ "${BENCHMARK_MODE}" == "headless" ]]; then
        PALINDROME_BENCH_HEADLESS=true
    elif [[ "${BENCHMARK_MODE}" == "visual" ]]; then
        PALINDROME_BENCH_HEADLESS=false
    fi

    # execute the benchmark depending on selected type
    if [[ "${BENCHMARK_TYPE}" == "classic" ]]; then
        source ./scripts/benchmark/classic-benchmark.sh
    elif [[ "${BENCHMARK_TYPE}" == "evaluation" ]]; then
        source ./scripts/benchmark/eval-benchmark.sh
    fi
}

main "${@-}"