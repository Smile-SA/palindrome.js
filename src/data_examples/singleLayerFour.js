export function singleLayerFour() {
    return {
  "systemKPIS": {
    "metrics": {
      "About bad": { 
        "label": "About bad",
        "unit": "number",
        "min": 0,
        "med": 10,
        "max": 100,
        "current": 5
      },
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
      "About good": { 
        "label": "About good",
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
