#!/bin/bash

# Compare floating-point numbers
compare_float(){
    awk -v n1="$1" -v n2="$2" 'BEGIN {if (n1 < n2) exit 0; exit 1}'
}

# Calculate the median of an array
calculate_median(){
    declare -a array
    declare -a sorted_array
    local array_length
    local array_odd_or_even
    local median
    local middle
    local middle_first
    local middle_second

    array=(${@})
    array_length="${#array[@]}"
    array_odd_or_even=$(( array_length % 2 ))
    sorted_array=($(for i in "${array[@]}"; do echo $i; done | sort))

    if [[ "${array_odd_or_even}" -eq 0 ]]; then
        # For an even-sized array, calculate the average of the middle two elements
        middle_first=$(( array_length / 2 - 1 ))
        middle_second=$(( middle_first + 1 ))
        median=$(( ( sorted_array[middle_first] + sorted_array[middle_second] ) / 2 ))
    else
        # For an odd-sized array, the median is the middle element
        middle=$(( array_length / 2 ))
        median="${sorted_array[middle]}"
    fi

    echo "${median}"
}

# Function to launch benchmark and retrieve json results
launch_benchmark_and_get_results(){
    local file_content
    declare -a values

    rm -f "${HOME}/${PALINDROME_BENCH_DL_DIRECTORY}/${PALINDROME_BENCH_OUTPUT}"*
    pkill firefox
    
    if [[ "${PALINDROME_BENCH_HEADLESS}" == false ]]; then
        bash ./scripts/benchmark.sh "classic" "visual" > /dev/null
    else
        bash ./scripts/benchmark.sh > /dev/null
    fi

    file_content=$(cat "${HOME}/${PALINDROME_BENCH_DL_DIRECTORY}/${PALINDROME_BENCH_OUTPUT}.results")

    values+=("$(echo "${file_content}" | jq -r '.Basic_version_results."Average FPS rendered"')")
    values+=("$(echo "${file_content}" | jq -r '."Web workers_version_results"."Average FPS rendered"')")
    values+=("$(echo "${file_content}" | jq -r '.Basic_version_results."Average Milliseconds needed to render a frame"')")
    values+=("$(echo "${file_content}" | jq -r '."Web workers_version_results"."Average Milliseconds needed to render a frame"')")
    echo "${values[@]}"
}

# Getting expected values from remote data source or computing local median
# Inherit: $remote_values, $median_values, $dynamic_fps_workers, $dynamic_fps_basic, $dynamic_ms_workers, $dynamic_ms_basic
# $result_array, $fps_workers, $ms_workers, $fps_basic, $ms_basic
eval_benchmark_get_median(){
    if [[ "${PALINDROME_BENCH_EXPECTED_VALUES_SOURCE}" == "remote" ]]; then
        remote_values=$(curl ${PALINDROME_BENCH_EXPECTED_VALUES_REMOTE_SOURCE_URL} -H "Accept: application/json")
        dynamic_fps_workers=$(echo "${remote_values}" | jq -r '.workersFps')
        dynamic_fps_basic=$(echo "${remote_values}" | jq -r '.basicFps')
        dynamic_ms_workers=$(echo "${remote_values}" | jq -r '.workersMs')
        dynamic_ms_basic=$(echo "${remote_values}" | jq -r '.basicMs')
    elif [[ "${PALINDROME_BENCH_EXPECTED_VALUES_SOURCE}" == "local" ]]; then
        if [[ "${PALINDROME_BENCH_RECALCULATE_MEDIAN}" == false ]]; then
            if [[ -f "${PALINDROME_BENCH_MEDIAN_VALUES_OUTPUT}" ]]; then
                median_values=$(cat "${PALINDROME_BENCH_MEDIAN_VALUES_OUTPUT}")
                dynamic_fps_workers=$(echo "${median_values}" | jq -r '.workersFps')
                dynamic_fps_basic=$(echo "${median_values}" | jq -r '.basicFps')
                dynamic_ms_workers=$(echo "${median_values}" | jq -r '.workersMs')
                dynamic_ms_basic=$(echo "${median_values}" | jq -r '.basicMs')
                rm -f median.out
            else
                echo "[ERROR] Median file is not found, recomputing median again."
            fi
        fi

        if [[ "${PALINDROME_BENCH_RECALCULATE_MEDIAN}" == true ]] || [[ ! -f "${PALINDROME_BENCH_MEDIAN_VALUES_OUTPUT}" ]]; then
            for i in $(seq 1 ${PALINDROME_BENCH_MEDIAN_ITERATIONS}); do
                result_array=($(launch_benchmark_and_get_results))
                fps_workers+=("${result_array[0]}")
                ms_workers+=("${result_array[1]}")
                fps_basic+=("${result_array[2]}")
                ms_basic+=("${result_array[3]}")
                echo "${result_array[@]}" >> median.out
            done

            dynamic_fps_workers=$(calculate_median "${fps_workers[@]}")
            dynamic_fps_basic=$(calculate_median "${fps_basic[@]}")
            dynamic_ms_workers=$(calculate_median "${ms_workers[@]}")
            dynamic_ms_basic=$(calculate_median "${ms_basic[@]}")
            expected_values_artifact="{\"basicFps\":${dynamic_fps_basic},\"basicMs\":${dynamic_ms_basic},\"workersFps\":${dynamic_fps_workers},\"workersMs\":${dynamic_ms_workers}}"
            echo "${expected_values_artifact}" > "${PALINDROME_BENCH_MEDIAN_VALUES_OUTPUT}"
        fi
    fi
}

eval_benchmark_run_and_display_results(){
    declare -a result_array
    local fps_basic_version
    local fps_workers_version
    local ms_basic_version
    local ms_workers_version
    local test_failed
    local test_message

    # Run benchmark
    result_array=($(launch_benchmark_and_get_results))

    fps_basic_version="${result_array[0]}"
    fps_workers_version="${result_array[1]}"
    ms_basic_version="${result_array[2]}"
    ms_workers_version="${result_array[3]}"

    # Tests and assertions
    test_failed=false
    test_message="[Basic version] should respect minimum FPS values."
    if compare_float "${fps_basic_version}" "${dynamic_fps_basic}"; then
        echo -e "\n✕ ${test_message}"
        echo -e "[ERROR] Basic version FPS is too low"
        echo "Found: ${fps_basic_version}. Expected: greater than ${dynamic_fps_basic}"
        test_failed=true
    else
        echo -e "\n✓ ${test_message}"
    fi

    test_message="[Workers version] should respect minimum FPS values."
    if compare_float "${fps_workers_version}" "${dynamic_fps_workers}"; then
        echo -e "\n✕ ${test_message}"
        echo -e "[ERROR] Web workers version FPS is too low"
        echo "Found: ${fps_workers_version}. Expected: greater than ${dynamic_fps_workers}"
        test_failed=true
    else
        echo -e "\n✓ ${test_message}"
    fi

    test_message="[Basic version] should respect maximum MS values."
    if ! compare_float "${ms_basic_version}" "${dynamic_ms_basic}"; then
        echo -e "\n✕ ${test_message}"
        echo -e "[ERROR] Basic version ms needed to render a frame is too high"
        echo "Found: ${ms_basic_version}. Expected: less than ${dynamic_ms_basic}"
        test_failed=true
    else
        echo -e "\n✓ ${test_message}"
    fi

    test_message="[Workers version] should respect maximum MS values."
    if ! compare_float "${ms_workers_version}" "${dynamic_ms_workers}"; then
        echo -e "\n✕ ${test_message}"
        echo -e "[ERROR] Web workers ms needed to render a frame is too high"
        echo "Found: ${ms_workers_version}. Expected: less than ${dynamic_ms_workers}" 
        test_failed=true
    else
        echo -e "\n✓ ${test_message}"
    fi

    if [[ "${test_failed}" == true ]]; then
        exit 1
    fi
    echo -e "\n✓ All tests passed."
    exit 0
}

eval_benchmark_wrapper(){
    # remove: outputFile="${HOME}/Downloads/${PALINDROME_BENCH_OUTPUT}.results"
    local dynamic_fps_workers
    local dynamic_ms_workers
    local dynamic_fps_basic
    local dynamic_ms_basic
    local remote_values
    local median_values
    local expected_values_artifact
    local test_failed
    local test_message

    declare -a fps_workers
    declare -a ms_workers
    declare -a fps_basic
    declare -a ms_basic
    declare -a result_array

    eval_benchmark_get_median
    eval_benchmark_run_and_display_results
}

eval_benchmark_wrapper
