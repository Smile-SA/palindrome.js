let obj = {
    "requests": {
        "metrics": {
            "incomingRequests": {
                "label": "incoming requests",
                "unit": "thousands / second",
                "min": 0,
                "med": 500,
                "max": 1000,
                "current": 500
            },
            "outgoingRequests": {
                "label": "outgoing requests",
                "unit": "thousands / second",
                "min": 0,
                "med": 500,
                "max": 1000,
                "current": 250
            },
            "outgoingRequests2": {
                "label": "outgoing requests",
                "unit": "thousands / second",
                "min": 0,
                "med": 500,
                "max": 1000,
                "current": 250
            }
        },
        "layer": {
            "requests-layer": {
                "label": "Requests",
                "layerMetricsUnits": "something",
            }
        }
    },
    "systemResources": {
        "metrics": {
            "cpu": {
                "label": "CPU",
                "unit": "cycles / second",
                "min": 100,
                "med": 500,
                "max": 1000,
                "current": 550
            },
            "ram": {
                "label": "RAM",
                "unit": "GB",
                "min": 160,
                "med": 640,
                "max": 1280,
                "current": 1280
            },
            "ram2": {
                "label": "RAM",
                "unit": "GB",
                "min": 160,
                "med": 640,
                "max": 1280,
                "current": 1280
            },
            "hdd": {
                "label": "HDD",
                "unit": "GB",
                "min": 102,
                "med": 512,
                "max": 1024,
                "current": 200
            },
            "bandwidth": {
                "label": "BW",
                "unit": "MB / seconds",
                "min": 102,
                "med": 512,
                "max": 1024,
                "current": 200
            }
        },
        "layer": {
            "systemResources-layer": {
                "label": "System resources ",
                "layerMetricsUnits": "something",
            }
        }
    },
    "qosMetrics": {
        "metrics": {
            "throughput": {
                "label": "throughput",
                "unit": "cycles / second",
                "min": 100,
                "med": 500,
                "max": 1000,
                "current": 700
            },
            "availability": {
                "label": "availability",
                "unit": "GB",
                "min": 160,
                "med": 640,
                "max": 1280,
                "current": 800
            },
            "inboundLatency": {
                "label": "inboundLatency",
                "unit": "GB",
                "min": 120,
                "med": 640,
                "max": 1280,
                "current": 900
            },
            "outboundLatency": {
                "label": "outboundLatency",
                "unit": "GB",
                "min": 102,
                "med": 512,
                "max": 1024,
                "current": 950
            },
            "ioSpeed": {
                "label": "ioSpeed",
                "unit": "MB / seconds",
                "min": 102,
                "med": 512,
                "max": 1024,
                "current": 1000
            }
        },
        "layer": {
            "qosMetrics-layer": {
                "label": "Qos metrics",
                "layerMetricsUnits": "something",
            }
        }
    },
    "businessKPIs": {
        "metrics": {
            "directRevenues": {
                "label": "direct revenues",
                "unit": "K€ / hour",
                "min": 10,
                "med": 500,
                "max": 1000,
                "current": 200
            },
            "externalCosts": {
                "label": "external costs",
                "unit": "K€ / hour",
                "min": 10,
                "med": 640,
                "max": 1080,
                "current": 100
            },
            "internalCosts": {
                "label": "internal costs",
                "unit": "K€ / hour",
                "min": 10,
                "med": 640,
                "max": 1080,
                "current": 200
            },
            "indirectRevenues": {
                "label": "indirect revenues",
                "unit": "K€ / hour",
                "min": 102,
                "med": 512,
                "max": 1024,
                "current": 350
            }
        },
        "layer": {
            "businessKPIs-layer": {
                "label": "Business KPIs",
                "layerMetricsUnits": "something",
            }
        }
    }
};


function copySingleObject(obj, index) {
    let result = {};
    for (let i = 0; i < Object.keys(obj).length; i++) {
        result[Object.keys(obj)[i] + index] = Object.values(obj)[i];
    }
    return result;
}

function makeCase(nLayers, obj) {
    let result = {};
    for (let index = 0; index < nLayers; index++) {
        let partial_result = copySingleObject(obj, index);
        for (let key in partial_result) {
            result[key] = partial_result[key];
        }
    }
    return result;
}

console.log(JSON.stringify(makeCase(3, obj)));