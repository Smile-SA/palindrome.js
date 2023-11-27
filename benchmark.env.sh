#!/bin/bash
export PALINDROME_TYPE=basic
export IS_BENCHMARK=true
export BENCHMARK_DURATION=1 # in minutes
export USE_CASE_NAME=dcBasicConfiguration
export WORKERS_RESOURCES_LEVEL=100
export OUTPUT_FILENAME=palindrome_benchmark
export USE_GPU=true
export HEADLESS_MODE=true
export USE_WEBSERVER=false
export MEDIAN_ITERATIONS=5
export EXPECTED_VALUES_SOURCE=remote
export EXPECTED_VALUES_REMOTE_SOURCE_URL="https://palindrome-production.onrender.com/api/requirements"
export MEDIAN_VALUES_OUTPUT_FILE=expected-values.eval
export RECALCULATE_MEDIAN=false