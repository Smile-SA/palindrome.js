/**
 * Return declare control types
 */
export function defaultControl() {
    return {
        // labels configuration
        TextStyle: {
            name: 'Label style',
            description: 'To change the style of labels',
            defaultValue: 2,
            control: {
                type: 'select',
                options: {
                    '2D': 1,
                    '3D TextSprite': 2,
                    '3D WebGlFont': 3,
                }
            },
            table: {
                category: 'Label',
            },
        },
        characterFont: {
            name: 'Label Character font', defaultValue: 'Serif', description: 'To change the characters of the labels',
            control: {
                    type: 'select',
                    options: ['Serif', 'Sans-serif', 'Arial',]
                },
            table: {
                category: 'Label'
            },
        },
        textSize: {
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
                category: 'Label'
            },
        },
        textColor: {
            name: 'Label color', defaultValue: '#000000', control: 'color',
            description:'To change the color of the labels',
            table: {
                category: 'Label'
            },
        },
        textBold: {
            name: 'Bold Label', defaultValue: true, control: 'boolean',description:'To put the labels in bold or not', table: {
                category: 'Label'
            },
        },
        textItalic: {
            name: 'Italic Label', defaultValue: false,description:'To put the labels in italic or not', control: 'boolean', table: {
                category: 'Label'
            },
        },
        displayUnits: {
            name: 'Display units in labels', defaultValue: true,description:'To display or not the units of labels', control: 'boolean', table: {
                category: 'Label'
            },
        },
        displayLabels: {
            name: 'Display labels', defaultValue: true,description:'To display or not the labels', control: 'boolean',
            table: {
                category: 'Label'
            },
        },
        displayLabelsAll: {
            name: 'Display all labels', defaultValue: false,description:'To display or not all the labels', control: 'boolean',
            table: {
                category: 'Label'
            },
        },


        // Palindrome configurations
        displayArea: {
            name: 'Display area', defaultValue: 'palindrome',description:'',control: 'text',
            table: {
                category: 'Palindrome'
            },
        },
        metricMagnifier: {
            name: 'Metric magnifier', defaultValue: 10,description:'To resize the metrics', control: 'number',
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
                    category: 'Palindrome', subcategory: 'sides'
                },
            },
            mainAppColor: {
                name: 'Main app color', defaultValue: '#00FF06', control: 'color', description:'To change the main app color',
                table: {
                    category: 'Palindrome', subcategory: 'sides'
                },
            },
            subAppColor: {
                name: 'Sub app color', defaultValue: '#9FC5E8', control: 'color', description:'To change the sub app color',
                table: {
                    category: 'Palindrome', subcategory: 'sides'
                },
            },
            displaySides: {
                name: 'Display sides', defaultValue: true, control: 'boolean', description:'To display or not the sides of palindrome\t',
                table: {
                    category: 'Palindrome', subcategory: 'sides'
                },
            },


        //plan configuration
            // grid
            gridSize: {
                name: 'Grid size', defaultValue: 100, control: 'number',description:'To resize the grid',
                table: {
                    category: 'Plan', subcategory: 'Grid'
                },
            },
            gridDivisions: {
                name: 'Grid divisions', defaultValue: 100, control: 'number',description:'To define the divisions of the grid',
                table: {
                    category: 'Plan', subcategory: 'Grid'
                },
            },
            displayGrid: {
                name: 'Display grid', defaultValue: true, control: 'boolean',description:'To display or not the grid of the plan',
                table: {
                    category: 'Plan', subcategory: 'Grid'
                },
            },
            // zplane
            zplaneInitial: {
                name: 'Zplane initial', defaultValue: 0, control: 'number',description:'To resize the initial zplane',
                table: {
                    category: 'Plan', subcategory: 'Zplan'
                },
            },
            zplaneHeight: {
                name: 'Zplane height', defaultValue: 40, control: 'number',description:'To resize the height zplane',
                table: {
                    category: 'Plan', subcategory: 'Zplan'
                },
            },
            zplaneMultilayer: {
                name: 'Zplane multilayer', defaultValue: -20, control: 'number',description:'To resize the multilayer zplane',
                table: {
                    category: 'Plan', subcategory: 'Zplan'
                },
            },


        // status configurations
            // color
            statusColorlow: {
                name: 'Status color low', defaultValue: '#9FC5E8', control: 'color',description:'To change the low status color',
                table: {
                    category: 'Status', subcategory: 'color'
                },
            },
            statusColormed: {
                name: 'Status color med', defaultValue: '#00FF00', control: 'color',description:'To change the med status color',
                table: {
                    category: 'Status', subcategory: 'color'
                },
            },
            statusColorhigh: {
                name: 'Status color high', defaultValue: '#FF0000', control: 'color',description:'To change the high status color',
                table: {
                    category: 'Status', subcategory: 'color'
                },
            },
            // range
            statusRangelow: {
                name: 'Status range low', defaultValue: 0, control: 'number',description:'To resize the low status range',
                table: {
                    category: 'Status', subcategory: 'range'
                },
            },
            statusRangemed: {
                name: 'Status range med', defaultValue: 30, control: 'number',description:'To resize the med status range',
                table: {
                    category: 'Status', subcategory: 'range'
                },
            },
            statusRangehigh: {
                name: 'Status range high', defaultValue: 60, control: 'number',description:'To resize the high status range',
                table: {
                    category: 'Status', subcategory: 'range'
                },
            },


        // data configuration
        data: {
            name: 'Data', defaultValue: 'palindrome', control: 'object',
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