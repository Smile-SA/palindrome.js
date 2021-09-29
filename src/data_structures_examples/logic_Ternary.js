export function logicTernary() {
  return {
    "ternary": {
      "metrics": {
        "True": {
          "label": "True",
          "unit": "number",
          "min": 0,
          "med": 50,
          "max": 100,
          "current": 70
        },
        "False": {
          "label": "False",
          "unit": "number",
          "min": 0,
          "med": 10,
          "max": 100,
          "current": 10
        },
        "Maybe": {
          "label": "Maybe",
          "unit": "number",
          "min": 0,
          "med": 40,
          "max": 100,
          "current": 20
        }
      },
      "layer": {
        "ternary-layer": {
          "label": "Ternary layer",
          "_layerBehavior": "something",
          "_defaultColor": "green",
          "_publicColorOption": "random calls function to pick a color"
        }
      }
    }
  }
}
