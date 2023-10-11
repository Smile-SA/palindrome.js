export function logicBoolean() {
  return {
    "boolean": {
      "metrics": {
        "True": {
          "label": "True",
          "unit": "number",
          "min": 0,
          "med": 90,
          "max": 100,
          "current": 75
        },
        "False": {
          "label": "False",
          "unit": "number",
          "min": 0,
          "med": 10,
          "max": 100,
          "current": 25
        }
      },
      "layer": {
        "boolean-layer": {
          "label": "Boolean layer",
          "layerMetricsUnits": "something",
        }
      }
    }
  }
}
