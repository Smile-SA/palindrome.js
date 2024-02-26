export const getData = () => {
    return {
        "systemMetrics": {
            "metrics": {
                "cpu": {
                    "label": "CPU",
                    "unit": "cycle / seconds",
                    "min": 100,
                    "med": 500,
                    "max": 1000,
                    "current": 1000
                },
                "ram": {
                    "label": "RAM",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 1280
                },
                "gpu": {
                    "label": "GPU",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 1280
                },
                "storage": {
                    "label": "Storage",
                    "unit": "GB",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 1024
                },
                "bandwidth": {
                    "label": "Bandwidth",
                    "unit": "MB / seconds",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 1024
                }
            },
            "layer": {
                "systemMetrics-layer": {
                    "label": "System metrics",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
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
                },
                "outboundLatency": {
                    "label": "outboundLatency",
                    "unit": "GB",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 1024
                },
                "ioSpeed": {
                    "label": "ioSpeed",
                    "unit": "MB / seconds",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 1024
                }
            },
            "layer": {
                "qosMetrics-layer": {
                    "label": "Qos metrics",
                    "_layerBehavior": "something",
                    "_defaultColor": "green",
                    "_publicColorOption": "random calls function to pick a color"
                }
            }
        }
    }
}