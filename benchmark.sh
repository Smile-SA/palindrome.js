#!/bin/bash
# Set up benchmark parameters
source ./benchmark.env.sh
# Trap SIGINT to clean up before exiting
trap cleanup INT

cleanup() {
    echo -e "\033[1m[INFO] Cleaning up and exiting...\n\033[0m"
    pkill -f firefox
    pkill -f parcel
    firefox_profile=~/.mozilla/firefox/profiles.ini
    if [[ -n "$GITLAB_CI" ]]; then
        if [[ -f "$firefox_profile" ]]; then
            rm "$firefox_profile"
        fi
    fi
    if [[ -f "$output_file" ]]; then
        rm "$output_file"
    fi
    if [[ -f "$output_file.txt" ]]; then
        rm "$output_file.txt"
    fi
    exit 0
}

# Set the base path and construct the output file path
mkdir -p "${HOME}/${PALINDROME_BENCH_DL_DIRECTORY}"
output_file="${HOME}/${PALINDROME_BENCH_DL_DIRECTORY}/${PALINDROME_BENCH_OUTPUT}"

# Remove cache and existing output file
rm -rf .cache
if [[ -f "$output_file" ]]; then
    rm "$output_file"
fi
if [[ -f "$output_file.txt" ]]; then
    rm "$output_file.txt"
fi

if [[ "$PALINDROME_BENCH_WEBSERVER" == true ]]; then
    # Kill processes on port 1234 and start Parcel
    fuser -k 1234/tcp
    yarn parcel dev/index.html &
    # parcel_pid=$!

    # Wait for Parcel to start
    sleep 30
    url="http://localhost:1234"
else
    yarn parcel build dev/index.html --public-url ./ --no-cache
    url="./dist/index.html"
fi

# Launch browser
Xvfb :1 -screen 0 1024x768x16 &
export DISPLAY=:1

if [[ "$PALINDROME_BENCH_HEADLESS" == false ]]; then
    if [[ "$PALINDROME_BENCH_GPU" == true ]]; then
        firefox -url $url &
    else
        google-chrome --disable-gpu --no-sandbox $url&
    fi
else
    if [[ "$PALINDROME_BENCH_GPU" == true ]]; then
        firefox --headless -url $url &
    else
        if [[ -n "$GITLAB_CI" ]]; then
            google-chrome --no-sandbox &
            chrome_pid=$!
            sleep 10
            kill -9 "$chrome_pid"
            sleep 30
            google-chrome --disable-gpu --no-sandbox $url&
        else
            firefox --headless -url $url &
        fi;
    fi
fi

# Calculate sleep duration based on BENCHMARK_DURATION or default to 60 seconds
if declare -p | grep -q "PALINDROME_BENCH_DURATION"; then
    sleep_duration=$((PALINDROME_BENCH_DURATION * 60 * 2))
else
    sleep_duration=$((60))
fi

# Display benchmark total duration
echo -e "\033[1m[INFO] $(date '+%Y-%m-%dT%H:%M:%S') Benchmark started. Total duration: $sleep_duration seconds.\n\033[0m"
while [[ ! -f "$output_file" ]] && [[ ! -f "$output_file.txt" ]]; do
    sleep 0.1
done

# Wait for file to be downloaded
sleep 1

# Display benchmark finish message
echo -e "\033[1m\n[INFO] Benchmark done, displaying results.\n\033[0m"

# Capture system information
cpu_info=$(lscpu)
ram_capacity=$(free -h | awk '/^Mem:/ {print $2}')
ram_capacity_formatted="RAM: $ram_capacity"

# Append benchmark context and Palindrome.js config to the output file
if [[ "$PALINDROME_BENCH_GPU" == true ]]; then
    file_content=$(cat "$output_file")
else
    if [[ -n "$GITLAB_CI" ]]; then
        file_content=$(cat "$output_file.txt")
    else
        file_content=$(cat "$output_file")
    fi
fi

# Getting JSON Data from results file
fps_basic_version=$(echo "$file_content" | jq -r '.Basic_version_results."Average FPS rendered"')
fps_workers_version=$(echo "$file_content" | jq -r '."Web workers_version_results"."Average FPS rendered"')

ms_basic_version=$(echo "$file_content" | jq -r '.Basic_version_results."Average Milliseconds needed to render a frame"')
ms_workers_version=$(echo "$file_content" | jq -r '."Web workers_version_results"."Average Milliseconds needed to render a frame"')

data_structure=$(echo "$file_content" | jq -r '.palindrome_config')

# Display output files path
echo -e "\033[1m\n[INFO] Output files:\n- $output_file.context \n- $output_file.results \n- $output_file.data\033[0m"

echo -e "-------$currentDateTime Benchmark context:\n" > "$output_file.context"
echo "$data_structure" > "$output_file.data"
echo "$cpu_info" >> "$output_file.context"
echo "$ram_capacity_formatted" >> "$output_file.context"
echo "$file_content" > "$output_file.results_"
jq 'del(.palindrome_config)' $output_file.results_ > $output_file.results
rm $output_file.results_
cat "$output_file.context"
echo -e "\033[1m[INFO] $(date '+%Y-%m-%dT%H:%M:%S') Palindrome.js benchmark results:\n\033[0m"
#cat "$output_file.results"
echo -e "\n-------------------------------------------------------------------------------------"
echo "                                  Basic version                   Web workes version"
echo "-------------------------------------------------------------------------------------"
echo "FPS (Frames per second)      |    $fps_basic_version                           $fps_workers_version"
echo "MS needed to render a frame  |    $ms_basic_version                           $ms_workers_version"
echo "-------------------------------------------------------------------------------------"
echo "Total duration (seconds)     |    $sleep_duration"
echo "-------------------------------------------------------------------------------------"

#echo -e "\033[1m[INFO] $(date '+%Y-%m-%dT%H:%M:%S') Benchmark total time $sleep_duration seconds.\n\033[0m" 

# Clean up and exit
cleanup