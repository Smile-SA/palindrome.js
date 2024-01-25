export function dcNegativeValuesConfiguration() {
    return {
        "systemMetrics": {
            "metrics": {
                "cpu": {
                    "label": "CPU",
                    "unit": "cycle / seconds",
                    "min": 100,
                    "med": 500,
                    "max": 1000,
                    "current": 390
                },
                "ram": {
                    "label": "RAM",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 480
                },
                "gpu": {
                    "label": "GPU",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 170
                },
                "storage": {
                    "label": "Storage",
                    "unit": "GB",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 450
                },
                "bandwidth": {
                    "label": "Bandwidth",
                    "unit": "MB / seconds",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 450
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
                    "min": 10,
                    "med": 50,
                    "max": 100,
                    "current": 39
                },
                "availability": {
                    "label": "availability",
                    "unit": "GB",
                    "max": -160,
                    "med": -640,
                    "min": -1280,
                    "current": -480
                },
                "inboundLatency": {
                    "label": "inboundLatency",
                    "unit": "GB",
                    "max": -120,
                    "med": -640,
                    "min": -1280,
                    "current": -620
                },
                "outboundLatency": {
                    "label": "outboundLatency",
                    "unit": "GB",
                    "max": -102,
                    "med": -512,
                    "min": -1024,
                    "current": -450
                },
                "ioSpeed": {
                    "label": "ioSpeed",
                    "unit": "MB / seconds",
                    "max": -102,
                    "med": -512,
                    "min": -1024,
                    "current": -450
                }
            },
            "layer": {
                "qosMetrics-layer": {
                    "label": "Qos metrics",
                    "layerMetricsUnits": "something",
                }
            }
        },
        "requests2": {
            "metrics": {
                "incomingRequests": {
                    "label": "incoming requests",
                    "unit": "thousands / second",
                    "min": -5,
                    "med": 1,
                    "max": 2,
                    "current": -2
                },
                "outgoingRequests": {
                    "label": "outgoing requests",
                    "unit": "thousands / second",
                    "min": - 5,
                    "med": 0,
                    "max": 1,
                    "current": - 2.5
                }
            },
            "layer": {
                "requests2-layer": {
                    "label": "Requests2",
                }
            }
        },
    }
}
