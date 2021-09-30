/**
 * Return declare control types
 */
export function defaultControls() {
    return {
        // Palindrome configurations
        displayArea: {
            name: "displayArea",
            defaultValue: "palindrome",
            description: "",
            control: "text",
            table: {
                category: "Palindrome"
            },
        },
        palindromeSize: {
            name: "palindromeSize",
            defaultValue: 3,
            description: "Resize the palindrome",
            control: "number",
            table: {
                category: "Palindrome"
            },
        },
        fitCameraPosition: {
            name: "fitCameraPosition",
            defaultValue: true,
            control: "boolean",
            description: "Fit camera or not to display the objets in plan",
            table: {
                category: "Palindrome",
            },
        },
        //metrics
        metricMagnifier: {
            name: "metricMagnifier",
            defaultValue: 10,
            description: "Resize the metrics",
            control: "number",
            table: {
                category: "Palindrome",
                subcategory: "Metrics"
            },
        },
        // layers
        layerDisplayMode: {
            name: "layerDisplayMode",
            defaultValue: "dynamic",
            description: "Configure the layers mode",
            control: "text",
            table: {
                category: "Palindrome",
                subcategory: "Layer"
            },
        },
        layerMidColor: {
            name: "layerMidColor",
            defaultValue: "#DFDF0B",
            description: "Change the layer mid color",
            control: "color",
            table: {
                category: "Palindrome",
                subcategory: "Layer"
            },
        },
        displayLayers: {
            name: "displayLayers",
            defaultValue: true,
            description: "Display or not the layers of palindrome",
            control: "boolean",
            table: {
                category: "Palindrome",
                subcategory: "Layer"
            },
        },
        layerStatusControl: {
            name: "layerStatusControl",
            defaultValue: true,
            description: "Control the state of the layer",
            control: "boolean",
            table: {
                category: "Palindrome",
                subcategory: "Layer"
            },
        },
        // line
        lineOpacity: {
            name: "layerStatusControl",
            defaultValue: 1,
            control: "number",
            description: "Change the line opacity",
            table: {
                category: "Palindrome",
                subcategory: "Line"
            },
        },
        lineWidth: {
            name: "lineWidth",
            defaultValue: 0.5,
            control: "number",
            description: "Resize the line widht",
            table: {
                category: "Palindrome",
                subcategory: "Line"
            },
        },
        lineColor: {
            name: "lineColor",
            defaultValue: "#000000",
            control: "color",
            description: "Change the line color",
            table: {
                category: "Palindrome",
                subcategory: "Line"
            },
        },
        //  sides
        displayMode: {
            name: "displayMode",
            defaultValue: "dynamic",
            control: "text",
            description: "Configure the sides mode",
            table: {
                category: "Palindrome",
                subcategory: "Sides"
            },
        },
        mainAppColor: {
            name: "mainAppColor",
            defaultValue: "#00FF06",
            control: "color",
            description: "Change the main app color",
            table: {
                category: "Palindrome",
                subcategory: "Sides"
            },
        },
        subAppColor: {
            name: "subAppColor",
            defaultValue: "#9FC5E8",
            control: "color",
            description: "Change the sub app color",
            table: {
                category: "Palindrome",
                subcategory: "Sides"
            },
        },
        displaySides: {
            name: "displaySides",
            defaultValue: true,
            control: "boolean",
            description: "Display or not the sides of palindrome",
            table: {
                category: "Palindrome",
                subcategory: "Sides"
            },
        },
        // grid
        gridSize: {
            name: "gridSize",
            defaultValue: 100,
            control: "number",
            description: "Resize the grid",
            table: {
                category: "Palindrome",
                subcategory: "Grid"
            },
        },
        gridDivisions: {
            name: "gridDivisions",
            defaultValue: 100,
            control: "number",
            description: "Define the divisions of the grid",
            table: {
                category: "Palindrome",
                subcategory: "Grid"
            },
        },
        displayGrid: {
            name: "displayGrid",
            defaultValue: true,
            control: "boolean",
            description: "Display or not the grid of the plan",
            table: {
                category: "Palindrome",
                subcategory: "Grid"
            },
        },
        // zPlane
        zPlaneInitial: {
            name: "zPlaneInitial",
            defaultValue: 0,
            control: "number",
            description: "Resize the initial zPlane",
            table: {
                category: "Palindrome",
                subcategory: "Zplan"
            },
        },
        zPlaneHeight: {
            name: "zPlaneHeight",
            defaultValue: 40,
            control: "number",
            description: "Resize the height zPlane",
            table: {
                category: "Palindrome",
                subcategory: "Zplan"
            },
        },
        zPlaneMultilayer: {
            name: "zPlaneMultilayer",
            defaultValue: -20,
            control: "number",
            description: "Resize the multilayer zPlane",
            table: {
                category: "Palindrome",
                subcategory: "Zplan"
            },
        },
        // metrics labels configuration
        labelsRenderingMode: {
            name: "labelRenderingMode",
            description: "Change the rendering style of labels",
            defaultValue: "3D",
            control: {
                type: "select",
                options: ["2D", "3D"]
            },
            table: {
                category: "Labels",
            },
        },
        labels3DRenderingMode: {
            name: "labels3DRenderingMode",
            description: "To change the metrics labels format",
            defaultValue: "Canvas",
            control: {
                type: "select",
                options: ["Canvas", "Svg"]
            },
            table: {
                category: "Labels",
            },
        },

        labelsRenderingFormat: {
            name: "labelsRenderingFormat",
            description: "To change the metrics labels format",
            defaultValue: "Text",
            control: {
                type: "select",
                options: ["Text", "Table", "Json"]
            },
            table: {
                category: "Labels",
            },
        },
        metricsLabelsStructure: {
            name: "metricsLabelsStructure",
            description: "To select the structure of the label to display",
            defaultValue: ["Name", "Type", "Value", "Unit"],
            control: {
                type: "check",
                options: ["Name", "Type", "Value", "Unit"]
            },
            table: { category: "Labels", subcategory: "Metrics" }
        },
        metricsLabelsCharacterFont: {
            name: "metricsLabelsCharacterFont",
            defaultValue: "Arial",
            description: "Change the characters of the metrics labels",
            control: {
                type: "select",
                options: ["Serif", "Sans-serif", "Arial", ]
            },
            table: {
                category: "Labels",
                subcategory: "Metrics"
            },
        },
        metricsLabelsSize: {
            name: "metricsLabelsSize",
            defaultValue: 15,
            description: "Change the size of the metrics labels",
            control: {
                type: "select",
                options: {
                    Small: 12,
                    Medium: 15,
                    Large: 18,
                }
            },
            table: {
                category: "Labels",
                subcategory: "Metrics"
            },
        },
        metricsLabelsColor: {
            name: "metricsLabelsColor",
            defaultValue: "#000000",
            control: "color",
            description: "Change the color of metrics labels",
            table: {
                category: "Labels",
                subcategory: "Metrics"
            },
        },
        metricsLabelsBackground: {
            name: "metricsLabelsBackground",
            defaultValue: "#f0f0f0",
            control: "color",
            description: "Change the background color of metrics labels",
            table: {
                category: "Labels",
                subcategory: "Metrics"
            },
        },
        metricsLabelsBold: {
            name: "metricsLabelsBold",
            defaultValue: true,
            control: "boolean",
            description: "Bold or not the metrics labels",
            table: {
                category: "Labels",
                subcategory: "Metrics"
            },
        },
        metricsLabelsItalic: {
            name: "metricsLabelsItalic",
            defaultValue: false,
            description: "Italicize or not the metrics labels ",
            control: "boolean",
            table: {
                category: "Labels",
                subcategory: "Metrics"
            },
        },
        displaysMetricsLabelsUnit: {
            name: "displayMetricsLabelsUnit",
            defaultValue: true,
            description: "Display or not the units of metrics labels",
            control: "boolean",
            table: {
                category: "Labels",
                subcategory: "Metrics"
            },
        },
        displayMetricsLabels: {
            name: "displayMetricsLabels",
            defaultValue: true,
            description: "Display or not the metrics labels",
            control: "boolean",
            table: {
                category: "Labels",
                subcategory: "Metrics"
            },
        },
        displayAllMetricsLabels: {
            name: "displayAllMetricsLabels",
            defaultValue: false,
            description: "Display or not all metrics labels",
            control: "boolean",
            table: {
                category: "Labels",
                subcategory: "Metrics"
            },
        },
        // layer label configuration
        layersLabelsOrientation: {
            name: 'layersLabelsOrientation',
            description: 'Change the orientation of layers label',
            defaultValue: "Sticky",
            control: {
                type: 'select',
                options: ['Sticky', 'Free']
            },
            table: {
                category: 'Labels',
                subcategory: 'Layers'
            },
        },
        layersLabelsCharacterFont: {
            name: 'layersLabelsCharacterFont',
            defaultValue: 'Arial',
            description: 'Change the characters of layers label',
            control: {
                type: 'select',
                options: ['Arial', 'Serif', 'Sans-serif']
            },
            table: {
                category: 'Labels',
                subcategory: 'Layers'
            },
        },
        layersLabelsSize: {
            name: 'layersLabelsSize',
            defaultValue: 15,
            description: 'Change the size of layers labels',
            control: {
                type: 'select',
                options: {
                    Small: 12,
                    Medium: 15,
                    Large: 18,
                }
            },
            table: {
                category: 'Labels',
                subcategory: 'Layers'
            },
        },
        layersLabelsColor: {
            name: 'layersLabelsColor',
            defaultValue: '#000000',
            control: 'color',
            description: 'Change the color of layers label',
            table: {
                category: 'Labels',
                subcategory: 'Layers'
            },
        },
        layersLabelsBackground: {
            name: 'layersLabelsBackground',
            defaultValue: '#ffffff',
            control: 'color',
            description: 'Change the background color of layers label',
            table: {
                category: 'Labels',
                subcategory: 'Layers'
            },
        },
        layersLabelsBold: {
            name: 'layersLabelsBold',
            defaultValue: true,
            control: 'boolean',
            description: 'Bold or not the layers label',
            table: {
                category: 'Labels',
                subcategory: 'Layers'
            },
        },
        layersLabelsItalic: {
            name: 'layersLabelsItalic',
            defaultValue: false,
            description: 'Italicize or not the layers label',
            control: 'boolean',
            table: {
                category: 'Labels',
                subcategory: 'Layers'
            },
        },
        displayLayersLabels: {
            name: 'displayLayersLabels',
            defaultValue: true,
            description: 'Display or not the layers label',
            control: 'boolean',
            table: {
                category: 'Labels',
                subcategory: 'Layers'
            },
        },
        // Frames
        frameShape: {
            name: "frameShape",
            description: 'Change the frames style',
            defaultValue: "Rectangle",
            control: {
                type: 'select',
                options: ['Rectangle', 'Dynamic']
            },
            table: {
                category: 'Frames',
            },
        },
        frameBackgroundColor: {
            name: 'frameBackgroundColor',
            defaultValue: '#ffffff',
            control: 'color',
            description: 'Change the frame background color',
            table: {
                category: 'Frames',
            },
        },
        frameOpacity: {
            name: 'frameOpacity',
            defaultValue: 0.5,
            control: 'number',
            description: 'Change the frame opacity',
            table: {
                category: 'Frames',
            },
        },
        framePadding: {
            name: 'framePadding',
            defaultValue: 2,
            control: 'number',
            description: 'Change the frame padding',
            table: {
                category: 'Frames',
            },
        },
        frameLineColor: {
            name: 'frameLineColor',
            defaultValue: '#000000',
            control: 'color',
            description: 'Change the frame line color',
            table: {
                category: 'Frames',
            },
        },
        frameLineWidth: {
            name: 'frameLineWidth',
            defaultValue: 0.5,
            control: 'number',
            description: 'Change the frame line width',
            table: {
                category: 'Frames',
            },
        },
        frameDashLineSize: {
            name: 'frameDashLineSize',
            defaultValue: 3,
            control: 'number',
            description: 'Change the frame dash line size',
            table: {
                category: 'Frames',
            },
        },
        displayFrames: {
            name: 'displayFrames',
            defaultValue: true,
            description: 'Display or not the frames',
            control: 'boolean',
            table: {
                category: 'Frames',
            },
        },
        displayFramesLine: {
            name: 'displayFramesLine',
            defaultValue: true,
            description: 'Display or not the frames Line',
            control: 'boolean',
            table: {
                category: 'Frames',
            },
        },
        displayFramesBackground: {
            name: 'displayFramesBackground',
            defaultValue: false,
            description: 'Display or not the frames background',
            control: 'boolean',
            table: {
                category: 'Frames',
            },
        },
        displayFramesArrow: {
            name: 'displayFramesArrow',
            defaultValue: true,
            description: 'Display or not the frames arrows',
            control: 'boolean',
            table: {
                category: 'Frames',
            },
        },
        // status configurations
        // color
        statusColorLow: {
            name: "statusColorLow",
            defaultValue: "#9FC5E8",
            control: "color",
            description: "Change the low status color",
            table: {
                category: "Status",
                subcategory: "Colors"
            },
        },
        statusColorMed: {
            name: "statusColorMed",
            defaultValue: "#00FF00",
            control: "color",
            description: "change the med status color",
            table: {
                category: "Status",
                subcategory: "Colors"
            },
        },
        statusColorHigh: {
            name: "statusColorHigh",
            defaultValue: "#FF0000",
            control: "color",
            description: "Change the high status color",
            table: {
                category: "Status",
                subcategory: "Colors"
            },
        },
        // range
        statusRangeLow: {
            name: "statusRangeLow",
            defaultValue: 0,
            control: "number",
            description: "Resize the low status range",
            table: {
                category: "Status",
                subcategory: "Ranges"
            },
        },
        statusRangeMed: {
            name: "statusRangeMed",
            defaultValue: 30,
            control: "number",
            description: "Resize the med status range",
            table: {
                category: "Status",
                subcategory: "Ranges"
            },
        },
        statusRangeHigh: {
            name: "statusRangeHigh",
            defaultValue: 60,
            control: "number",
            description: "Resize the high status range",
            table: {
                category: "Status",
                subcategory: "Ranges"
            },
        },
        // data configuration
        data: {
            name: "Data",
            defaultValue: "palindrome",
            control: "object",
            description: " The data we analyze ",
            table: {
                category: "Data"
            },
        },
        mockupData: {
            name: "mockupData",
            defaultValue: true,
            control: "boolean",
            description: "Make dynamic the data ",
            table: {
                category: "Data"
            },
        },
    }
}