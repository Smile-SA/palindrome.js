export function dc_BasicConfigurationLayerColoured() {
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

                    "mainColorStatic": "#319b31",
                    "layerColorLow": "#ffffff",
                    "layerColorMed": "#f3c60a",
                    "layerColorHigh": "#000000",
                    "sphereColorLow": "#ffffff",
                    "sphereColorMed": "#f3c60a",
                    "sphereColorHigh": "#000000",
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
                    "current": 390
                },
                "availability": {
                    "label": "availability",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 480
                },
                "inboundLatency": {
                    "label": "inboundLatency",
                    "unit": "GB",
                    "min": 120,
                    "med": 640,
                    "max": 1280,
                    "current": 620
                },
                "outboundLatency": {
                    "label": "outboundLatency",
                    "unit": "GB",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 450
                },
                "ioSpeed": {
                    "label": "ioSpeed",
                    "unit": "MB / seconds",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 450
                }
            },
            "layer": {
                "qosMetrics-layer": {
                    "label": "Qos metrics",
                    "mainColorStatic": "#319b31",
                    "layerColorLow": "#ffffff",
                    "layerColorMed": "#f3c60a",
                    "layerColorHigh": "#000000",
                    "sphereColorLow": "#ffffff",
                    "sphereColorMed": "#f3c60a",
                    "sphereColorHigh": "#000000",
                }
            }
        },
        "serverMetrics": {
            "metrics": {
                "throughput": {
                    "label": "throughput",
                    "unit": "cycle / seconds",
                    "min": 100,
                    "med": 500,
                    "max": 1000,
                    "current": 100
                },
                "availability": {
                    "label": "availability",
                    "unit": "GB",
                    "min": 160,
                    "med": 640,
                    "max": 1280,
                    "current": 160
                },
                "inboundLatency": {
                    "label": "inboundLatency",
                    "unit": "GB",
                    "min": 120,
                    "med": 640,
                    "max": 1280,
                    "current": 120
                },
                "outboundLatency": {
                    "label": "outboundLatency",
                    "unit": "GB",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 102
                },
                "ioSpeed": {
                    "label": "ioSpeed",
                    "unit": "MB / seconds",
                    "min": 102,
                    "med": 512,
                    "max": 1024,
                    "current": 102
                }
            },
            "layer": {
                "serverMetrics-layer": {
                    "label": "serverMetrics",

                    "mainColorStatic": "#319b31",
                    "layerColorLow": "#ffffff",
                    "layerColorMed": "#f3c60a",
                    "layerColorHigh": "#000000",
                    "sphereColorLow": "#ffffff",
                    "sphereColorMed": "#f3c60a",
                    "sphereColorHigh": "#000000",
                }
            }
        }
    }
}
