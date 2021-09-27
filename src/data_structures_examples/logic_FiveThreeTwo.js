export function logicFiveThreeTwo() {
  return {
    "five-valued": {
      "metrics":  {
        "False": {
          "label": "False",
          "unit": "number",
          "min": 30,
          "med": 90,
          "max": 100,
          "current": 75
        },
        "True ": {
          "label": "True",
          "unit": "number",
          "min": 30,
          "med": 90,
          "max": 100,
          "current": 70
        },
        "Undefined": {
          "label": "Undefined",
          "unit": "number",
          "min": 50,
          "med": 90,
          "max": 100,
          "current": 10
        },
        "Maybe false" : {
          "label": "Maybe False",
          "unit": "number",
          "min": 20,
          "med": 90,
          "max": 100,
          "current": 80
        },
        "Maybe True" : {
          "label": "Maybe True",
          "unit": "number",
          "min": 10,
          "med": 90,
          "max": 100,
          "current": 80
        }
      },
      "layer": {
        "Five-valued-layer": {
          "label": "Five valued layer",
          "layerBehavior": "something",
          "defaultColor": "green",
          "publicColorOption": "random calls function to pick a color"
        }
      }
    },
    "ternary": {
      "metrics": {
        "True": {
          "label": "True",
          "unit": "number",
          "min": 0,
          "med": 70,
          "max": 100,
          "current": 70
        },
        "Maybe":  {
          "label": "Maybe",
          "unit": "number",
          "min": 0,
          "med": 70,
          "max": 100,
          "current": 80
        },
        "False ": {
          "label": "False",
          "unit": "number",
          "min": 0,
          "med": 70,
          "max": 100,
          "current": 85
        }
      },
      "layer": {
        "ternary-layer": {
          "label": "Ternary layer",
          "layerBehavior": "something",
          "defaultColor": "green",
          "publicColorOption": "random calls function to pick a color"
        }
      }
    },
    "boolean": {
      "metrics": {
        "True": {
          "label": "True",
          "unit": "number",
          "min": 0,
          "med": 50,
          "max": 100,
          "current": 60
        },
        "False": {
          "label": "False",
          "unit": "number",
          "min": 0,
          "med": 50,
          "max": 100,
          "current": 40
        }
      },
      "layer": {
        "boolean-layer": {
          "label": "Boolean layer",
          "layerBehavior": "something",
          "defaultColor": "green",
          "publicColorOption": "random calls function to pick a color"
        }
      }
    }
  }
}
