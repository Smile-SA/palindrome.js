cd localMonitoringServer
yarn run start &
# cold start
SERVER_URL="http://localhost:3000/dataSys"
MAX_TRIES=10
DELAY=5  # Delay in seconds between each attempt

tries=0

while [ $tries -lt $MAX_TRIES ]; do
    response=$(curl -s -o /dev/null -w "%{http_code}" $SERVER_URL)
    if [ $response -eq 200 ]; then
        echo "Server is up and running. Proceeding with GET request."
        curl $SERVER_URL -o /dev/null
        exit 0
    else
        echo "Server is not yet ready. Retrying in $DELAY seconds..."
        sleep $DELAY
        tries=$((tries+1))

    fi
done

echo "Maximum number of tries reached. Unable to reach the server."
exit 1
