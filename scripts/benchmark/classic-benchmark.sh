#!/bin/bash

# Trap SIGINT to clean up before exiting
trap simple_benchmark_exit_cleanup INT

simple_benchmark_validate_env_variables() {
    if [[ "${PALINDROME_BENCH_BROWSER}" == 'chromium' ]]; then
        if [[ "${PALINDROME_BENCH_GPU}" == true ]]; then
            echo "ERROR: chromium should not be used with GPU based benchmark. Use firefox instead."
            exit 1
        fi
    fi

    if [[ "${PALINDROME_BENCH_BROWSER}" == 'firefox' ]]; then
        if [[ "${PALINDROME_BENCH_GPU}" == false ]]; then
            echo "ERROR: firefox should not be used with CPU based benchmark. Use chromium instead."
            exit 1
        fi
    fi

    if [[ -z "${GITLAB_CI}" ]]; then
        if [[ "${PALINDROME_BENCH_BROWSER}" == 'chromium' ]]; then
            if [[ "${PALINDROME_BENCH_HEADLESS}" == true ]]; then
                echo "ERROR: chromium can be used in headless just within Gitlab CI/CD pipeline. Use headless firefox instead."
                exit 1
            fi
        fi
    fi
}

# inherit: output_file
simple_benchmark_exit_cleanup() {
    local firefox_profile

    echo -e "\033[1m[INFO] Cleaning up and exiting...\n\033[0m"
    if [[ "${PALINDROME_BENCH_HEADLESS}" == true ]]; then
        pkill -f firefox
        pkill -f chromium
    fi
    pkill -f parcel
    firefox_profile=~/.mozilla/firefox/profiles.ini
    if [[ -n "${GITLAB_CI}" ]]; then
        if [[ -f "${firefox_profile}" ]]; then
            rm "${firefox_profile}"
        fi
    fi
    if [[ -f "${output_file}" ]]; then
        rm "${output_file}"
    fi
    if [[ -f "${output_file}.txt" ]]; then
        rm "${output_file}.txt"
    fi
    rm -rf ~/.mozilla/firefox/*.default-release/sessionstore-backups/*
    exit 0
}

# Remove cache and existing output file
# Inherit : $output_file
simple_benchmark_entry_cleanup(){
    rm -rf .cache
    if [[ -f "${output_file}" ]]; then
        rm "${output_file}"
    fi
    if [[ -f "${output_file}.txt" ]]; then
        rm "${output_file}.txt"
    fi
}

# Set benchmark endpoint
# Inherit: $url
simple_benchmark_set_endpoint(){
    if [[ "${PALINDROME_BENCH_WEBSERVER}" == true ]]; then
        # Kill processes on port 1234 and start Parcel
        fuser -k 1234/tcp
        yarn parcel dev/index.html &
        # remove: parcel_pid=$!
        # Wait for Parcel to start
        sleep 30
        url="http://localhost:1234"
    else
        yarn parcel build dev/index.html --public-url ./ --no-cache
        url="./dist/index.html"
    fi
}

# Execute browsers depending on ENV values
# Inherit: $url
simple_benchmark_execute_browsers(){
    local chrome_pid

    # Execute browsers depending on ENV values
    if [[ "${PALINDROME_BENCH_HEADLESS}" == false ]]; then
        if [[ "${PALINDROME_BENCH_GPU}" == true ]]; then
            firefox -url $url &
        else
            chromium --disable-gpu --no-sandbox ${url} &
        fi
    else
        # Launch browser
        Xvfb :1 -screen 0 1024x768x16 &
        export DISPLAY=:1

        if [[ "${PALINDROME_BENCH_GPU}" == true ]]; then
            firefox --headless -url ${url} &
        else
            if [[ -n "${GITLAB_CI}" ]]; then
                chromium --no-sandbox &
                chrome_pid=$!
                sleep 10
                kill -9 "${chrome_pid}"
                sleep 30
                chromium --disable-gpu --no-sandbox ${url} &
            else
                firefox --headless -url ${url} &
            fi;
        fi
    fi
}

# Calculate sleep duration based on BENCHMARK_DURATION 
# or default to 60 seconds
# Inherit: $sleep_duration
simple_benchmark_set_sleep(){
    if declare -p | grep -q "PALINDROME_BENCH_DURATION"; then
        sleep_duration=$(( PALINDROME_BENCH_DURATION * 60 * 2 ))
    else
        # review: sleep_duration=$((60))
        sleep_duration=60
    fi
}

# Display benchmark total duration
# inherit: $output_file, $sleep_duration
simple_benchmark_display_duration(){
    echo -e "\033[1m[INFO] $(date '+%Y-%m-%dT%H:%M:%S') Benchmark started. Total duration: ${sleep_duration} seconds.\n\033[0m"
    while [[ ! -f "${output_file}" ]] && [[ ! -f "${output_file}.txt" ]]; do
        sleep 0.1
    done
}

# Display benchmark results
# Inherit: $output_file, $sleep_duration
simple_benchmark_display_results(){
    local cpu_info
    local ram_capacity
    local file_content
    local fps_basic_version
    local fps_workers_version
    local ms_basic_version
    local ms_workers_version
    local data_structure

    # Display benchmark finish message
    echo -e "\033[1m\n[INFO] Benchmark done, displaying results.\n\033[0m"

    # Capture system information
    cpu_info=$(lscpu)
    ram_capacity=$(free -h | awk '/^Mem:/ {print $2}')
    ram_capacity="RAM: ${ram_capacity}"

    # Review: Append benchmark context and Palindrome.js config to the output file
    if [[ "${PALINDROME_BENCH_GPU}" == true ]]; then
        file_content=$(cat "${output_file}")
    else
        if [[ "${PALINDROME_BENCH_BROWSER}" == 'chromium' ]]; then
            file_content=$(cat "${output_file}.txt")
        else
            file_content=$(cat "${output_file}")
        fi
    fi

    # Getting JSON Data from results file
    fps_basic_version=$(echo "${file_content}" | jq -r '.Basic_version_results."Average FPS rendered"')
    fps_workers_version=$(echo "${file_content}" | jq -r '."Web workers_version_results"."Average FPS rendered"')
    ms_basic_version=$(echo "${file_content}" | jq -r '.Basic_version_results."Average Milliseconds needed to render a frame"')
    ms_workers_version=$(echo "${file_content}" | jq -r '."Web workers_version_results"."Average Milliseconds needed to render a frame"')
    data_structure=$(echo "${file_content}" | jq -r '.palindrome_config')

    # Display output files path
    echo -e "\033[1m\n[INFO] Output files:\n- ${output_file}.context \n- ${output_file}.results \n- ${output_file}.data\033[0m"
    # echo -e "-------$currentDateTime Benchmark context:\n" > "$output_file.context"
    echo -e "------- Benchmark context:\n" > "${output_file}.context"
    echo "${data_structure}" > "${output_file}.data"
    echo "${cpu_info}" >> "${output_file}.context"
    echo "${ram_capacity}" >> "${output_file}.context"
    echo "${file_content}" > "${output_file}.results_"
    jq 'del(.palindrome_config)' ${output_file}.results_ > ${output_file}.results
    rm ${output_file}.results_
    cat "${output_file}.context"
    echo -e "\033[1m[INFO] $(date '+%Y-%m-%dT%H:%M:%S') Palindrome.js benchmark results:\n\033[0m"
    #cat "$output_file.results"
    echo -e "\n-------------------------------------------------------------------------------------"
    echo "                                  Basic version                   Web workes version"
    echo "-------------------------------------------------------------------------------------"
    echo "FPS (Frames per second)      |    ${fps_basic_version}                           ${fps_workers_version}"
    echo "MS needed to render a frame  |    ${ms_basic_version}                           ${ms_workers_version}"
    echo "-------------------------------------------------------------------------------------"
    echo "Total duration (seconds)     |    ${sleep_duration}"
    echo "-------------------------------------------------------------------------------------"

    #echo -e "\033[1m[INFO] $(date '+%Y-%m-%dT%H:%M:%S') Benchmark total time $sleep_duration seconds.\n\033[0m" 

}

# Wrap the simple benchmark functions
simple_benchmark_wrapper(){
    local output_file
    local url
    local sleep_duration

    # Set the base path and construct the output file path
    mkdir -p "${HOME}/${PALINDROME_BENCH_DL_DIRECTORY}"
    output_file="${HOME}/${PALINDROME_BENCH_DL_DIRECTORY}/${PALINDROME_BENCH_OUTPUT}"

    simple_benchmark_validate_env_variables

    simple_benchmark_entry_cleanup

    simple_benchmark_set_endpoint

    simple_benchmark_execute_browsers

    simple_benchmark_set_sleep

    simple_benchmark_display_duration

    # Wait for file to be downloaded
    sleep 1

    simple_benchmark_display_results

    # Clean up and exit
    simple_benchmark_exit_cleanup
}

simple_benchmark_wrapper

