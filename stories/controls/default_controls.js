/**
 * Return declare control types
 */
export function defaultControl() {
    return {
        // Palindrome configurations
        displayArea: {
            name: 'Display area', defaultValue: 'palindrome',description:'',control: 'text',
            table: {
                category: 'Palindrome'
            },
        },
        palindromeSize: {
            name: 'Palindrome size', defaultValue: 3,description:'To resize the palindrome', control: 'number',
            table: {
                category: 'Palindrome'
            },
        },
        //metrics
        metricMagnifier: {
            name: 'Metric magnifier', defaultValue: 10,description:'To resize the metrics', control: 'number',
            table: {
                category: 'Palindrome', subcategory: 'Metrics'
            },
        },
        MetricsXposition: {
            name: 'Metrics x position',
            description: 'To change the x position of metrics',
            defaultValue: 0,
            control: 'number',
            table: {
                category: 'Palindrome', subcategory: 'Metrics'
            },
        },
        MetricsYposition: {
            name: 'Metrics y position',
            description: 'To change the y position of metrics',
            defaultValue: +0.5,
            control: 'number',
            table: {
                category: 'Palindrome', subcategory: 'Metrics'
            },
        },
        // layers
        layerDisplayMode: {
            name: 'Display layers mode', defaultValue: 'dynamic',description:'To configure the layers mode', control: 'text',
            table: {
                category: 'Palindrome', subcategory: 'Layer'
            },
        },
        layerMidColor: {
            name: 'Layer mid color', defaultValue: '#DFDF0B',description:'To change the layer mid color', control: 'color',
            table: {
                category: 'Palindrome', subcategory: 'Layer'
            },
        },
        displayLayers: {
            name: 'Display layers', defaultValue: true,description:'To display or not the layers of palindrome', control: 'boolean',
            table: {
                category: 'Palindrome', subcategory: 'Layer'
            },
        },
        layerStatusControl: {
            name: 'Layer status control', defaultValue: true,description:'To control the state of the layer', control: 'boolean',
            table: {
                category: 'Palindrome', subcategory: 'Layer'
            },
        },
        // line
        lineOpacity: {
            name: 'Line opacity', defaultValue: 1, control: 'number',description:'To change the line opacity',
            table: {
                category: 'Palindrome', subcategory: 'Line'
            },
        },
        lineWidth: {
            name: 'Line width', defaultValue: 0.5, control: 'number',description:'To resize the line widht',
            table: {
                category: 'Palindrome', subcategory: 'Line'
            },
        },
        lineColor: {
            name: 'Line color', defaultValue: '#000000', control: 'color',description:'To change the line color',
            table: {
                category: 'Palindrome', subcategory: 'Line'
            },
        },
        //  sides
        displayMode: {
            name: 'Display sides mode', defaultValue: 'dynamic', control: 'text', description:'To configure the sides mode',
            table: {
                category: 'Palindrome', subcategory: 'Sides'
            },
        },
        mainAppColor: {
            name: 'Main app color', defaultValue: '#00FF06', control: 'color', description:'To change the main app color',
            table: {
                category: 'Palindrome', subcategory: 'Sides'
            },
        },
        subAppColor: {
            name: 'Sub app color', defaultValue: '#9FC5E8', control: 'color', description:'To change the sub app color',
            table: {
                category: 'Palindrome', subcategory: 'Sides'
            },
        },
        displaySides: {
            name: 'Display sides', defaultValue: true, control: 'boolean', description:'To display or not the sides of palindrome\t',
            table: {
                category: 'Palindrome', subcategory: 'Sides'
            },
        },
        // grid
        gridSize: {
            name: 'Grid size', defaultValue: 100, control: 'number',description:'To resize the grid',
            table: {
                category: 'Palindrome', subcategory: 'Grid'
            },
        },
        gridDivisions: {
            name: 'Grid divisions', defaultValue: 100, control: 'number',description:'To define the divisions of the grid',
            table: {
                category: 'Palindrome', subcategory: 'Grid'
            },
        },
        displayGrid: {
            name: 'Display grid', defaultValue: true, control: 'boolean',description:'To display or not the grid of the plan',
            table: {
                category: 'Palindrome', subcategory: 'Grid'
            },
        },
        // zplane
        zplaneInitial: {
            name: 'Zplane initial', defaultValue: 0, control: 'number',description:'To resize the initial zplane',
            table: {
                category: 'Palindrome', subcategory: 'Zplan'
            },
        },
        zplaneHeight: {
            name: 'Zplane height', defaultValue: 40, control: 'number',description:'To resize the height zplane',
            table: {
                category: 'Palindrome', subcategory: 'Zplan'
            },
        },
        zplaneMultilayer: {
            name: 'Zplane multilayer', defaultValue: -20, control: 'number',description:'To resize the multilayer zplane',
            table: {
                category: 'Palindrome', subcategory: 'Zplan'
            },
        },
        // metrics and labels configuration
        labelsRendering: {
            name: "Labels rendering",
            description: 'To change the style of labels',
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
        labelCharacterFont: {
            name: 'Label Character font', defaultValue: 'Arial', description: 'To change the characters of the labels',
            control: {
                    type: 'select',
                    options: ['Serif', 'Sans-serif', 'Arial',]
                },
            table: {
                category: 'Labels',
            },
        },
        labelSize: {
            name: 'Label size',
            defaultValue: 15,
            description:'To change the size of the labels',
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
            description:'To change the color of the labels',
            table: {
                category: 'Labels',
            },
        },
        labelBold: {
            name: 'Bold Label', defaultValue: true, control: 'boolean',description:'To put the labels in bold or not', table: {
                category: 'Labels',
            },
        },
        labelItalic: {
            name: 'Italic Label', defaultValue: false,description:'To put the labels in italic or not', control: 'boolean', table: {
                category: 'Labels',
            },
        },
        displayUnits: {
            name: 'Display units in labels', defaultValue: true,description:'To display or not the units of labels', control: 'boolean', table: {
                category: 'Labels',
            },
        },
        displayLabels: {
            name: 'Display labels', defaultValue: true,description:'To display or not the labels', control: 'boolean',
            table: {
                category: 'Labels',
            },
        },
        displayLabelsAll: {
            name: 'Display all labels', defaultValue: false,description:'To display or not all the labels', control: 'boolean',
            table: {
                category: 'Labels',
            },
        },
        // status configurations
            // color
            statusColorlow: {
                name: 'Status color low', defaultValue: '#9FC5E8', control: 'color',description:'To change the low status color',
                table: {
                    category: 'Status', subcategory: 'Colors'
                },
            },
            statusColormed: {
                name: 'Status color med', defaultValue: '#00FF00', control: 'color',description:'To change the med status color',
                table: {
                    category: 'Status', subcategory: 'Colors'
                },
            },
            statusColorhigh: {
                name: 'Status color high', defaultValue: '#FF0000', control: 'color',description:'To change the high status color',
                table: {
                    category: 'Status', subcategory: 'Colors'
                },
            },
            // range
            statusRangelow: {
                name: 'Status range low', defaultValue: 0, control: 'number',description:'To resize the low status range',
                table: {
                    category: 'Status', subcategory: 'Ranges'
                },
            },
            statusRangemed: {
                name: 'Status range med', defaultValue: 30, control: 'number',description:'To resize the med status range',
                table: {
                    category: 'Status', subcategory: 'Ranges'
                },
            },
            statusRangehigh: {
                name: 'Status range high', defaultValue: 60, control: 'number',description:'To resize the high status range',
                table: {
                    category: 'Status', subcategory: 'Ranges'
                },
            },
        // data configuration
        data: {
            name: 'Data', defaultValue: 'palindrome', control: 'object',description:' This is the data we analyze ',
            table: {
                category: 'Data'
            },
        },
        mockupData: {
            name: 'Mockup data', defaultValue: true, control: 'boolean', description:'To make the data dynamic',table: {
                category: 'Data'
            },
        },
    }
};
