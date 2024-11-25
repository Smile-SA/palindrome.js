export function localLiveMonitoring() {
    return {
        metrics: [
            {
                id: "cpu",
                label: "CPU",
                value: {
                    jmesPath: "systemMetrics.metrics.cpu.current"
                },
                unit: {
                    jmesPath: "systemMetrics.metrics.cpu.unit"
                },
                ranges: [
                    "systemMetrics.metrics.cpu.min",
                    "systemMetrics.metrics.cpu.med",
                    "systemMetrics.metrics.cpu.max"
                ],
                dataProviderId: "local-live-monitoring-api"
            },
            {
                id: "cpuTemperature",
                label: "CPU Temperature",
                value: {
                    jmesPath: "systemMetrics.metrics.cpuTemperature.current"
                },
                unit: {
                    jmesPath: "systemMetrics.metrics.cpuTemperature.unit"
                },
                ranges: [
                    "systemMetrics.metrics.cpuTemperature.min",
                    "systemMetrics.metrics.cpuTemperature.med",
                    "systemMetrics.metrics.cpuTemperature.max"
                ],
                dataProviderId: "local-live-monitoring-api"
            },
            {
                id: "storage",
                label: "Storage",
                value: {
                    jmesPath: "systemMetrics.metrics.storage.current"
                },
                unit: {
                    jmesPath: "systemMetrics.metrics.storage.unit"
                },
                ranges: [
                    "systemMetrics.metrics.storage.min",
                    "systemMetrics.metrics.storage.med",
                    "systemMetrics.metrics.storage.max"
                ],
                dataProviderId: "local-live-monitoring-api"
            },
            {
                id: "ram",
                label: "RAM",
                value: {
                    jmesPath: "systemMetrics.metrics.ram.current"
                },
                unit: {
                    jmesPath: "systemMetrics.metrics.ram.unit"
                },
                ranges: [
                    "systemMetrics.metrics.ram.min",
                    "systemMetrics.metrics.ram.med",
                    "systemMetrics.metrics.ram.max"
                ],
                dataProviderId: "local-live-monitoring-api"
            },
            {
                id: "wifiFrequency",
                label: "Wifi Frequency",
                value: {
                    jmesPath: "systemMetrics.metrics.wifiFrequency.current"
                },
                unit: {
                    jmesPath: "systemMetrics.metrics.wifiFrequency.unit"
                },
                ranges: [
                    "systemMetrics.metrics.wifiFrequency.min",
                    "systemMetrics.metrics.wifiFrequency.med",
                    "systemMetrics.metrics.wifiFrequency.max"
                ],
                dataProviderId: "local-live-monitoring-api"
            },
            {
                id: "totalDataReceived",
                label: "Data Received",
                value: {
                    jmesPath: "qosMetrics.metrics.totalDataReceived.current"
                },
                unit: {
                    jmesPath: "qosMetrics.metrics.totalDataReceived.unit"
                },
                ranges: [
                    "qosMetrics.metrics.totalDataReceived.min",
                    "qosMetrics.metrics.totalDataReceived.med",
                    "qosMetrics.metrics.totalDataReceived.max"
                ],
                dataProviderId: "local-live-monitoring-api"
            },
            {
                id: "totalDataTransferred",
                label: "Data Transferred",
                value: {
                    jmesPath: "qosMetrics.metrics.totalDataTransferred.current"
                },
                unit: {
                    jmesPath: "qosMetrics.metrics.totalDataTransferred.unit"
                },
                ranges: [
                    "qosMetrics.metrics.totalDataTransferred.min",
                    "qosMetrics.metrics.totalDataTransferred.med",
                    "qosMetrics.metrics.totalDataTransferred.max"
                ],
                dataProviderId: "local-live-monitoring-api"
            },
            {
                id: "cpuSpeed",
                label: "CPU Speed",
                value: {
                    jmesPath: "qosMetrics.metrics.cpuSpeed.current"
                },
                unit: {
                    jmesPath: "qosMetrics.metrics.cpuSpeed.unit"
                },
                ranges: [
                    "qosMetrics.metrics.cpuSpeed.min",
                    "qosMetrics.metrics.cpuSpeed.med",
                    "qosMetrics.metrics.cpuSpeed.max"
                ],
                dataProviderId: "local-live-monitoring-api"
            },
            {
                id: "readIOPS",
                label: "Read Input/Output Operations",
                value: {
                    jmesPath: "qosMetrics.metrics.readIOPS.current"
                },
                unit: {
                    jmesPath: "qosMetrics.metrics.readIOPS.unit"
                },
                ranges: [
                    "qosMetrics.metrics.readIOPS.min",
                    "qosMetrics.metrics.readIOPS.med",
                    "qosMetrics.metrics.readIOPS.max"
                ],
                dataProviderId: "local-live-monitoring-api"
            },
            {
                id: "writeIOPS",
                label: "Write Input/Output Operations",
                value: {
                    jmesPath: "qosMetrics.metrics.writeIOPS.current"
                },
                unit: {
                    jmesPath: "qosMetrics.metrics.writeIOPS.unit"
                },
                ranges: [
                    "qosMetrics.metrics.writeIOPS.min",
                    "qosMetrics.metrics.writeIOPS.med",
                    "qosMetrics.metrics.writeIOPS.max"
                ],
                dataProviderId: "local-live-monitoring-api"
            }
        ],
        layers: [
            {
                name: "systemMetrics-layer",
                metrics: [
                    "cpu",
                    "cpuTemperature",
                    "storage",
                    "ram",
                    "wifiFrequency"
                ]
            },
            {
                name: "qosMetrics-layer",
                metrics: [
                    "totalDataReceived",
                    "totalDataTransferred",
                    "cpuSpeed",
                    "readIOPS",
                    "writeIOPS"
                ]
            }
        ],
        dataProviders: [
            {
                id: 'local-live-monitoring-api',
                type: 'apiEndpoint',
                url: 'http://localhost:9000/dataSys',
            }

        ],
        options: {
            liveData: false,
            remoteDataFetchPace: 5_000
        }
    }
}
