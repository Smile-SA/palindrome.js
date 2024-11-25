#!/bin/bash

LOCAL_MONITORING_SERVER_URL="http://localhost:9000/dataSys"
TSDB_SERVICE_URL="http://localhost:9009/"
MAX_TRIES=10
DELAY=5
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

check_server_status() {
    local url=$1
    local response=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    echo $response
}

start_local_monitoring_server() {
    cd "$SCRIPT_DIR/../services/localMonitoringServer" || exit 1
    yarn run start &
}

start_tsdb_service() {
    cd "$SCRIPT_DIR/../services/tsdbService" || exit 1
    yarn run dev &
}

wait_for_server() {
    local url=$1
    local tries=0
    while [ $tries -lt $MAX_TRIES ]; do
        local response=$(check_server_status "$url")
        if [ $response -eq 200 ]; then
            echo "Server at $url is up and running."
            curl -s "$url" -o /dev/null
            return 0
        else
            echo "Server at $url is not yet ready. Retrying in $DELAY seconds..."
            sleep $DELAY
            tries=$((tries+1))
        fi
    done

    echo "Maximum number of tries reached. Unable to reach the server at $url."
    return 1
}

main() {
    primary_status=${primary_status:-0}
    additional_status=${additional_status:-0}
    
    local response1=$(check_server_status "$LOCAL_MONITORING_SERVER_URL")
    if [ $response1 -eq 200 ]; then
        echo "Local monitoring server is up and running."
        curl -s "$LOCAL_MONITORING_SERVER_URL" -o /dev/null
    else
        start_local_monitoring_server
        wait_for_server "$LOCAL_MONITORING_SERVER_URL"
        primary_status=$?
    fi

    local response2=$(check_server_status "$TSDB_SERVICE_URL")
    if [ $response2 -eq 200 ]; then
        echo "TSDB service is up and running."
        curl -s "$TSDB_SERVICE_URL" -o /dev/null
        return 0
    else
        start_tsdb_service
        wait_for_server "$TSDB_SERVICE_URL"
        additional_status=$?
    fi

    # Exit with error if either server fails to start
    if [ $primary_status -ne 0 ] || [ $additional_status -ne 0 ]; then
        exit 1
    fi

    exit 0
}

main
