#!/bin/bash

# Set up benchmark parameters
source ./benchmark.env.sh

# Function to compare floating-point numbers
compare_float() {
    awk -v n1="$1" -v n2="$2" 'BEGIN {if (n1 < n2) exit 0; exit 1}'
}

# Function to calculate the median of an array
calculate_median() {
    local array=("$@")
    local array_length=${#array[@]}
    sorted_array=($(for i in "${array[@]}"; do echo $i; done | sort))
    if ((array_length % 2 == 0)); then
        # For an even-sized array, calculate the average of the middle two elements
        local middle1=$((array_length / 2 - 1))
        local middle2=$((middle1 + 1))
        median=$(( (sorted_array[middle1] + sorted_array[middle2]) / 2 ))
    else
        # For an odd-sized array, the median is the middle element
        local middle=$((array_length / 2))
        median=${sorted_array[middle]}
    fi

    echo "$median"
}

# Function to launch benchmark and retrieve json results
launch_benchmark_and_get_results() {
    rm -f "${HOME}/Downloads/${PALINDROME_BENCH_OUTPUT}"*
    pkill firefox
    bash ./benchmark.sh > /dev/null
    fileContent=$(cat "${HOME}/Downloads/${PALINDROME_BENCH_OUTPUT}.results")

    values=()
    values+=("$(echo "$fileContent" | jq -r '.Basic_version_results."Average FPS rendered"')")
    values+=("$(echo "$fileContent" | jq -r '."Web workers_version_results"."Average FPS rendered"')")
    values+=("$(echo "$fileContent" | jq -r '.Basic_version_results."Average Milliseconds needed to render a frame"')")
    values+=("$(echo "$fileContent" | jq -r '."Web workers_version_results"."Average Milliseconds needed to render a frame"')")
    echo "${values[@]}"
}

outputFile="${HOME}/Downloads/${PALINDROME_BENCH_OUTPUT}.results"
fpsWorkers=()
msWorkers=()
fpsBasic=()
msBasic=()

# Getting expected values from remote data source or computing local median
if [[ "$PALINDROME_BENCH_EXPECTED_VALUES_SOURCE" = "remote" ]]; then
    remoteValues=$(curl $PALINDROME_BENCH_EXPECTED_VALUES_REMOTE_SOURCE_URL -H "Accept: application/json")
    dynamicFpsWorkers=$(echo "$remoteValues" | jq -r '.workersFps')
    dynamicFpsBasic=$(echo "$remoteValues" | jq -r '.basicFps')
    dynamicMsWorkers=$(echo "$remoteValues" | jq -r '.workersMs')
    dynamicMsBasic=$(echo "$remoteValues" | jq -r '.basicMs')
elif [[ "$PALINDROME_BENCH_EXPECTED_VALUES_SOURCE" = "local" ]]; then
    if [[ "$PALINDROME_BENCH_RECALCULATE_MEDIAN" = false ]]; then
        if [ -e "$PALINDROME_BENCH_MEDIAN_VALUES_OUTPUT" ]; then
            medianValues=$(cat "$PALINDROME_BENCH_MEDIAN_VALUES_OUTPUT")
            dynamicFpsWorkers=$(echo "$medianValues" | jq -r '.workersFps')
            dynamicFpsBasic=$(echo "$medianValues" | jq -r '.basicFps')
            dynamicMsWorkers=$(echo "$medianValues" | jq -r '.workersMs')
            dynamicMsBasic=$(echo "$medianValues" | jq -r '.basicMs')
            rm -f median.out
        else
            echo "[ERROR] Median file is not found, recomputing median again."
        fi
    fi

    if [ "$PALINDROME_BENCH_RECALCULATE_MEDIAN" = true ] || [ ! -e "$PALINDROME_BENCH_MEDIAN_VALUES_OUTPUT" ]; then
        for i in $(seq 1 $PALINDROME_BENCH_MEDIAN_ITERATIONS); do
            result_array=($(launch_benchmark_and_get_results))
            fpsWorkers+=("${result_array[0]}")
            msWorkers+=("${result_array[1]}")
            fpsBasic+=("${result_array[2]}")
            msBasic+=("${result_array[3]}")
            echo "${result_array[@]}" >> median.out
        done

        dynamicFpsWorkers=$(calculate_median "${fpsWorkers[@]}")
        dynamicFpsBasic=$(calculate_median "${fpsBasic[@]}")
        dynamicMsWorkers=$(calculate_median "${msWorkers[@]}")
        dynamicMsBasic=$(calculate_median "${msBasic[@]}")
        expectedValuesArtifact="{\"basicFps\":$dynamicFpsBasic,\"basicMs\":$dynamicMsBasic,\"workersFps\":$dynamicFpsWorkers,\"workersMs\":$dynamicMsWorkers}"
        echo "${expectedValuesArtifact}" > "$PALINDROME_BENCH_MEDIAN_VALUES_OUTPUT"
    fi
fi

# Run benchmark
result_array=($(launch_benchmark_and_get_results))
fpsBasicVersion=${result_array[0]}
fpsWorkersVersion=${result_array[1]}
msBasicVersion=${result_array[2]}
msWorkersVersion=${result_array[3]}

# Tests and assertions
testFailed=false
test1="[Basic version] should respect minimum FPS values."
if compare_float "$fpsBasicVersion" "$dynamicFpsBasic"; then
    echo -e "\n✕ $test1"
    echo -e "[ERROR] Basic version FPS is too low"
    echo "Found: $fpsBasicVersion. Expected: greater than $dynamicFpsBasic"
    testFailed=true
else
    echo -e "\n✓ $test1"
fi

test2="[Workers version] should respect minimum FPS values."
if compare_float "$fpsWorkersVersion" "$dynamicFpsWorkers"; then
    echo -e "\n✕ $test2"
    echo -e "[ERROR] Web workers version FPS is too low"
    echo "Found: $fpsWorkersVersion. Expected: greater than $dynamicFpsWorkers"
    testFailed=true
else
    echo -e "\n✓ $test2"
fi

test3="[Basic version] should respect maximum MS values."
if ! compare_float "$msBasicVersion" "$dynamicMsBasic"; then
    echo -e "\n✕ $test3"
    echo -e "[ERROR] Basic version ms needed to render a frame is too high"
    echo "Found: $msBasicVersion. Expected: less than $dynamicMsBasic"
    testFailed=true
else
    echo -e "\n✓ $test3"
fi

test4="[Workers version] should respect maximum MS values."
if ! compare_float "$msWorkersVersion" "$dynamicMsWorkers"; then
    echo -e "\n✕ $test4"
    echo -e "[ERROR] Web workers ms needed to render a frame is too high"
    echo "Found: $msWorkersVersion. Expected: less than $dynamicMsWorkers" 
    testFailed=true
else
    echo -e "\n✓ $test4"
fi

if [[ "$testFailed" = true ]]; then
    exit 1
fi
echo -e "\n✓ All tests passed."
exit 0
