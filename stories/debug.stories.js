import {withKnobs, text, number, boolean, color, object, select} from "@storybook/addon-knobs";

import palindrome from '../src/index';

import { debugTwoLayersThreePoints } from '../src/data_structures_examples/debug_TwoLayersThreePoints';
import { debugTwoLayersFourPoints } from '../src/data_structures_examples/debug_TwoLayersFourPoints';

export default {
    title: 'Debug/Palindrome/Examples',
    decorators: [withKnobs]
};

export const DebugTwoLayersThreePoints = () => {
    const config = {
        TextStyle : select('Text style',{
            '2D': 1,
            '3D text sprite': 2,
            '3D webGlFont': 3,
        },1),
        displayUnits: boolean('Display units in labels', true),
        textSize : select('Text size',{
            Small: 16,
            Medium: 24,
            Large: 30,
        },24),
        textColor : color('Text color', '#000000'),
        textBold: boolean('bold text',false),
        textItalic: boolean('Italic text',false),
        characterFont : select('Character Font',{
            'Serif': 'Serif',
            'Sans-serif': 'sans-serif',
            'Arial': 'arial',
        },'arial'),
        textBoxColor: color('Text box Color', '#FFFFFF'),
        mockupData: boolean('mockupData', true),
        displayArea: text('displayArea', 'palindrome'),
    	palindromeSize : number('palindromeSize', 3),
        displaySides : boolean('displaySides', true),
        displayMode: text('displayMode', 'dynamic'),
        displayLayers : boolean('displayLayers', true),
        displayLayersLines : boolean('displayLayers', true),
        layerDisplayMode: text('layerDisplayMode', 'dynamic'),
        displayLabels : boolean('displayLabels', true),
        displayLabelsAll : boolean('displayLabelsAll', true),
        displayGrid: boolean('displayGrid', true),
        gridSize: number('gridSize', 100),
        gridDivisions: number('gridDivisions', 100),
        metricMagnifier: number('metricMagnifier', 10),
        layerStatusControl: boolean('layerStatusControl', true),
        layerMidColor: color('layerMidColor', '#FF2C00'),
        mainAppColor: color('mainAppColor', '#FFCC00'),
        subAppColor: color('subAppColor', '#FFFFFF'),
        statusRange: {
            low: number('statusRange low', '0'),
            med: number('statusRange med', '30'),
            high: number('statusRange high', '60')
        },
        statusColor: {
            low: color('statusColor low', '#9FC5E8'),
            med: color('statusColor med', '#00FF00'),
            high: color('statusColor high', '#FF0000')
        },
        line: {
            lineColor: color('lineColor', '#000000'),
            lineOpacity: number('lineOpacity', 1),
            lineTranparency: number('lineTranparency', 0.5),
            lineWidth: number('lineWidth', 3)
        },
        zplane: {
            zplaneInitial: number('zplaneInitial', 0),
            zplaneHeight: number('zplaneHeight', 40),
            zplaneMultilayer: number('zplaneMultilayer', -20)
        },
        data: object('data', debugTwoLayersThreePoints())
    };

    const container = document.createElement('div');
    palindrome(container, JSON.parse(JSON.stringify(config)));

    return container;
};

export const DebugTwoLayersFourPoints = () => {
    const config = {
        TextStyle : select('Text style',{
            '2D': 1,
            '3D text sprite': 2,
            '3D webGlFont': 3,
        },1),
        displayUnits: boolean('Display units in labels', true),
        textSize : select('Text size',{
            Small: 16,
            Medium: 24,
            Large: 30,
        },24),
        textColor : color('Text color', '#000000'),
        textBold: boolean('bold text',false),
        textItalic: boolean('Italic text',false),
        characterFont : select('Character Font',{
            'Serif': 'Serif',
            'Sans-serif': 'sans-serif',
            'Arial': 'arial',
        },'arial'),
        textBoxColor: color('Text box Color', '#FFFFFF'),
        mockupData: boolean('mockupData', true),
        displayArea: text('displayArea', 'palindrome'),
    	palindromeSize : number('palindromeSize', 3),
        displaySides : boolean('displaySides', true),
        displayMode: text('displayMode', 'dynamic'),
        displayLayers : boolean('displayLayers', true),
        displayLayersLines : boolean('displayLayersLines', true),
        layerDisplayMode: text('layerDisplayMode', 'dynamic'),
        displayLabels : boolean('displayLabels', true),
        displayLabelsAll : boolean('displayLabelsAll', true),
        displayGrid: boolean('displayGrid', true),
        gridSize: number('gridSize', 100),
        gridDivisions: number('gridDivisions', 100),
        metricMagnifier: number('metricMagnifier', 10),
        layerStatusControl: boolean('layerStatusControl', true),
        layerMidColor: color('layerMidColor', '#FF2C00'),
        mainAppColor: color('mainAppColor', '#FFCC00'),
        subAppColor: color('subAppColor', '#FFFFFF'),
        statusRange: {
            low: number('statusRange low', '0'),
            med: number('statusRange med', '30'),
            high: number('statusRange high', '60')
        },
        statusColor: {
            low: color('statusColor low', '#9FC5E8'),
            med: color('statusColor med', '#00FF00'),
            high: color('statusColor high', '#FF0000')
        },
        line: {
            lineColor: color('lineColor', '#000000'),
            lineOpacity: number('lineOpacity', 1),
            lineTranparency: number('lineTranparency', 0.5),
            lineWidth: number('lineWidth', 3)
        },
        zplane: {
            zplaneInitial: number('zplaneInitial', 0),
            zplaneHeight: number('zplaneHeight', 40),
            zplaneMultilayer: number('zplaneMultilayer', -20)
        },
        data: object('data', debugTwoLayersFourPoints())
    };

    const container = document.createElement('div');
    palindrome(container, JSON.parse(JSON.stringify(config)));

    return container;
};
