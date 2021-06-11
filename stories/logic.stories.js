import {withKnobs, text, number, boolean, color, object, select} from "@storybook/addon-knobs";

import palindrome from '../src/index';

import { logicBoolean } from '../src/data_structures_examples/logic_Boolean';
import { logicTernary } from '../src/data_structures_examples/logic_Ternary';
import { logicFourValued } from '../src/data_structures_examples/logic_FourValued';
import { logicFiveThreeTwo } from '../src/data_structures_examples/logic_FiveThreeTwo';
import {dcBasicConfiguration} from "../src/data_structures_examples/dc_BasicConfiguration";

export default {
    title: 'Use Cases/Palindrome/Multi-values logic example',
    decorators: [withKnobs]
};

export const Boolean = () => {
    const config = {
        TextStyle : select('Text style',{
            '2D': 1,
            '3D TextSprite': 2,
            '3D WebGlFont': 3,
        },1),
        displayUnits: boolean('Display units in labels', true),
        textSize : select('Text size',{
            Small: 12,
            Medium: 14,
            Large: 18,
        },14),
        textColor : color('Text color', '#000000'),
        textBold: boolean('Bold text',false),
        textItalic: boolean('Italic text',false),
        characterFont : select('Character font',{
            'Serif': 'Serif',
            'Sans-serif': 'sans-serif',
            'Arial': 'arial',
        },'arial'),
        mockupData: boolean('Mockup data', true),
        displayArea: text('Display area', 'palindrome'),
        palindromeSize : number('Palindrome size', 3),
        displaySides : boolean('Display sides', true),
        displayMode: text('Display sides mode', 'dynamic'),
        displayLayers : boolean('Display layers', true),
        layerDisplayMode: text('Display layers mode', 'dynamic'),
        displayLabels : boolean('Display labels', true),
        displayLabelsAll : boolean('Display all labels', false),
        displayGrid: boolean('Display grid', true),
        gridSize: number('Grid size', 100),
        gridDivisions: number('Grid divisions', 100),
        metricMagnifier: number('Metric magnifier', 10),
        layerStatusControl: boolean('Layer status control', true),
        layerMidColor: color('Layer mid color', '#DFDF0B'),
        mainAppColor: color('Main app color', '#00FF06'),
        subAppColor: color('Sub app color', '#9FC5E8'),
        statusRange: {
            low: number('Status range low', '0'),
            med: number('Status range med', '30'),
            high: number('Status range high', '60')
        },
        statusColor: {
            low: color('Status color low', '#9FC5E8'),
            med: color('Status color med', '#00FF00'),
            high: color('Status color high', '#FF0000')
        },
        line: {
            lineColor: color('Line color', '#000000'),
            lineOpacity: number('Line opacity', 1),
            lineTranparency: number('Line tranparency', 0.5),
            lineWidth: number('Line width', 3)
        },
        zplane: {
            zplaneInitial: number('Zplane initial', 0),
            zplaneHeight: number('Zplane height', 40),
            zplaneMultilayer: number('Zplane multilayer', -20)
        },
        data: object('Data', logicBoolean())
    };
    const container = document.createElement('div');
    palindrome(container, JSON.parse(JSON.stringify(config)));
    return container;
};

export const Ternary = ()  => {
    const config = {
        TextStyle : select('Text style',{
            '2D': 1,
            '3D TextSprite': 2,
            '3D WebGlFont': 3,
        },1),
        displayUnits: boolean('Display units in labels', true),
        textSize : select('Text size',{
            Small: 12,
            Medium: 14,
            Large: 18,
        },14),
        textColor : color('Text color', '#000000'),
        textBold: boolean('Bold text',false),
        textItalic: boolean('Italic text',false),
        characterFont : select('Character font',{
            'Serif': 'Serif',
            'Sans-serif': 'sans-serif',
            'Arial': 'arial',
        },'arial'),
        mockupData: boolean('Mockup data', true),
        displayArea: text('Display area', 'palindrome'),
        palindromeSize : number('Palindrome size', 3),
        displaySides : boolean('Display sides', true),
        displayMode: text('Display sides mode', 'dynamic'),
        displayLayers : boolean('Display layers', true),
        layerDisplayMode: text('Display layers mode', 'dynamic'),
        displayLabels : boolean('Display labels', true),
        displayLabelsAll : boolean('Display all labels', false),
        displayGrid: boolean('Display grid', true),
        gridSize: number('Grid size', 100),
        gridDivisions: number('Grid divisions', 100),
        metricMagnifier: number('Metric magnifier', 10),
        layerStatusControl: boolean('Layer status control', true),
        layerMidColor: color('Layer mid color', '#FF2C00'),
        mainAppColor: color('Main app color', '#FFCC00'),
        subAppColor: color('Sub app color', '#FFFFFF'),
        statusRange: {
            low: number('Status range low', '0'),
            med: number('Status range med', '30'),
            high: number('Status range high', '60')
        },
        statusColor: {
            low: color('Status color low', '#9FC5E8'),
            med: color('Status color med', '#00FF00'),
            high: color('Status color high', '#FF0000')
        },
        line: {
            lineColor: color('Line color', '#000000'),
            lineOpacity: number('Line opacity', 1),
            lineTranparency: number('Line tranparency', 0.5),
            lineWidth: number('Line width', 3)
        },
        zplane: {
            zplaneInitial: number('Zplane initial', 0),
            zplaneHeight: number('Zplane height', 40),
            zplaneMultilayer: number('Zplane multilayer', -20)
        },
        data: object('data', logicTernary())

    };
    const container = document.createElement('div');
    palindrome(container, JSON.parse(JSON.stringify(config)));
    return container;
};

export const FourValued = () => {
    const config = {
        TextStyle : select('Text style',{
            '2D': 1,
            '3D TextSprite': 2,
            '3D WebGlFont': 3,
        },1),
        displayUnits: boolean('Display units in labels', true),
        textSize : select('Text size',{
            Small: 12,
            Medium: 14,
            Large: 18,
        },14),
        textColor : color('Text color', '#000000'),
        textBold: boolean('Bold text',false),
        textItalic: boolean('Italic text',false),
        characterFont : select('Character font',{
            'Serif': 'Serif',
            'Sans-serif': 'sans-serif',
            'Arial': 'arial',
        },'arial'),
        mockupData: boolean('Mockup data', true),
        displayArea: text('Display area', 'palindrome'),
        palindromeSize : number('Palindrome size', 3),
        displaySides : boolean('Display sides', true),
        displayMode: text('Display sides mode', 'dynamic'),
        displayLayers : boolean('Display layers', true),
        layerDisplayMode: text('Display layers mode', 'dynamic'),
        displayLabels : boolean('Display labels', true),
        displayLabelsAll : boolean('Display all labels', false),
        displayGrid: boolean('Display grid', true),
        gridSize: number('Grid size', 100),
        gridDivisions: number('Grid divisions', 100),
        metricMagnifier: number('Metric magnifier', 10),
        layerStatusControl: boolean('layerStatusControl', true),
        layerMidColor: color('layerMidColor', '#FF2C00'),
        mainAppColor: color('mainAppColor', '#FFCC00'),
        subAppColor: color('subAppColor', '#FFFFFF'),
        statusRange: {
            low: number('Status range low', '0'),
            med: number('Status range med', '30'),
            high: number('Status range high', '60')
        },
        statusColor: {
            low: color('Status color low', '#9FC5E8'),
            med: color('Status color med', '#00FF00'),
            high: color('Status color high', '#FF0000')
        },
        line: {
            lineColor: color('Line color', '#000000'),
            lineOpacity: number('Line opacity', 1),
            lineTranparency: number('Line tranparency', 0.5),
            lineWidth: number('Line width', 3)
        },
        zplane: {
            zplaneInitial: number('Zplane initial', 0),
            zplaneHeight: number('Zplane height', 40),
            zplaneMultilayer: number('Zplane multilayer', -20)
        },
        data: object('data', logicFourValued())

    };
    const container = document.createElement('div');
    palindrome(container, JSON.parse(JSON.stringify(config)));
    return container;
};

export const FiveThreeTwoPyramid = () => {
    const config = {
        TextStyle : select('Text style',{
            '2D': 1,
            '3D TextSprite': 2,
            '3D WebGlFont': 3,
        },1),
        displayUnits: boolean('Display units in labels', true),
        textSize : select('Text size',{
            Small: 12,
            Medium: 14,
            Large: 18,
        },14),
        textColor : color('Text color', '#000000'),
        textBold: boolean('Bold text',false),
        textItalic: boolean('Italic text',false),
        characterFont : select('Character font',{
            'Serif': 'Serif',
            'Sans-serif': 'sans-serif',
            'Arial': 'arial',
        },'arial'),
        mockupData: boolean('Mockup data', true),
        displayArea: text('Display area', 'palindrome'),
        palindromeSize : number('Palindrome size', 3),
        displaySides : boolean('Display sides', true),
        displayMode: text('Display sides mode', 'dynamic'),
        displayLayers : boolean('Display layers', true),
        layerDisplayMode: text('Display layers mode', 'dynamic'),
        displayLabels : boolean('Display labels', true),
        displayLabelsAll : boolean('Display all labels', false),
        displayGrid: boolean('Display grid', true),
        gridSize: number('Grid size', 100),
        gridDivisions: number('Grid divisions', 100),
        metricMagnifier: number('Metric magnifier', 10),
        layerStatusControl: boolean('Layer status control', true),
        layerMidColor: color('layerMidColor', '#FF2C00'),
        mainAppColor: color('mainAppColor', '#FFCC00'),
        subAppColor: color('subAppColor', '#FFFFFF'),
        statusRange: {
            low: number('Status range low', '0'),
            med: number('Status range med', '30'),
            high: number('Status range high', '60')
        },
        statusColor: {
            low: color('Status color low', '#9FC5E8'),
            med: color('Status color med', '#00FF00'),
            high: color('Status color high', '#FF0000')
        },
        line: {
            lineColor: color('Line color', '#000000'),
            lineOpacity: number('Line opacity', 1),
            lineTranparency: number('Line tranparency', 0.5),
            lineWidth: number('Line width', 3)
        },
        zplane: {
            zplaneInitial: number('Zplane initial', 0),
            zplaneHeight: number('Zplane height', 40),
            zplaneMultilayer: number('Zplane multilayer', -20)
        },
        data: object('Data', logicFiveThreeTwo())
    };
    const container = document.createElement('div');
    palindrome(container, JSON.parse(JSON.stringify(config)));
    return container;
};
