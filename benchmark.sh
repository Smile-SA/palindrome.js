#!/bin/bash

# Set up benchmark parameters
source ./benchmark.env.sh
# Trap SIGINT to clean up before exiting
trap cleanup INT

cleanup() {
    echo -e "\033[1m[INFO] Cleaning up and exiting...\n\033[0m"
    pkill -f firefox
    pkill -f parcel
    firefoxProfile=~/.mozilla/firefox/profiles.ini
    if [ -n "$GITLAB_CI" ]; then
        [ -e "$firefoxProfile" ] && rm "$firefoxProfile"
    fi
    [ -e "$outputFile" ] && rm "$outputFile"
    [ -e "$outputFile.txt" ] && rm "$outputFile.txt"
    exit 0
}

# Set the base path and construct the output file path
mkdir -p "${HOME}/${BROWSER_DOWNLOADS_DIRECTORY}"
outputFile="${HOME}/${BROWSER_DOWNLOADS_DIRECTORY}/${OUTPUT_FILENAME}"

# Remove cache and existing output file
rm -rf .cache
[ -e "$outputFile" ] && rm "$outputFile"
[ -e "$outputFile.txt" ] && rm "$outputFile.txt"

if [[ "$USE_WEBSERVER" = true ]]; then
    # Kill processes on port 1234 and start Parcel
    fuser -k 1234/tcp
    yarn parcel dev/index.html &
    parcelPid=$!

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

if [[ "$HEADLESS_MODE" = false ]]; then
    if [[ "$USE_GPU" = true ]]; then
        firefox -url $url &
    else
        google-chrome --disable-gpu --no-sandbox $url&
    fi
else
    if [[ "$USE_GPU" = true ]]; then
        firefox --headless -url $url &
    else
        if [ -n "$GITLAB_CI" ]; then
            google-chrome --no-sandbox &
            chromePid=$!
            sleep 10
            kill -9 "$chromePid"
            sleep 30
            google-chrome --disable-gpu --no-sandbox $url&
        else
            firefox --headless -url $url &
        fi;
    fi
fi

# Calculate sleep duration based on BENCHMARK_DURATION or default to 60 seconds
if declare -p | grep -q "BENCHMARK_DURATION"; then
    sleepDuration=$((BENCHMARK_DURATION * 60 * 2))
else
    sleepDuration=$((60))
fi

# Display benchmark total duration
echo -e "\033[1m[INFO] $(date '+%Y-%m-%dT%H:%M:%S') Benchmark started. Total duration: $sleepDuration seconds.\n\033[0m"
while [ ! -e "$outputFile" ] && [ ! -e "$outputFile.txt" ]; do
    sleep 0.1
done

# Wait for file to be downloaded
sleep 1

# Display benchmark finish message
echo -e "\033[1m\n[INFO] Benchmark done, displaying results.\n\033[0m"

# Capture system information
cpuInfo=$(lscpu)
ramCapacity=$(free -h | awk '/^Mem:/ {print $2}')
ramCapacityFormatted="RAM: $ramCapacity"

# Append benchmark context and Palindrome.js config to the output file
if [[ "$USE_GPU" = true ]]; then
    fileContent=$(cat "$outputFile")
else
    if [ -n "$GITLAB_CI" ]; then
        fileContent=$(cat "$outputFile.txt")
    else
        fileContent=$(cat "$outputFile")
    fi
fi

# Getting JSON Data from results file
fpsBasicVersion=$(echo "$fileContent" | jq -r '.Basic_version_results."Average FPS rendered"')
fpsWorkersVersion=$(echo "$fileContent" | jq -r '."Web workers_version_results"."Average FPS rendered"')

msBasicVersion=$(echo "$fileContent" | jq -r '.Basic_version_results."Average Milliseconds needed to render a frame"')
msWorkersVersion=$(echo "$fileContent" | jq -r '."Web workers_version_results"."Average Milliseconds needed to render a frame"')

dataStructure=$(echo "$fileContent" | jq -r '.palindrome_config')

# Display output files path
echo -e "\033[1m\n[INFO] Output files:\n- $outputFile.context \n- $outputFile.results \n- $outputFile.data\033[0m"

echo -e "-------$currentDateTime Benchmark context:\n" > "$outputFile.context"
echo "$dataStructure" > "$outputFile.data"
echo "$cpuInfo" >> "$outputFile.context"
echo "$ramCapacityFormatted" >> "$outputFile.context"
echo "$fileContent" > "$outputFile.results_"
jq 'del(.palindrome_config)' $outputFile.results_ > $outputFile.results
rm $outputFile.results_
cat "$outputFile.context"
echo -e "\033[1m[INFO] $(date '+%Y-%m-%dT%H:%M:%S') Palindrome.js benchmark results:\n\033[0m"
#cat "$outputFile.results"
echo -e "\n-------------------------------------------------------------------------------------"
echo "                                  Basic version                   Web workes version"
echo "-------------------------------------------------------------------------------------"
echo "FPS (Frames per second)      |    $fpsBasicVersion                           $fpsWorkersVersion"
echo "MS needed to render a frame  |    $msBasicVersion                           $msWorkersVersion"
echo "-------------------------------------------------------------------------------------"
echo "Total duration (seconds)     |    $sleepDuration"
echo "-------------------------------------------------------------------------------------"

#echo -e "\033[1m[INFO] $(date '+%Y-%m-%dT%H:%M:%S') Benchmark total time $sleepDuration seconds.\n\033[0m" 

# Clean up and exit
cleanup