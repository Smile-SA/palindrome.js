export function dcEnergeticEfficiency() {
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
        "ram2": {
          "label": "RAM",
          "unit": "GB",
          "min": 160,
          "med": 640,
          "max": 1280,
          "current": 480
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
        "systemMetrics-layer": {
          "label": "System metrics",
          "layerMetricsUnits": "something",
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
    "energeticKPIS": {
      "metrics": {
        "CO2": {
          "label": "CO2",
          "unit": "GRAMS",
          "min": 0,
          "med": 90,
          "max": 100,
          "current": 75
        },
        "WATTS": {
          "label": "WATT",
          "unit": "Watts",
          "min": 0,
          "med": 100,
          "max": 1000,
          "current": 25
        },
        "COSTS": {
          "label": "MONEY",
          "unit": "K€ / hour",
          "min": 0,
          "med": 25,
          "max": 100,
          "current": 52
        },
        "H20": {
          "label": "H20",
          "unit": "litters",
          "min": 0,
          "med": 100,
          "max": 10000,
          "current": 250
        }
      },
      "layer": {
        "energeticKPIS-layer": {
          "label": "Energetic KPIS",
          "layerMetricsUnits": "something",
        }
      }
    }
  }
}
