/**
 * Return declare control types
 */
export function defaultControl() {
    return {
        TextStyle: {
            name: 'Text style',
            defaultValue: 2,
            control: {
                type: 'select',
                options: {
                    '2D': 1,
                    '3D TextSprite': 2,
                    '3D WebGlFont': 3,
                }
            },
        },
        displayUnits: {name: 'Display units in labels', defaultValue: true, control: 'boolean'},
        textSize: {
            name: 'Text size',
            defaultValue: 16,
            control: {
                type: 'select',
                options: {
                    Small: 14,
                    Medium: 16,
                    Large: 18,
                }
            }
        },
        textColor: {name: 'Text color', defaultValue: '#000000', control: 'color'},
        textBold: {name: 'Bold text', defaultValue: true, control: 'boolean'},
        textItalic: {name: 'Italic text', defaultValue: false, control: 'boolean'},
        characterFont: {
            name: 'Character font', defaultValue: 'Serif', control:
                {type: 'select', options: ['Serif', 'Sans-serif', 'Arial',]},
        },
        mockupData: {name: 'Mockup data', defaultValue: true, control: 'boolean'},
        displayArea: {name: 'Display area', defaultValue: 'palindrome', control: 'text'},
        palindromeSize: {name: 'Palindrome size',defaultValue: 3, control: 'number'},
        displaySides: {name: 'Display sides',defaultValue: true, control: 'boolean'},
        displayMode: {name: 'Display sides mode',defaultValue: 'dynamic', control: 'text'},
        displayLayers: {name: 'Display layers',defaultValue: true, control: 'boolean'},
        layerDisplayMode: {name: 'Display layers mode',defaultValue: 'dynamic', control: 'text'},
        displayLabels: {name: 'Display labels',defaultValue: true, control: 'boolean'},
        displayLabelsAll: {name: 'Display all labels',defaultValue: false, control: 'boolean'},
        displayGrid: {name: 'Display grid',defaultValue: true, control: 'boolean'},
        gridSize: {name: 'Grid size',defaultValue: 100, control: 'number'},
        gridDivisions: {name: 'Grid divisions',defaultValue: 100, control: 'number'},
        metricMagnifier: {name: 'Metric magnifier',defaultValue: 10, control: 'number'},
        layerStatusControl: {name: 'Layer status control',defaultValue: true, control: 'boolean'},
        layerMidColor: {name: 'Layer mid color', defaultValue: '#DFDF0B', control:'color'},
        mainAppColor: {name: 'Main app color', defaultValue: '#00FF06', control:'color'},
        subAppColor: {name: 'Sub app color', defaultValue: '#9FC5E8', control:'color'},
        statusRangelow: {name: 'Status range low',defaultValue: 0, control: 'number'},
        statusRangemed: {name: 'Status range med',defaultValue: 30, control: 'number'},
        statusRangehigh: {name: 'Status range high',defaultValue: 60, control: 'number'},
        statusColorlow: {name: 'Status color low',defaultValue: '#9FC5E8', control: 'color'},
        statusColormed: {name: 'Status color med',defaultValue: '#00FF00', control: 'color'},
        statusColorhigh: {name: 'Status color high',defaultValue: '#FF0000', control: 'color'},
        lineColor: {name: 'Line color', defaultValue: '#000000',control: 'color'},
        lineOpacity: {name: 'Line opacity',defaultValue: 1, control: 'number'},
        lineWidth: {name: 'Line width',defaultValue: 0.5, control: 'number'},
        zplaneInitial: {name: 'Zplane initial',defaultValue: 0, control: 'number'},
        zplaneHeight: {name: 'Zplane height',defaultValue: 40, control: 'number'},
        zplaneMultilayer: {name: 'Zplane multilayer',defaultValue: -20, control: 'number'},
        data: {name: 'Data',defaultValue: 'palindrome', control: 'object'},
    }
};