/**
 * Return declare control types
 */
export function defaultControls(){
    return {
        // Palindrome configurations
        displayArea: {
            name: 'Display area', defaultValue: 'palindrome',description:'',control: 'text',
            table: {
                category: 'Palindrome'
            },
        },
        palindromeSize: {
            name: 'Palindrome size', defaultValue: 3,description:'Resize the palindrome', control: 'number',
            table: {
                category: 'Palindrome'
            },
        },
        fitCameraPosition: {
            name: 'Fit camera position', defaultValue: true, control: 'boolean',description:'Fit camera or not to display the objets in plan', table: {
                category: 'Palindrome',
            },
        },
        //metrics
        metricMagnifier: {
            name: 'Metric magnifier', defaultValue: 10,description:'Resize the metrics', control: 'number',
            table: {
                category: 'Palindrome', subcategory: 'Metrics'
            },
        },
        // layers
        layerDisplayMode: {
            name: 'Display layers mode', defaultValue: 'dynamic',description:'Configure the layers mode', control: 'text',
            table: {
                category: 'Palindrome', subcategory: 'Layer'
            },
        },
        layerMidColor: {
            name: 'Layer mid color', defaultValue: '#DFDF0B',description:'Change the layer mid color', control: 'color',
            table: {
                category: 'Palindrome', subcategory: 'Layer'
            },
        },
        displayLayers: {
            name: 'Display layers', defaultValue: true,description:'Display or not the layers of palindrome', control: 'boolean',
            table: {
                category: 'Palindrome', subcategory: 'Layer'
            },
        },
        layerStatusControl: {
            name: 'Layer status control', defaultValue: true,description:'Control the state of the layer', control: 'boolean',
            table: {
                category: 'Palindrome', subcategory: 'Layer'
            },
        },
        // line
        lineOpacity: {
            name: 'Line opacity', defaultValue: 1, control: 'number',description:'Change the line opacity',
            table: {
                category: 'Palindrome', subcategory: 'Line'
            },
        },
        lineWidth: {
            name: 'Line width', defaultValue: 0.5, control: 'number',description:'Resize the line widht',
            table: {
                category: 'Palindrome', subcategory: 'Line'
            },
        },
        lineColor: {
            name: 'Line color', defaultValue: '#000000', control: 'color',description:'Change the line color',
            table: {
                category: 'Palindrome', subcategory: 'Line'
            },
        },
        //  sides
        displayMode: {
            name: 'Display sides mode', defaultValue: 'dynamic', control: 'text', description:'Configure the sides mode',
            table: {
                category: 'Palindrome', subcategory: 'Sides'
            },
        },
        mainAppColor: {
            name: 'Main app color', defaultValue: '#00FF06', control: 'color', description:'Change the main app color',
            table: {
                category: 'Palindrome', subcategory: 'Sides'
            },
        },
        subAppColor: {
            name: 'Sub app color', defaultValue: '#9FC5E8', control: 'color', description:'Change the sub app color',
            table: {
                category: 'Palindrome', subcategory: 'Sides'
            },
        },
        displaySides: {
            name: 'Display sides', defaultValue: true, control: 'boolean', description:'Display or not the sides of palindrome',
            table: {
                category: 'Palindrome', subcategory: 'Sides'
            },
        },
        // grid
        gridSize: {
            name: 'Grid size', defaultValue: 100, control: 'number',description:'Resize the grid',
            table: {
                category: 'Palindrome', subcategory: 'Grid'
            },
        },
        gridDivisions: {
            name: 'Grid divisions', defaultValue: 100, control: 'number',description:'Define the divisions of the grid',
            table: {
                category: 'Palindrome', subcategory: 'Grid'
            },
        },
        displayGrid: {
            name: 'Display grid', defaultValue: true, control: 'boolean',description:'Display or not the grid of the plan',
            table: {
                category: 'Palindrome', subcategory: 'Grid'
            },
        },
        // zPlane
        zPlaneInitial: {
            name: 'zPlane initial', defaultValue: 0, control: 'number',description:'Resize the initial zPlane',
            table: {
                category: 'Palindrome', subcategory: 'Zplan'
            },
        },
        zPlaneHeight: {
            name: 'zPlane height', defaultValue: 40, control: 'number',description:'Resize the height zPlane',
            table: {
                category: 'Palindrome', subcategory: 'Zplan'
            },
        },
        zPlaneMultilayer: {
            name: 'zPlane multilayer', defaultValue: -20, control: 'number',description:'Resize the multilayer zPlane',
            table: {
                category: 'Palindrome', subcategory: 'Zplan'
            },
        },
        // metrics and labels configuration
        labelsRendering: {
            name: "Labels rendering",
            description: 'Change the rendering style of labels',
            defaultValue: "3D",
            control: {
                type: 'select',
                options: {
                    '2D': "2D",
                    '3D': "3D",
                }
            },
            table: {
                category: 'Labels',
            },
        },
        labelsFormat: {
            name: "labels format",
            description: 'To change the labels format',
            defaultValue: "Classic",
            control: {
                type: 'select',
                options: {
                    'Classic': 'Classic',
                    'Table': 'Table',
                    'Json': 'Json',
                }
            },
            table: {
                category: 'Labels',
            },
        },
        labelCharacterFont: {
            name: 'Label Character font', defaultValue: 'Arial', description: 'Change the characters of the labels',
            control: {
                type: 'select',
                options: ['Serif', 'Sans-serif', 'Arial',]
            },
            table: {
                category: 'Labels',
            },
        },
        labelSize: {
            name: 'Labels size',
            defaultValue: 15,
            description:'Change the size of the labels',
            control: {
                type: 'select',
                options: {
                    Small: 13,
                    Medium: 15,
                    Large: 18,
                }
            },
            table: {
                category: 'Labels',
            },
        },
        labelColor: {
            name: 'Label color', defaultValue: '#000000', control: 'color',
            description:'Change the color of  labels',
            table: {
                category: 'Labels',
            },
        },
        labelBackgroundColor: {
            name: 'Label background color', defaultValue: '#f0f0f0', control: 'color',
            description:'Change the background color of labels',
            table: {
                category: 'Labels',
            },
        },
        labelBold: {
            name: 'Bold Label', defaultValue: true, control: 'boolean',description:'Bold or not the labels', table: {
                category: 'Labels',
            },
        },
        labelItalic: {
            name: 'Italic Label', defaultValue: false,description:'Italicize or not the labels ', control: 'boolean', table: {
                category: 'Labels',
            },
        },
        displayUnits: {
            name: 'Display units in labels', defaultValue: true,description:'Display or not the units of labels', control: 'boolean', table: {
                category: 'Labels',
            },
        },
        displayLabels: {
            name: 'Display labels', defaultValue: true,description:'Display or not the labels', control: 'boolean',
            table: {
                category: 'Labels',
            },
        },
        displayLabelsAll: {
            name: 'Display all labels', defaultValue: false,description:'Display or not all labels', control: 'boolean',
            table: {
                category: 'Labels',
            },
        },
        // status configurations
        // color
        statusColorLow: {
            name: 'Status color low', defaultValue: '#9FC5E8', control: 'color',description:'Change the low status color',
            table: {
                category: 'Status', subcategory: 'Colors'
            },
        },
        statusColorMed: {
            name: 'Status color med', defaultValue: '#00FF00', control: 'color',description:'change the med status color',
            table: {
                category: 'Status', subcategory: 'Colors'
            },
        },
        statusColorHigh: {
            name: 'Status color high', defaultValue: '#FF0000', control: 'color',description:'Change the high status color',
            table: {
                category: 'Status', subcategory: 'Colors'
            },
        },
        // range
        statusRangeLow: {
            name: 'Status range low', defaultValue: 0, control: 'number',description:'Resize the low status range',
            table: {
                category: 'Status', subcategory: 'Ranges'
            },
        },
        statusRangeMed: {
            name: 'Status range med', defaultValue: 30, control: 'number',description:'Resize the med status range',
            table: {
                category: 'Status', subcategory: 'Ranges'
            },
        },
        statusRangeHigh: {
            name: 'Status range high', defaultValue: 60, control: 'number',description:'Resize the high status range',
            table: {
                category: 'Status', subcategory: 'Ranges'
            },
        },
        // data configuration
        data: {
            name: 'Data', defaultValue: 'palindrome', control: 'object',description:' Thhe data we analyze ',
            table: {
                category: 'Data'
            },
        },
        mockupData: {
            name: 'Mockup data', defaultValue: true, control: 'boolean', description:'Make dynamic the data ',table: {
                category: 'Data'
            },
        },
    }
}
