export function logicFourValued() {
  return {
    "four-valued": {
      "metrics":  {
        "Maybe false": {
          "label": "Maybe false",
          "unit": "number",
          "min": 0,
          "med": 50,
          "max": 100,
          "current": 15
        },
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
          "med": 50,
          "max": 100,
          "current": 5
        },
        "Maybe true": {
          "label": "Maybe true",
          "unit": "number",
          "min": 0,
          "med": 50,
          "max": 100,
          "current": 10
        }
      },
      "layer": {
        "Four-valued-layer": {
          "label": "Four-valued layer",
          "_layerBehavior": "something",
          "_defaultColor": "green",
          "_publicColorOption": "random calls function to pick a color"
        }
      }
    }
  }
}
