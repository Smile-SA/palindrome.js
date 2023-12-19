/**
 * Return declare control types
 */
export function defaultControls() {
    return {
        // Palindrome configurations
        displayArea: {
            name: "displayArea",
            description: "",
            control: "text",
        },
        palindromeSize: {
            name: "palindromeSize",
            description: "Resize the palindrome",
            control: "number",
            table: {
                category: "Palindrome"
            },
        },
        cameraOptions: {
            name: "cameraOptions",
            description: "Select camera vew options",
            control: {
                type: "check",
            },
            options: ["Fit", "Top", "Flat"],
            table: {
                category: "Palindrome",
            },
        },
        colorShadesDepth: {
            name: "colorShadesDepth",
            description: "Change the numbers of steps before achieving a color",
            control: "number",
            table: {
                category: "Palindrome",
                subcategory: "Color Behavior"
            },
        },
        //metrics
        metricMagnifier: {
            name: "metricMagnifier",
            description: "Resize the metrics",
            control: "number",
            table: {
                category: "Palindrome",
                subcategory: "Metrics"
            },
        },
        // layers
        displayLayersLines: {
            name: "displayLayersLines",
            description: "display or not layer lines",
            control: "boolean",
            table: {
                category: "Palindrome",
                subcategory: "Layer"
            },
        },
        layerDisplayMode: {
            name: "layerDisplayMode",
            description: "Configure the layers mode",
            control: "select",
            options: ["static", "dynamic", "mixed"],
            table: {
                category: "Palindrome",
                subcategory: "Layer"
            },
        },
        displayLayers: {
            name: "displayLayers",
            description: "Display or not the layers of palindrome",
            control: "boolean",
            table: {
                category: "Palindrome",
                subcategory: "Layer"
            },
        },
        // line
        lineOpacity: {
            name: "layerStatusControl",
            control: "number",
            description: "Change the line opacity",
            table: {
                category: "Palindrome",
                subcategory: "Line"
            },
        },
        lineWidth: {
            name: "lineWidth",
            control: "number",
            description: "Resize the line widht",
            table: {
                category: "Palindrome",
                subcategory: "Line"
            },
        },
        lineColor: {
            name: "lineColor",
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
            control: "select",
            options: ['static', 'dynamic', 'debug'],
            description: "Configure the sides mode",
            table: {
                category: "Palindrome",
                subcategory: "Sides"
            },
        },
        displaySides: {
            name: "displaySides",
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
            control: "number",
            description: "Resize the grid",
            table: {
                category: "Palindrome",
                subcategory: "Grid"
            },
        },
        gridDivisions: {
            name: "gridDivisions",

            control: "number",
            description: "Define the divisions of the grid",
            table: {
                category: "Palindrome",
                subcategory: "Grid"
            },
        },
        displayGrid: {
            name: "displayGrid",
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
            control: "number",
            description: "Resize the initial zPlane",
            table: {
                category: "Palindrome",
                subcategory: "Zplan"
            },
        },
        zPlaneHeight: {
            name: "zPlaneHeight",
            control: "number",
            description: "Resize the height zPlane",
            table: {
                category: "Palindrome",
                subcategory: "Zplan"
            },
        },
        zPlaneMultilayer: {
            name: "zPlaneMultilayer",
            control: "number",
            description: "Resize the multilayer zPlane",
            table: {
                category: "Palindrome",
                subcategory: "Zplan"
            },
        },
        // metrics labels configuration
        metricsLabelsRenderingMode: {
            name: "metricsLabelsRenderingMode",
            description: "Change the rendering style of metrics labels",
            control: {
                type: "select",
            },
            options: ["2D", "3D"],
            table: {
                category: "Labels",
                subcategory: "Metrics"
            },
        },
        metricsLabels3DRenderingMode: {
            name: "metricsLabels3DRenderingMode",
            description: "Change the metrics labels rendering Mode",
            control: {
                type: "select",
            },
            options: ["Canvas", "Svg"],
            table: {
                category: "Labels",
                subcategory: "Metrics"
            },
        },
        metricsLabelsRenderingFormat: {
            name: "metricsLabelsRenderingFormat",
            description: "Change the metrics labels format",

            control: {
                type: "select",
            },
            options: ["Text", "Table", "Json"],
            table: {
                category: "Labels",
                subcategory: "Metrics"
            },
        },
        metricsLabelsStructure: {
            name: "metricsLabelsStructure",
            description: "To select the structure of the label to display",
            control: {
                type: "check",
            },
            options: ["Name", "Type", "Value", "Unit"],
            table: {category: "Labels", subcategory: "Metrics"}
        },
        metricsLabelsCharacterFont: {
            name: "metricsLabelsCharacterFont",
            description: "Change the characters of the metrics labels",
            control: {
                type: "select",
            },
            options: ["Serif", "Sans-serif", "Arial",],
            table: {
                category: "Labels",
                subcategory: "Metrics"
            },
        },
        metricsLabelsSize: {
            name: "metricsLabelsSize",
            description: "Change the size of the metrics labels",
            control: {
                type: "select",
                labels: {
                    12: 'Small',
                    15: 'Medium',
                    18: 'Large'
                }
            },
            options: [
                12,
                15,
                18,
            ],
            table: {
                category: "Labels",
                subcategory: "Metrics"
            },
        },
        metricsLabelsColor: {
            name: "metricsLabelsColor",
            control: "color",
            description: "Change the color of metrics labels",
            table: {
                category: "Labels",
                subcategory: "Metrics"
            },
        },
        metricsLabelsBackground: {
            name: "metricsLabelsBackground",
            control: "color",
            description: "Change the background color of metrics labels",
            table: {
                category: "Labels",
                subcategory: "Metrics"
            },
        },
        metricsLabelsBold: {
            name: "metricsLabelsBold",
            control: "boolean",
            description: "Bold or not the metrics labels",
            table: {
                category: "Labels",
                subcategory: "Metrics"
            },
        },
        metricsLabelsItalic: {
            name: "metricsLabelsItalic",
            description: "Italicize or not the metrics labels ",
            control: "boolean",
            table: {
                category: "Labels",
                subcategory: "Metrics"
            },
        },
        displayMetricsLabels: {
            name: "displayMetricsLabels",
            description: "Display or not the metrics labels",
            control: "boolean",
            table: {
                category: "Labels",
                subcategory: "Metrics"
            },
        },
        displayAllMetricsLabels: {
            name: "displayAllMetricsLabels",
            description: "Display or not all metrics labels",
            control: "boolean",
            table: {
                category: "Labels",
                subcategory: "Metrics"
            },
        },
        displayMetricSpheres: {
            name: "displayMetricSpheres",
            description: "Display or not all metrics spheres",
            control: "boolean",
            table: {
                category: "Labels",
                subcategory: "Metrics"
            },
        },
        displayValuesOnSphereHover: {
            name: "displayValuesOnSphereHover",

            description: "Display or not all metrics spheres",
            control: "boolean",
            table: {
                category: "Labels",
                subcategory: "Metrics"
            },
        },
        rotatedMetricsAngle: {
            name: "rotatedMetricsAngle",
            control: "number",
            description: "Specify the rotation angle for the layer in degrees",
            table: {
                category: "Palindrome",
                subcategory: "Layer"
            },
        },
        mergedMetricsNames: {
            name: "mergedMetricsNames",
            control: "boolean",
            description: "Merge or not metric names when flat camera",
            table: {
                category: "Palindrome",
                subcategory: "Layer"
            },
        },
        // layer label configuration
        layerBehavior: {
            name: "layerBehavior",
            description: "Change the rendering color behavior of layers",
            control: {
                type: "radio",
            },
            options: ["static", "dynamicShades", 'ranges'],
            table: {
                category: "Palindrome",
                subcategory: "Layer"
            },
        },
        layerMetricsUnits: {
            name: "layerMetricsUnits",
            description: "Change the representation of the layers",
            control: {
                type: "radio",
            },
            options: ["absolute", "percent", "normalized",],
            table: {
                category: "Palindrome",
                subcategory: "Layer"
            },
        },
        bicolorDisplay: {
            name: 'bicolorDisplay',
            control: 'boolean',
            description: 'Switch between a gradient made of 3 colors or 2 colors',
            table: {
                category: 'Palindrome',
                subcategory: 'Layer'
            },
        },
        bicolorDisplay: {
            name: 'bicolorDisplay',
            control: 'boolean',
            description: 'Switch between a gradient made of 3 colors or 2 colors',
            table: {
                category: 'Palindrome',
                subcategory: 'Layer'
            },
        },
        layersLabelsRenderingMode: {
            name: "layersLabelsRenderingMode",
            description: "Change the rendering style of layers labels",
            control: {
                type: "select",
            },
            options: ["2D", "3D"],
            table: {
                category: "Labels",
                subcategory: "Layers"
            },
        },
        layersLabelsOrientation: {
            name: 'layersLabelsOrientation',
            description: 'Change the orientation of layers label',

            control: {
                type: 'select',
            },
            options: ['Sticky', 'Free'],
            table: {
                category: 'Labels',
                subcategory: 'Layers'
            },
        },
        layersLabelsCharacterFont: {
            name: 'layersLabelsCharacterFont',
            description: 'Change the characters of layers label',
            control: {
                type: 'select',
            },
            options: ['Arial', 'Serif', 'Sans-serif'],
            table: {
                category: 'Labels',
                subcategory: 'Layers'
            },
        },
        layersLabelsSize: {
            name: 'layersLabelsSize',

            description: 'Change the size of layers labels',
            control: {
                type: 'select',
                labels: {
                    12: 'Small',
                    15: 'Medium',
                    18: 'Large',
                },
            },
            options: [
                12,
                15,
                18,
            ],
            table: {
                category: 'Labels',
                subcategory: 'Layers'
            },
        },
        layersLabelsColor: {
            name: 'layersLabelsColor',
            control: 'color',
            description: 'Change the color of layers label',
            table: {
                category: 'Labels',
                subcategory: 'Layers'
            },
        },
        layersLabelsBackground: {
            name: 'layersLabelsBackground',
            control: 'color',
            description: 'Change the background color of layers labels',
            table: {
                category: 'Labels',
                subcategory: 'Layers'
            },
        },
        layersLabelsBold: {
            name: 'layersLabelsBold',

            control: 'boolean',
            description: 'Bold or not the layers label',
            table: {
                category: 'Labels',
                subcategory: 'Layers'
            },
        },
        layersLabelsItalic: {
            name: 'layersLabelsItalic',
            description: 'Italicize or not the layers label',
            control: 'boolean',
            table: {
                category: 'Labels',
                subcategory: 'Layers'
            },
        },
        displayLayersLabels: {
            name: 'displayLayersLabels',

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
            control: {
                type: 'select',
            },
            options: ['Rectangle', 'Dynamic'],
            table: {
                category: 'Frames',
            },
        },
        animateFrameDashedLine: {
            name: 'animateFrameDashedLine',
            description: 'static or dynamic frame line',
            control: 'boolean',
            table: {
                category: 'Frames',
            },
        },
        frameBackgroundColor: {
            name: 'frameBackgroundColor',
            control: 'color',
            description: 'Change the frame background color',
            table: {
                category: 'Frames',
            },
        },
        frameOpacity: {
            name: 'frameOpacity',

            control: 'number',
            description: 'Change the frame opacity',
            table: {
                category: 'Frames',
            },
        },
        framePadding: {
            name: 'framePadding',
            control: 'number',
            description: 'Change the frame padding',
            table: {
                category: 'Frames',
            },
        },
        frameLineColor: {
            name: 'frameLineColor',
            control: 'color',
            description: 'Change the frame line color',
            table: {
                category: 'Frames',
            },
        },
        frameLineWidth: {
            name: 'frameLineWidth',
            control: 'number',
            description: 'Change the frame line width',
            table: {
                category: 'Frames',
            },
        },
        frameDashLineSize: {
            name: 'frameDashLineSize',
            control: 'number',
            description: 'Change the frame dash line size',
            table: {
                category: 'Frames',
            },
        },
        displayFrames: {
            name: 'displayFrames',
            description: 'Display or not the frames',
            control: 'boolean',
            table: {
                category: 'Frames',
            },
        },
        displayFramesLine: {
            name: 'displayFramesLine',
            description: 'Display or not the frames Line',
            control: 'boolean',
            table: {
                category: 'Frames',
            },
        },
        displayFramesBackground: {
            name: 'displayFramesBackground',
            description: 'Display or not the frames background',
            control: 'boolean',
            table: {
                category: 'Frames',
            },
        },
        displayLabelLine: {
            name: 'displayLabelLine',
            description: 'Display or not the frames arrows',
            control: 'boolean',
            table: {
                category: 'Frames',
            },
        },
        // status configurations
        // color
        mainStaticColor: {
            name: "mainColorStatic",
            control: "color",
            description: "Change the main app color",
            table: {
                category: "Palindrome",
                subcategory: "Layer"
            },
        },
        spheresBehavior: {
            name: "spheresBehavior",
            control: "radio",
            description: "Make sphere dynamic or static",
            options: ['static', 'dynamicShades', 'ranges'],
            table: {
                category: "Palindrome",
                subcategory: "Layer",
            },
        },
        statusColorLow: {
            name: "layerColorLow",
            control: "color",
            description: "Change the low status color",
            table: {
                category: "Palindrome",
                subcategory: "Layer"
            },
        },
        statusColorMed: {
            name: "layerColorMed",
            control: "color",
            description: "change the med status color",
            table: {
                category: "Palindrome",
                subcategory: "Layer"
            },
        },
        statusColorHigh: {
            name: "layerColorHigh",
            control: "color",
            description: "Change the high status color",
            table: {
                category: "Palindrome",
                subcategory: "Layer"
            },
        },
        sphereColorLow: {
            name: "sphereColorLow",

            control: "color",
            description: "change the med status color",
            table: {
                category: "Palindrome",
                subcategory: "Layer"
            },
        },
        sphereColorMed: {
            name: "sphereColorMed",

            control: "color",
            description: "Change the high status color",
            table: {
                category: "Palindrome",
                subcategory: "Layer"
            },
        },
        sphereColorHigh: {
            name: "sphereColorHigh",

            control: "color",
            description: "Change the very high status color",
            table: {
                category: "Palindrome",
                subcategory: "Layer"
            },
        },
        // range
        statusRangeLow: {
            name: "statusRangeLow",

            control: {type: 'range', min: 0, max: 100, step: 1},
            description: "Resize the low status range",
            table: {
                category: "Status",
                subcategory: "Ranges"
            },
        },
        statusRangeMed: {
            name: "statusRangeMed",

            control: {type: 'range', min: 0, max: 100, step: 1},
            description: "Resize the med status range",
            table: {
                category: "Status",
                subcategory: "Ranges"
            },
        },
        statusRangeHigh: {
            name: "statusRangeHigh",

            control: {type: 'range', min: 0, max: 100, step: 1},
            description: "Resize the high status range",
            table: {
                category: "Status",
                subcategory: "Ranges"
            },
        },
        // data configuration
        data: {
            name: "Data",

            control: "object",
            description: " The data we analyze ",
            table: {
                category: "Data"
            },
        },
        mockupData: {
            name: "mockupData",

            control: "boolean",
            if: { arg: 'liveData', truthy: false },            
            description: "Make dynamic the data ",
            table: {
                category: "Data"
            },
        },
        liveData: {
            name: "liveData",
            control: "boolean",
            if: { arg: 'mockupData', truthy: false },            
            description: "Enable or disable live use case",
            table: {
                category: "Data"
            },
        },
        remoteDataFetchPace: {
            name: "remoteDataFetchPace (ms)",
            control: "number",
            if: { arg: 'mockupData', truthy: false },            
            description: "Choose monitoring pace in ms",
            table: {
                category: "Data"
            },
        },
        //benchamark
        benchmark: {
            name: "benchmark",
            control: 'inline-radio',
            description: "Turn on or off benchmark mode",
            options: ['Active', 'Inactive'],
            table: {
                category: "Benchmark"
            },
        },

        testBothVersions: {
            name: "basicAndWorkers",
            control: 'boolean',
            description: "test with and without web workers",
            table: {
                category: "Benchmark"
            },
        },

        testDuration: {
            name: "testDuration (minutes)",
            control: "number",
            description: "benchmark execution duration in minutes",
            table: {
                category: "Benchmark"
            }
        },
        clearHistory: {
            name: "clearHistory",
            control: "boolean",
            description: "allow or not clearing history after benchmark execution",
            table: {
                category: "Benchmark"
            }
        },

        showResultsHistory: {
            name: "showResultsHistory",
            control: "boolean",
            description: "show benchmark history",
            table: {
                category: "Benchmark"
            }
        },

        webWorkersRendering: {
            name: "webWorkersRendering",
            control: "boolean",
            description: "enable or disable web workers",
            table: {
                category: "web workers"
            }
        },
        webWorkersHTTP: {
            name: "webWorkersHTTP",
            control: "boolean",
            description: "enable or disable http web workers",
            table: {
                category: "web workers"
            }
        },

        resourcesLevel: {
            name: "resourcesLevel (%)",
            control: {type: 'range', min: 20, max: 80, step: 1},
            description: "enable or disable web workers",
            table: {
                category: "web workers"
            }
        },
        sideLabelDisplay: {
            name: "sideLabelDisplay",
            control: "boolean",
            description: 'Display layers labels on the side',
            control: 'boolean',
            table: {
                category: 'Labels',
                subcategory: 'Layers'
            },
        },
        displayMetricsLabelsUnit: {
            name: "displayMetricsLabelsUnit",
            control: "boolean",
            description: "Display or hide metrics labels units",
            control: "boolean",
            table: {
                category: 'Labels',
                subcategory: 'Metrics'
            }
        }
    }
}

export function defaultValues() {
    return {
        displayArea: 'palindrome',
        palindromeSize: 3,
        cameraOptions: ['Fit'],
        colorShadesDepth: 100,
        opacity: 0.5,
        metricMagnifier: 10,
        layerDisplayMode: 'dynamic',
        mainStaticColor: '#f3c60a',
        displayLayers: true,
        lineOpacity: 1,
        lineWidth: 0.5,
        lineColor: '#000000',
        bicolorDisplay: false,
        displayMode: 'dynamic',
        displaySides: true,
        gridSize: 100,
        gridDivisions: 100,
        displayGrid: true,
        zPlaneInitial: 0,
        zPlaneHeight: 40,
        zPlaneMultilayer: 20,
        metricsLabelsRenderingMode: '3D',
        metricsLabels3DRenderingMode: 'Canvas',
        metricsLabelsRenderingFormat: 'Text',
        metricsLabelsStructure: ['Name', 'Type', 'Value', 'Unit'],
        metricsLabelsCharacterFont: 'Arial',
        metricsLabelsSize: 15,
        metricsLabelsColor: '#000000',
        metricsLabelsBackground: '#f0f0f0',
        metricsLabelsBold: true,
        metricsLabelsItalic: false,
        displayMetricsLabels: true,
        displayAllMetricsLabels: false,
        displayMetricSpheres: true,
        displayValuesOnSphereHover: false,
        layersLabelsRenderingMode: '3D',
        layersLabelsOrientation: 'Sticky',
        layersLabelsCharacterFont: 'Arial',
        layersLabelsSize: 15,
        layersLabelsColor: '#000000',
        layersLabelsBackground: '#ffffff',
        layersLabelsBold: true,
        layersLabelsItalic: false,
        displayLayersLines: false,
        layerBehavior: 'ranges',
        displayLayersLabels: true,
        frameShape: 'Rectangle',
        animateFrameDashedLine: false,
        frameBackgroundColor: '#ffffff',
        frameOpacity: 0.5,
        framePadding: 2,
        frameLineColor: '#000000',
        frameLineWidth: 1,
        frameDashLineSize: 3,
        displayFrames: true,
        displayFramesLine: true,
        displayFramesBackground: false,
        displayMetricsLabelsUnit: true,
        displayLabelLine: false,
        statusColorLow: '#319b31',
        statusColorMed: '#f3c60a',
        statusColorHigh: '#FF0000',
        spheresBehavior: 'ranges',
        sphereColorLow: '#319b31',
        sphereColorMed: '#f3c60a',
        sphereColorHigh: '#FF0000',
        statusRangeLow: 0,
        statusRangeMed: 33,
        statusRangeHigh: 66,
        data: 'palindrome',
        mockupData: false,
        liveData: false,
        benchmark: 'Inactive',
        testBothVersions: true,
        testDuration: 1,
        clearHistory: false,
        webWorkersRendering: false,
        showResultsHistory: false,
        webWorkersHTTP: false,
        resourcesLevel: 50,
        layerMetricsUnits: "absolute",
        remoteDataFetchPace: 1000,
        sideLabelDisplay: false,
        rotatedMetricsAngle: 0,
        mergedMetricsNames: false,
        remoteDataFetchPace: 1000,
        layerMetricsUnits: "absolute",
    }
}
