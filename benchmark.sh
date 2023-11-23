#!/bin/bash

# Trap SIGINT to clean up before exiting
trap cleanup INT

cleanup() {
    pkill -f firefox
    pkill -f parcel
    rm ~/.mozilla/firefox/profiles.ini
    echo -e "\033[1m\n[INFO] Cleaning up and exiting...\n\033[0m"
    exit 1
}

# Set up benchmark parameters
export PALINDROME_TYPE=basic
export IS_BENCHMARK=true
export BENCHMARK_DURATION=1
export USE_CASE_NAME=dcFullMap
export WORKERS_RESSOURES_LEVEL=100
export OUTPUT_FILENAME=benchmark_results

# Set the base path and construct the output file path
homeDirectory="$HOME"
downloadsDirectory="Downloads"
basePath="${homeDirectory}/${downloadsDirectory}/"
outputFile="${basePath}${OUTPUT_FILENAME}"

# Remove cache and existing output file

rm -rf .cache
[ -e "$outputFile" ] && rm "$outputFile"

# Kill processes on port 1234 and start Parcel
fuser -k 1234/tcp
yarn parcel dev/index.html &
parcelPid=$!

# Wait for Parcel to start
sleep 30

# Launch Firefox in headless mode
firefox --headless -url http://localhost:1234/ &

# Wait for firefox to start
sleep 5

# Display benchmark start message
currentDateTime=$(date '+%Y-%m-%d %H:%M:%S')
echo -e "\033[1m\n[INFO] Execution starting time: $currentDateTime.\n\033[0m"

# Calculate sleep duration based on BENCHMARK_DURATION or default to 60 seconds
if declare -p | grep -q "BENCHMARK_DURATION"; then
    sleepDuration=$((BENCHMARK_DURATION * 60 * 2))
else
    sleepDuration=$((60))
fi

# Display benchmark total duration
echo -e "\033[1m[INFO] Benchmark total duration: $sleepDuration seconds.\n\033[0m"

# Start loading spinner
spinner=( ⠋ ⠙ ⠹ ⠸ ⠼ ⠴ ⠦ ⠧ ⠇ ⠏ )
i=0
start_time=$(date +%s)
while [ ! -e "$outputFile" ]; do
    current_time=$(date +%s)
    elapsed_time=$((current_time - start_time))
    echo -n -e "\033[1m[INFO] Benchmark started. Time elapsed: ${elapsed_time}s  ${spinner[i]}  \r\033[0m"
    sleep 0.1
    i=$(( (i+1) % ${#spinner[@]} ))
done
# Display output file path
echo -e "\033[1m\n[INFO] Output file: $outputFile\n\033[0m"

# Display benchmark finish message
echo -e "\033[1m\n[INFO] Benchmark done, displaying results.\n\033[0m"

# Capture system information
cpuInfo=$(lscpu)
ramCapacity=$(free -h | awk '/^Mem:/ {print $2}')
ramCapacityFormatted="RAM: $ramCapacity"

# Append benchmark context and Palindrome.js config to the output file
fileContent=$(cat "$outputFile")
echo -e "\n\n************************* Benchmark context:\n" > "$outputFile"
echo "$cpuInfo" >> "$outputFile"
echo "$ramCapacityFormatted" >> "$outputFile"
echo -e "\n\n************************* Palindrome.js benchmark results:\n" >> "$outputFile"
echo "$fileContent" >> "$outputFile"
cat "$outputFile"

# Clean up and exit
cleanup