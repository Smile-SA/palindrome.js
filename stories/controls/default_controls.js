/**
 * Return declare control types
 */
export function defaultControls(){
    return {
        // Palindrome configurations
        displayArea: {
            name: "displayArea", defaultValue: "palindrome",description:"",control: "text",
            table: {
                category: "Palindrome"
            },
        },
        palindromeSize: {
            name: "palindromeSize", defaultValue: 3,description:"Resize the palindrome", control: "number",
            table: {
                category: "Palindrome"
            },
        },
        fitCameraPosition: {
            name: "fitCameraPosition", defaultValue: true, control: "boolean",description:"Fit camera or not to display the objets in plan", table: {
                category: "Palindrome",
            },
        },
        //metrics
        metricMagnifier: {
            name: "metricMagnifier", defaultValue: 10,description:"Resize the metrics", control: "number",
            table: {
                category: "Palindrome", subcategory: "Metrics"
            },
        },
        // layers
        layerDisplayMode: {
            name: "layerDisplayMode", defaultValue: "dynamic",description:"Configure the layers mode", control: "text",
            table: {
                category: "Palindrome", subcategory: "Layer"
            },
        },
        layerMidColor: {
            name: "layerMidColor", defaultValue: "#DFDF0B",description:"Change the layer mid color", control: "color",
            table: {
                category: "Palindrome", subcategory: "Layer"
            },
        },
        displayLayers: {
            name: "displayLayers", defaultValue: true,description:"Display or not the layers of palindrome", control: "boolean",
            table: {
                category: "Palindrome", subcategory: "Layer"
            },
        },
        layerStatusControl: {
            name: "layerStatusControl", defaultValue: true,description:"Control the state of the layer", control: "boolean",
            table: {
                category: "Palindrome", subcategory: "Layer"
            },
        },
        // line
        lineOpacity: {
            name: "layerStatusControl", defaultValue: 1, control: "number",description:"Change the line opacity",
            table: {
                category: "Palindrome", subcategory: "Line"
            },
        },
        lineWidth: {
            name: "lineWidth", defaultValue: 0.5, control: "number",description:"Resize the line widht",
            table: {
                category: "Palindrome", subcategory: "Line"
            },
        },
        lineColor: {
            name: "lineColor", defaultValue: "#000000", control: "color",description:"Change the line color",
            table: {
                category: "Palindrome", subcategory: "Line"
            },
        },
        //  sides
        displayMode: {
            name: "displayMode", defaultValue: "dynamic", control: "text", description:"Configure the sides mode",
            table: {
                category: "Palindrome", subcategory: "Sides"
            },
        },
        mainAppColor: {
            name: "mainAppColor", defaultValue: "#00FF06", control: "color", description:"Change the main app color",
            table: {
                category: "Palindrome", subcategory: "Sides"
            },
        },
        subAppColor: {
            name: "subAppColor", defaultValue: "#9FC5E8", control: "color", description:"Change the sub app color",
            table: {
                category: "Palindrome", subcategory: "Sides"
            },
        },
        displaySides: {
            name: "displaySides", defaultValue: true, control: "boolean", description:"Display or not the sides of palindrome",
            table: {
                category: "Palindrome", subcategory: "Sides"
            },
        },
        // grid
        gridSize: {
            name: "gridSize", defaultValue: 100, control: "number",description:"Resize the grid",
            table: {
                category: "Palindrome", subcategory: "Grid"
            },
        },
        gridDivisions: {
            name: "gridDivisions", defaultValue: 100, control: "number",description:"Define the divisions of the grid",
            table: {
                category: "Palindrome", subcategory: "Grid"
            },
        },
        displayGrid: {
            name: "displayGrid", defaultValue: true, control: "boolean",description:"Display or not the grid of the plan",
            table: {
                category: "Palindrome", subcategory: "Grid"
            },
        },
        // zPlane
        zPlaneInitial: {
            name: "zPlaneInitial", defaultValue: 0, control: "number",description:"Resize the initial zPlane",
            table: {
                category: "Palindrome", subcategory: "Zplan"
            },
        },
        zPlaneHeight: {
            name: "zPlaneHeight", defaultValue: 40, control: "number",description:"Resize the height zPlane",
            table: {
                category: "Palindrome", subcategory: "Zplan"
            },
        },
        zPlaneMultilayer: {
            name: "zPlaneMultilayer", defaultValue: -20, control: "number",description:"Resize the multilayer zPlane",
            table: {
                category: "Palindrome", subcategory: "Zplan"
            },
        },
        // metrics labels configuration
        metricsLabelsRendering: {
            name: "labelsRendering",
            description: "Change the rendering style of metrics labels",
            defaultValue: "3D",
            control: {
                type: "select",
                options: ["2D","3D"]
            },
            table: {
                category: "Labels", subcategory:"Metrics"
            },
        },
        metricsLabelsFormat: {
            name: "labelsFormat",
            description: "To change the metrics labels format",
            defaultValue: "ClassicSvg",
            control: {
                type: "select",
                options: ["ClassicCanvas","ClassicSvg","Table","Json"]
            },
            table: {
                category: "Labels",subcategory:"Metrics"
            },
        },
        metricsLabelsStructure:{
            name:"labelsStructure", description:"To select the structure of the label to display",defaultValue:["Name","Type","Value","Unit"],
            control: {
                type:"check",
                options:["Name","Type","Value","Unit"]
            },
            table: {category:"Labels",subcategory:"Metrics"}
        },
        metricsLabelsCharacterFont: {
            name: "labelsCharacterFont", defaultValue: "Arial", description: "Change the characters of the metrics labels",
            control: {
                type: "select",
                options: ["Serif", "Sans-serif", "Arial",]
            },
            table: {
                category: "Labels",subcategory:"Metrics"
            },
        },
        metricsLabelsSize: {
            name: "labelsSize",
            defaultValue: 15,
            description:"Change the size of the metrics labels",
            control: {
                type: "select",
                options: {
                    Small: 13,
                    Medium: 15,
                    Large: 18,
                }
            },
            table: {
                category: "Labels",subcategory:"Metrics"
            },
        },
        metricsLabelsColor: {
            name: "labelsColor", defaultValue: "#000000", control: "color",
            description:"Change the color of metrics labels",
            table: {
                category: "Labels",subcategory:"Metrics"
            },
        },
        metricsLabelsBackground: {
            name: "labelsBackground", defaultValue: "#f0f0f0", control: "color",
            description:"Change the background color of metrics labels",
            table: {
                category: "Labels",subcategory:"Metrics"
            },
        },
        metricsLabelsBold: {
            name: "labelsBold", defaultValue: true, control: "boolean",description:"Bold or not the metrics labels", table: {
                category: "Labels",subcategory:"Metrics"
            },
        },
        metricsLabelsItalic: {
            name: "labelsItalic", defaultValue: false,description:"Italicize or not the metrics labels ", control: "boolean", table: {
                category: "Labels",subcategory:"Metrics"
            },
        },
        displaysMetricsLabelsUnit: {
            name: "displayLabelsUnit", defaultValue: true,description:"Display or not the units of metrics labels", control: "boolean", table: {
                category: "Labels",subcategory:"Metrics"
            },
        },
        displayMetricsLabels: {
            name: "displayLabels", defaultValue: true,description:"Display or not the metrics labels", control: "boolean",
            table: {
                category: "Labels",subcategory:"Metrics"
            },
        },
        displayAllMetricsLabels: {
            name: "displayAllLabels", defaultValue: false,description:"Display or not all metrics labels", control: "boolean",
            table: {
                category: "Labels",subcategory:"Metrics"
            },
        },
        // status configurations
        // color
        statusColorLow: {
            name: "statusColorLow", defaultValue: "#9FC5E8", control: "color",description:"Change the low status color",
            table: {
                category: "Status", subcategory: "Colors"
            },
        },
        statusColorMed: {
            name: "statusColorMed", defaultValue: "#00FF00", control: "color",description:"change the med status color",
            table: {
                category: "Status", subcategory: "Colors"
            },
        },
        statusColorHigh: {
            name: "statusColorHigh", defaultValue: "#FF0000", control: "color",description:"Change the high status color",
            table: {
                category: "Status", subcategory: "Colors"
            },
        },
        // range
        statusRangeLow: {
            name: "statusRangeLow", defaultValue: 0, control: "number",description:"Resize the low status range",
            table: {
                category: "Status", subcategory: "Ranges"
            },
        },
        statusRangeMed: {
            name: "statusRangeMed", defaultValue: 30, control: "number",description:"Resize the med status range",
            table: {
                category: "Status", subcategory: "Ranges"
            },
        },
        statusRangeHigh: {
            name: "statusRangeHigh", defaultValue: 60, control: "number",description:"Resize the high status range",
            table: {
                category: "Status", subcategory: "Ranges"
            },
        },
        // data configuration
        data: {
            name: "Data", defaultValue: "palindrome", control: "object",description:" The data we analyze ",
            table: {
                category: "Data"
            },
        },
        mockupData: {
            name: "mockupData", defaultValue: true, control: "boolean", description:"Make dynamic the data ",table: {
                category: "Data"
            },
        },
    }
}

