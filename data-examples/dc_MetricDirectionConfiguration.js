export function dcMetricDirectionConfiguration() {
    return {
        "systemMetrics": {
            "metrics": {
                "cpu": {
                    "label": "CPU",
                    "unit": "cycle / seconds",
                    "min": 100,
                    "med": 500,
                    "max": 1000,
                    "current": 1000,
                    "metricDirection": "ascending"
                },
                "ram": {
                    "label": "RAM",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 1280,
                    "metricDirection": "ascending"
                },
                "gpu": {
                    "label": "GPU",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 1280,
                    "metricDirection": "ascending"
                },
            },
            "layer": {
                "systemMetrics-layer": {
                    "label": "System metrics",
                },
            },
        },
        "qosMetrics": {
            "metrics": {
                "throughput": {
                    "label": "throughput",
                    "unit": "cycle / seconds",
                    "min": 100,
                    "med": 500,
                    "max": 1000,
                    "current": 1000
                },
                "availability": {
                    "label": "availability",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 1280
                },
                "inboundLatency": {
                    "label": "inboundLatency",
                    "unit": "GB",
                    "min": 120,
                    "med": 640,
                    "max": 1280,
                    "current": 1280
                }
            },
            "layer": {
                "qosMetrics-layer": {
                    "label": "Qos metrics",
                }
            }
        }
    }
}
