export function dcMetricStates() {
    return {
        "systemMetrics": {
            "metrics": {
                "cpu": {
                    "label": "CPU",
                    "unit": "cycle / seconds",
                    "bad": 100,
                    "not bad": 200,
                    "good": 500,
                    "very good": 1000,
                    "current": 100,
                    "metricDirection": "ascending"
                },
                "ram": {
                    "label": "RAM",
                    "unit": "GB",
                    "bad": 160,
                    "not bad": 200,
                    "good": 640,
                    "very good": 1280,
                    "current": 200,
                    "metricDirection": "ascending"
                },
                "gpu": {
                    "label": "GPU",
                    "unit": "GB",
                    "bad": 160,
                    "good": 640,
                    "very good": 1280,
                    "current": 640,
                    "metricDirection": "ascending"
                },
                "storage": {
                    "label": "Storage",
                    "unit": "GB",
                    "bad": 102,
                    "good": 512,
                    "very good": 1024,
                    "current": 1024,
                    "metricDirection": "ascending"
                },
                "bandwidth": {
                    "label": "Bandwidth",
                    "unit": "MB / seconds",
                    "bad": 102,
                    "good": 512,
                    "very good": 1024,
                    "current": 1024,
                    "metricDirection": "ascending"
                }
            },
            "layer": {
                "systemMetrics-layer": {
                    "label": "System metrics",
                    "layerMetricsUnits": "something",
                },
            },
        },
        "qosMetrics": {
            "metrics": {
                "throughput": {
                    "label": "throughput",
                    "unit": "cycle / seconds",
                    "bad": 100,
                    "not bad": 200,
                    "good": 500,
                    "very good": 1000,
                    "current": 110,
                    "metricDirection": "ascending"
                },
                "availability": {
                    "label": "availability",
                    "unit": "GB",
                    "bad": 160,
                    "not bad": 200,
                    "good": 640,
                    "very good": 1280,
                    "current": 250,
                    "metricDirection": "ascending"
                },
                "inboundLatency": {
                    "label": "inboundLatency",
                    "unit": "GB",
                    "bad": 120,
                    "not bad": 200,
                    "good": 640,
                    "very good": 1280,
                    "current": 650,
                    "metricDirection": "ascending"
                },
                "outboundLatency": {
                    "label": "outboundLatency",
                    "unit": "GB",
                    "bad": 102,
                    "not bad": 200,
                    "good": 512,
                    "very good": 1024,
                    "current": 800,
                    "metricDirection": "ascending"
                },
                "ioSpeed": {
                    "label": "ioSpeed",
                    "unit": "MB / seconds",
                    "bad": 102,
                    "not bad": 200,
                    "good": 512,
                    "very good": 1024,
                    "current": 450,
                    "metricDirection": "ascending"
                }
            },
            "layer": {
                "qosMetrics-layer": {
                    "label": "Qos metrics",
                    "layerMetricsUnits": "something",
                }
            }
        }
    }
}
