/**
 * Return declare control types
 */
export function defaultControl() {
    return {
        TextStyle: {
            name: 'Text style', control: {
                type: 'select',
                options: {
                    '2D': 1,
                    '3D TextSprite': 2,
                    '3D WebGlFont': 3,
                }
            },
        },
        displayUnits: {name: 'Display units in labels', control: 'boolean'},
        textSize: {
            name: 'Text size', control: {
                label: 'Text style', type: 'select',
                options: {
                    Small: 12,
                    Medium: 14,
                    Large: 18,
                }
            }
        },
        textColor: {name: 'Text color', control: 'color'},
        textBold: {name: 'Bold text', control: 'boolean'},
        textItalic: {name: 'Italic text', control: 'boolean'},
        characterFont: {
            name: 'Character font', control:
                {type: 'select', options: ['Serif', 'Sans-serif', 'Arial',]},
        },
        mockupData: {name: 'Mockup data', control: 'boolean'},
        displayArea: {name: 'Display area', control: 'text'},
        palindromeSize: {name: 'Palindrome size', control: 'number'},
        displaySides: {name: 'Display sides', control: 'boolean'},
        displayMode: {name: 'Display sides mode', control: 'text'},
        displayLayers: {name: 'Display layers', control: 'boolean'},
        layerDisplayMode: {name: 'Display layers mode', control: 'text'},
        displayLabels: {name: 'Display labels', control: 'boolean'},
        displayLabelsAll: {name: 'Display all labels', control: 'boolean'},
        displayGrid: {name: 'Display grid', control: 'boolean'},
        gridSize: {name: 'Grid size', control: 'number'},
        gridDivisions: {name: 'Grid divisions', control: 'number'},
        metricMagnifier: {name: 'Metric magnifier', control: 'number'},
        layerStatusControl: {name: 'Layer status control', control: 'boolean'},
        layerMidColor: {name: 'Layer mid color', control: 'color'},
        mainAppColor: {name: 'Main app color', control: 'color'},
        subAppColor: {name: 'Sub app color', control: 'color'},
        statusRangelow: {name: 'Status range low', control: 'number'},
        statusRangemed: {name: 'Status range med', control: 'number'},
        statusRangehigh: {name: 'Status range high', control: 'number'},
        statusColorlow: {name: 'Status color low', control: 'color'},
        statusColormed: {name: 'Status color med', control: 'color'},
        statusColorhigh: {name: 'Status color high', control: 'color'},
        lineColor: {name: 'Line color', control: 'color'},
        lineOpacity: {name: 'Line opacity', control: 'number'},
        lineTranparency: {name: 'Line tranparency', control: 'number'},
        lineWidth: {name: 'Line width', control: 'number'},
        zplaneInitial: {name: 'Zplane initial', control: 'number'},
        zplaneHeight: {name: 'Zplane height', control: 'number'},
        zplaneMultilayer: {name: 'Zplane multilayer', control: 'number'},
        data: {name: 'Data', control: 'object'},
    }
};