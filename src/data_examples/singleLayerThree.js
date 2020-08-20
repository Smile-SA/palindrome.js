export function singleLayerThree() {
    return {
  "systemKPIS": {
    "metrics": {
      "Good": {
        "label": "Good",
        "unit": "number",
        "min": 0,
        "med": 90,
        "max": 100,
        "current": 70
      },
      "Bad": { 
        "label": "Bad",
        "unit": "number",
        "min": 0,
        "med": 10,
        "max": 100,
        "current": 25
      },
      "Other": { 
        "label": "Other",
        "unit": "number",
        "min": 0,
        "med": 10,
        "max": 100,
        "current": 5
      }
    },
    "layer": {
      "layerBehavior": "something",
      "defaultColor": "green",
      "publicColorOption": "random calls function to pick a color"
    }
  }
}
}
