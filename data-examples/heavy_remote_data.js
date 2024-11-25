export function heavyRemoteSchema() {
    return {
        metrics: [
            {
                id: 'request-count-id',
                label: {
                    jmesPath: 'metrics[2].name'
                },
                value: {
                    jmesPath: 'metrics[2].value'
                },
                unit: {
                    jmesPath: 'metrics[2].unit'
                },
                ranges: [0, 50, 150],
                dataProviderId: 'api-2',
            },
            {
                id: 'memory-usage-id',
                label: {
                    jmesPath: 'metrics[1].name'
                },
                value: {
                    jmesPath: 'metrics[1].value'
                },
                unit: {
                    jmesPath: 'metrics[1].unit'
                },
                ranges: [0, 500, 1600],
                dataProviderId: 'api-2',
                remoteDataFetchPace: 3000
            },
            {
                label: 'Kernal',
                unit: ' ',
                id: 'kernal-id',
                query: 'from(bucket: "Palindrome.js")  |> range(start:-1m)  |> filter(fn: (r) => r["_measurement"] == "kernel")  |> filter(fn: (r) => r["_field"] == "processes_forked")  |> map(fn: (r) => ({r with _value: r._value / 1000000}))',
                ranges: [0, 10, 30],
                dataProviderId: "influxdb-1",
                remoteDataFetchPace: 6000
            },
            {
                label: 'Disk Weighted IO Time',
                unit: 'MS',
                id: 'diskWIOT-id',
                query: 'from(bucket: "Palindrome.js") |> range(start:-1m) |> filter(fn: (r) => r["_measurement"] == "diskio") |> filter(fn: (r) => r["_field"] == "weighted_io_time") |> filter(fn: (r) => r["name"] == "sda")',
                ranges: [0, 500, 1000],
                dataProviderId: "influxdb-1",
                remoteDataFetchPace: 6000
            },
            {
                label: 'Disk Write Time',
                unit: 'MS',
                id: 'diskWT-id',
                query: 'from(bucket: "Palindrome.js")  |> range(start:-1m) |> filter(fn: (r) => r["_measurement"] == "diskio")  |> filter(fn: (r) => r["_field"] == "write_time")  |> filter(fn: (r) => r["name"] == "sda")',
                ranges: [0, 500, 1000],
                dataProviderId: "influxdb-1"
            },
            {
                label: 'HTTP Requests (success)',
                unit: ' ',
                id: 'http200',
                query: "promhttp_metric_handler_requests_total{code='200'}",
                ranges: [0, 1_000_000, 400_000_000],
                dataProviderId: "prometheus-1",
                remoteDataFetchPace: 8000
            },
            {
                label: 'node_dmi_info',
                unit: ' ',
                id: 'node_dmi_info',
                query: "node_dmi_info",
                ranges: [0, 3, 5],
                dataProviderId: "prometheus-1",
                remoteDataFetchPace: 8000
            },
            {
                label: 'node_filesystem_files',
                unit: ' ',
                id: 'node_filesystem_files',
                query: 'node_filesystem_files{device="tmpfs", fstype="tmpfs", instance="node_exporter:9100", job="palindrome_remote_data_source", mountpoint="/run/snapd/ns"}',
                ranges: [900_000, 1_000_000, 2_000_000],
                dataProviderId: "prometheus-1"
            },
            {
                label: 'node_cpu_seconds_total x 1000',
                unit: ' ',
                id: 'node_cpu_seconds_total',
                query: 'rate(node_cpu_seconds_total{mode="user", cpu="2"}[5m])*1000',
                ranges: [0, 5, 12],
                dataProviderId: "prometheus-1"
            },
            {
                label: 'node_intr_total',
                unit: ' ',
                id: 'node_intr_total',
                query: 'rate(node_intr_total[5m])',
                ranges: [200, 3000, 6000],
                dataProviderId: "prometheus-1"
            },
            {
                label: 'node_context_switches_total',
                unit: ' ',
                id: 'node_context_switches_total',
                query: 'rate(node_context_switches_total[5m])',
                ranges: [200, 500, 800],
                dataProviderId: "prometheus-1"
            },
            {
                id: 'request-count-id2',
                label: {
                    jmesPath: 'metrics[2].name' 
                },
                value: {
                    jmesPath: 'metrics[2].value'
                },
                unit: {
                    jmesPath: 'metrics[2].unit'
                },
                ranges: [0, 50, 150],
                dataProviderId: 'api-2',
            },
            {
                id: 'memory-usage-id2',
                label: {
                    jmesPath: 'metrics[1].name' 
                },
                value: {
                    jmesPath: 'metrics[1].value'
                },
                unit: {
                    jmesPath: 'metrics[1].unit'
                },
                ranges: [0, 500, 1600],
                dataProviderId: 'api-2',
                remoteDataFetchPace: 3000
            },
            {
                label: 'Kernal',
                unit: ' ',
                id: 'kernal-id2',
                query: 'from(bucket: "Palindrome.js")  |> range(start:-1m)  |> filter(fn: (r) => r["_measurement"] == "kernel")  |> filter(fn: (r) => r["_field"] == "processes_forked")  |> map(fn: (r) => ({r with _value: r._value / 1000000}))',
                ranges: [0, 10, 30],
                dataProviderId: "influxdb-1",
                remoteDataFetchPace: 6000
            },
            {
                label: 'Disk Weighted IO Time',
                unit: 'MS',
                id: 'diskWIOT-id2',
                query: 'from(bucket: "Palindrome.js") |> range(start:-1m) |> filter(fn: (r) => r["_measurement"] == "diskio") |> filter(fn: (r) => r["_field"] == "weighted_io_time") |> filter(fn: (r) => r["name"] == "sda")',
                ranges: [0, 500, 1000],
                dataProviderId: "influxdb-1",
                remoteDataFetchPace: 6000
            },
            {
                label: 'Disk Write Time',
                unit: 'MS',
                id: 'diskWT-id2',
                query: 'from(bucket: "Palindrome.js")  |> range(start:-1m) |> filter(fn: (r) => r["_measurement"] == "diskio")  |> filter(fn: (r) => r["_field"] == "write_time")  |> filter(fn: (r) => r["name"] == "sda")',
                ranges: [0, 500, 1000],
                dataProviderId: "influxdb-1"
            },
            {
                label: 'HTTP Requests (success)',
                unit: ' ',
                id: 'http2002',
                query: "promhttp_metric_handler_requests_total{code='200'}",
                ranges: [0, 1_000_000, 400_000_000],
                dataProviderId: "prometheus-1",
                remoteDataFetchPace: 8000
            },
            {
                label: 'node_dmi_info',
                unit: ' ',
                id: 'node_dmi_info2',
                query: "node_dmi_info",
                ranges: [0, 3, 5],
                dataProviderId: "prometheus-1",
                remoteDataFetchPace: 8000
            },
            {
                label: 'node_filesystem_files',
                unit: ' ',
                id: 'node_filesystem_files2',
                query: 'node_filesystem_files{device="tmpfs", fstype="tmpfs", instance="node_exporter:9100", job="palindrome_remote_data_source", mountpoint="/run/snapd/ns"}',
                ranges: [900_000, 1_000_000, 2_000_000],
                dataProviderId: "prometheus-1"
            },
            {   
                label: 'node_cpu_seconds_total x 1000',
                unit: ' ',
                id: 'node_cpu_seconds_total2',
                query: 'rate(node_cpu_seconds_total{mode="user", cpu="2"}[5m])*1000',
                ranges: [0, 5, 12],
                dataProviderId: "prometheus-1"
            },
            {   
                label: 'node_intr_total',
                unit: ' ',
                id: 'node_intr_total2',
                query: 'rate(node_intr_total[5m])',
                ranges: [200, 3000, 6000],
                dataProviderId: "prometheus-1"
            },
            {   
                label: 'node_context_switches_total',
                unit: ' ',
                id: 'node_context_switches_total2',
                query: 'rate(node_context_switches_total[5m])',
                ranges: [200, 500, 800],
                dataProviderId: "prometheus-1"
            },
            {
                id: 'request-count-id3',
                label: {
                    jmesPath: 'metrics[2].name' 
                },
                value: {
                    jmesPath: 'metrics[2].value'
                },
                unit: {
                    jmesPath: 'metrics[2].unit'
                },
                ranges: [0, 50, 150],
                dataProviderId: 'api-2',
            },
            {
                id: 'memory-usage-id3',
                label: {
                    jmesPath: 'metrics[1].name' 
                },
                value: {
                    jmesPath: 'metrics[1].value'
                },
                unit: {
                    jmesPath: 'metrics[1].unit'
                },
                ranges: [0, 500, 1600],
                dataProviderId: 'api-2',
                remoteDataFetchPace: 3000
            },
            {
                label: 'Kernal',
                unit: ' ',
                id: 'kernal-id3',
                query: 'from(bucket: "Palindrome.js")  |> range(start:-1m)  |> filter(fn: (r) => r["_measurement"] == "kernel")  |> filter(fn: (r) => r["_field"] == "processes_forked")  |> map(fn: (r) => ({r with _value: r._value / 1000000}))',
                ranges: [0, 10, 30],
                dataProviderId: "influxdb-1",
                remoteDataFetchPace: 6000
            },
            {
                label: 'Disk Weighted IO Time',
                unit: 'MS',
                id: 'diskWIOT-id3',
                query: 'from(bucket: "Palindrome.js") |> range(start:-1m) |> filter(fn: (r) => r["_measurement"] == "diskio") |> filter(fn: (r) => r["_field"] == "weighted_io_time") |> filter(fn: (r) => r["name"] == "sda")',
                ranges: [0, 500, 1000],
                dataProviderId: "influxdb-1",
                remoteDataFetchPace: 6000
            },
            {
                label: 'Disk Write Time',
                unit: 'MS',
                id: 'diskWT-id3',
                query: 'from(bucket: "Palindrome.js")  |> range(start:-1m) |> filter(fn: (r) => r["_measurement"] == "diskio")  |> filter(fn: (r) => r["_field"] == "write_time")  |> filter(fn: (r) => r["name"] == "sda")',
                ranges: [0, 500, 1000],
                dataProviderId: "influxdb-1"
            },
            {
                label: 'HTTP Requests (success)',
                unit: ' ',
                id: 'http2003',
                query: "promhttp_metric_handler_requests_total{code='200'}",
                ranges: [0, 1_000_000, 400_000_000],
                dataProviderId: "prometheus-1",
                remoteDataFetchPace: 8000
            },
            {
                label: 'node_dmi_info',
                unit: ' ',
                id: 'node_dmi_info3',
                query: "node_dmi_info",
                ranges: [0, 3, 5],
                dataProviderId: "prometheus-1",
                remoteDataFetchPace: 8000
            },
            {
                label: 'node_filesystem_files',
                unit: ' ',
                id: 'node_filesystem_files3',
                query: 'node_filesystem_files{device="tmpfs", fstype="tmpfs", instance="node_exporter:9100", job="palindrome_remote_data_source", mountpoint="/run/snapd/ns"}',
                ranges: [900_000, 1_000_000, 2_000_000],
                dataProviderId: "prometheus-1"
            },
            {   
                label: 'node_cpu_seconds_total x 1000',
                unit: ' ',
                id: 'node_cpu_seconds_total3',
                query: 'rate(node_cpu_seconds_total{mode="user", cpu="2"}[5m])*1000',
                ranges: [0, 5, 12],
                dataProviderId: "prometheus-1"
            },
            {   
                label: 'node_intr_total',
                unit: ' ',
                id: 'node_intr_total3',
                query: 'rate(node_intr_total[5m])',
                ranges: [200, 3000, 6000],
                dataProviderId: "prometheus-1"
            },
            {   
                label: 'node_context_switches_total',
                unit: ' ',
                id: 'node_context_switches_total3',
                query: 'rate(node_context_switches_total[5m])',
                ranges: [200, 500, 800],
                dataProviderId: "prometheus-1"
            },
            {
                id: 'request-count-id4',
                label: {
                    jmesPath: 'metrics[2].name' 
                },
                value: {
                    jmesPath: 'metrics[2].value'
                },
                unit: {
                    jmesPath: 'metrics[2].unit'
                },
                ranges: [0, 50, 150],
                dataProviderId: 'api-2',
            },
            {
                id: 'memory-usage-id4',
                label: {
                    jmesPath: 'metrics[1].name' 
                },
                value: {
                    jmesPath: 'metrics[1].value'
                },
                unit: {
                    jmesPath: 'metrics[1].unit'
                },
                ranges: [0, 500, 1600],
                dataProviderId: 'api-2',
                remoteDataFetchPace: 3000
            },
            {
                label: 'Kernal',
                unit: ' ',
                id: 'kernal-id4',
                query: 'from(bucket: "Palindrome.js")  |> range(start:-1m)  |> filter(fn: (r) => r["_measurement"] == "kernel")  |> filter(fn: (r) => r["_field"] == "processes_forked")  |> map(fn: (r) => ({r with _value: r._value / 1000000}))',
                ranges: [0, 10, 30],
                dataProviderId: "influxdb-1",
                remoteDataFetchPace: 6000
            },
            {
                label: 'Disk Weighted IO Time',
                unit: 'MS',
                id: 'diskWIOT-id4',
                query: 'from(bucket: "Palindrome.js") |> range(start:-1m) |> filter(fn: (r) => r["_measurement"] == "diskio") |> filter(fn: (r) => r["_field"] == "weighted_io_time") |> filter(fn: (r) => r["name"] == "sda")',
                ranges: [0, 500, 1000],
                dataProviderId: "influxdb-1",
                remoteDataFetchPace: 6000
            },
            {
                label: 'Disk Write Time',
                unit: 'MS',
                id: 'diskWT-id4',
                query: 'from(bucket: "Palindrome.js")  |> range(start:-1m) |> filter(fn: (r) => r["_measurement"] == "diskio")  |> filter(fn: (r) => r["_field"] == "write_time")  |> filter(fn: (r) => r["name"] == "sda")',
                ranges: [0, 500, 1000],
                dataProviderId: "influxdb-1"
            },
            {
                label: 'HTTP Requests (success)',
                unit: ' ',
                id: 'http2004',
                query: "promhttp_metric_handler_requests_total{code='200'}",
                ranges: [0, 1_000_000, 400_000_000],
                dataProviderId: "prometheus-1",
                remoteDataFetchPace: 8000
            },
            {
                label: 'node_dmi_info',
                unit: ' ',
                id: 'node_dmi_info4',
                query: "node_dmi_info",
                ranges: [0, 3, 5],
                dataProviderId: "prometheus-1",
                remoteDataFetchPace: 8000
            },
            {
                label: 'node_filesystem_files',
                unit: ' ',
                id: 'node_filesystem_files4',
                query: 'node_filesystem_files{device="tmpfs", fstype="tmpfs", instance="node_exporter:9100", job="palindrome_remote_data_source", mountpoint="/run/snapd/ns"}',
                ranges: [900_000, 1_000_000, 2_000_000],
                dataProviderId: "prometheus-1"
            },
            {   
                label: 'node_cpu_seconds_total x 1000',
                unit: ' ',
                id: 'node_cpu_seconds_total4',
                query: 'rate(node_cpu_seconds_total{mode="user", cpu="2"}[5m])*1000',
                ranges: [0, 5, 12],
                dataProviderId: "prometheus-1"
            },
            {   
                label: 'node_intr_total',
                unit: ' ',
                id: 'node_intr_total4',
                query: 'rate(node_intr_total[5m])',
                ranges: [200, 3000, 6000],
                dataProviderId: "prometheus-1"
            },
            {   
                label: 'node_context_switches_total',
                unit: ' ',
                id: 'node_context_switches_total4',
                query: 'rate(node_context_switches_total[5m])',
                ranges: [200, 500, 800],
                dataProviderId: "prometheus-1"
            }                                    
        ],
        layers: [
            {
                name: "Jmes-path-layer",
                metrics: [
                    'request-count-id',
                    'memory-usage-id',
                    {
                        id: 'cpu-per-core-id',
                        label: 'Core 0',
                        value: {
                            jmesPath: 'metrics.system.cpu.usage.perCore[0].value'
                        },
                        unit: {
                            jmesPath: 'metrics.system.cpu.usage.perCore[0].units'
                        },
                        ranges: ['metrics.system.cpu.usage.perCore[1].value', 80, 100],
                        dataProviderId: 'api-1',
                        remoteDataFetchPace: 3000
                    }
                ],
                options: {
                    "mainColorStatic": "#319b31",
                    "layerColorLow": "#ffffff",
                    "layerColorMed": "#f3c60a",
                    "layerColorHigh": "#0096FF",
                    "sphereColorLow": "#ffffff",
                    "sphereColorMed": "#f3c60a",
                    "sphereColorHigh": "#0096FF",
                }
            },
            {
                name: "Server-layer",
                metrics: [
                    {
                        label: 'CPU usage user',
                        unit: ' ',
                        id: 'usage_user',
                        query: 'from(bucket: "Palindrome.js")  |> range(start:-1m)  |> filter(fn: (r) => r["_measurement"] == "cpu") |> filter(fn: (r) => r["_field"] == "usage_user") |> filter(fn: (r) => r["cpu"] == "cpu-total")',
                        ranges: [0, 50, 150],
                        dataProviderId: "influxdb-1",
                        remoteDataFetchPace: 8500
                    },
                    {
                        label: 'RAM',
                        unit: 'MB',
                        id: 'ram-id',
                        query: 'from(bucket: "Palindrome.js")  |> range(start:-1m)  |> filter(fn: (r) => r["_measurement"] == "mem")  |> filter(fn: (r) => r["_field"] == "used") |> map(fn: (r) => ({r with _value: r._value / 1073741}))',
                        ranges: [0, 16000, 32000],
                        dataProviderId: "influxdb-1"
                    },
                    'kernal-id',
                    'node_filesystem_files',
                    'node_intr_total',
                    'node_cpu_seconds_total'
                ]
            },
            {
                name: "Container-layer",
                metrics: [
                    'diskWIOT-id',
                    'diskWT-id',
                    'http200',
                    'node_dmi_info',
                    {
                        label: 'node_memory_Percpu_bytes',
                        unit: ' ',
                        id: 'node_memory_Percpu_bytes',
                        query: 'node_memory_Percpu_bytes',
                        ranges: [10_000_000, 50_000_000, 100_000_000],
                        dataProviderId: "prometheus-1"
                    },
                    'node_context_switches_total'
                ],
                options: {
                    "mainColorStatic": "#319b31",
                }
            },
            {
                name: "Duplicate-layer-1",
                metrics: [
                    "request-count-id2",
                    "memory-usage-id2",
                    "kernal-id2",
                    "diskWIOT-id2",
                    "diskWT-id2",
                    "http2002"
                ],
            },
            {
                name: "Duplicate-layer-2",
                metrics: [
                    "node_dmi_info2",
                    "node_filesystem_files2",
                    "node_cpu_seconds_total2",
                    "node_intr_total2",
                    "node_context_switches_total2"
                ],
            },
            {
                name: "Duplicate-layer-3",
                metrics: [
                    "request-count-id3",
                    "memory-usage-id3",
                    "kernal-id3",
                    "diskWIOT-id3",
                    "diskWT-id3",
                    "http2003"
                ],
            },
            {
                name: "Duplicate-layer-4",
                metrics: [
                    "node_dmi_info3",
                    "node_filesystem_files3",
                    "node_cpu_seconds_total3",
                    "node_intr_total3",
                    "node_context_switches_total3"
                ],
            },
            {
                name: "Duplicate-layer-5",
                metrics: [
                    "request-count-id4",
                    "memory-usage-id4",
                    "kernal-id4",
                    "diskWIOT-id4",
                    "diskWT-id4",
                    "http2004"
                ],
            },
            {
                name: "Duplicate-layer-5",
                metrics: [
                    "node_dmi_info4",
                    "node_filesystem_files4",
                    "node_cpu_seconds_total4",
                    "node_intr_total4",
                    "node_context_switches_total4"
                ],
            }
        ],
        dataProviders: [
            {
                id: 'influxdb-1',
                type: 'influxdb',
                url: 'http://localhost:8086',
                token: 'token',
                org: 'smile_rnd',
                remoteDataFetchPace: 1_000
            },
            {
                id: 'prometheus-1',
                type: 'prometheus',
                url: 'http://localhost:9090',
                remoteDataFetchPace: 5_000
            },
            {
                id: 'api-1',
                type: 'apiEndpoint',
                url: '/apiV1.json',
                remoteDataFetchPace: 20_000
            },
            {
                id: 'api-2',
                type: 'apiEndpoint',
                url: '/apiV2.json',
                remoteDataFetchPace: 20_000
            },

        ],
        options: {
            liveData: false,
            useBackend: false,
            remoteDataFetchPace: 1_000 * 60,
            benchmarkDataUpdate: false,
            benchmarkDuration: 1_000 * 60 * 2,
            benchmarkInitialData: false
        }
    }
}
