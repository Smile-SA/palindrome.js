import { withKnobs, text, number, boolean, color, object } from "@storybook/addon-knobs";

import palindrome from '../src/index';
import { baseData } from '../src/data_examples/baseData';
import { customData } from '../src/data_examples/customData';
import { multiData } from '../src/data_examples/multiData';
import { multiDataAPL } from '../src/data_examples/multiDataAPL';
import { singleLayerTwo } from '../src/data_examples/singleLayerTwo';
import { singleLayerThree } from '../src/data_examples/singleLayerThree';
import { singleLayerFour } from '../src/data_examples/singleLayerFour';
import { debugThree } from '../src/data_examples/debug-three';
import { debugTwoLayersFourPoints } from '../src/data_examples/debug-four';

export default {
    title: 'Palindrome Examples',
    decorators: [withKnobs]
};

export const Basic = () => {
    const config = { 
        mockupData: boolean('mockupData', true),
        displayArea: text('displayArea', 'palindrome'),
    	palindromeSize : number('palindromeSize', 3),
	displaySides : boolean('displaySides', true),
        displayMode: text('displayMode', 'dynamic'),
	displayLayers : boolean('displayLayers', true),
        layerDisplayMode: text('layerDisplayMode', 'dynamic'),
	displayLabels : boolean('displayLabels', true),
	displayLabelsAll : boolean('displayLabelsAll', false),
        displayGrid: boolean('displayGrid', true),
        gridSize: number('gridSize', 100),
        gridDivisions: number('gridDivisions', 100),
        metricMagnifier: number('metricMagnifier', 10),
        layerStatusControl: boolean('layerStatusControl', true),
        layerMidColor: color('layerMidColor', '#DFDF0B'),
        mainAppColor: color('mainAppColor', '#00FF06'),
        subAppColor: color('subAppColor', '#9FC5E8'),
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
        data: object('data', baseData())
    };

    const container = document.createElement('div');
    palindrome(container, JSON.parse(JSON.stringify(config)));

    return container;
};

export const Custom = () => {
    const config = {
        mockupData: boolean('mockupData', true),
        displayArea: text('displayArea', 'palindrome'),
    	palindromeSize : number('palindromeSize', 3),
	displaySides : boolean('displaySides', true),
        displayMode: text('displayMode', 'dynamic'),
	displayLayers : boolean('displayLayers', true),
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
        data: object('data', customData())
    };

    const container = document.createElement('div');
    palindrome(container, JSON.parse(JSON.stringify(config)));

    return container;
};

export const Multi = ()  => {
    const config = { 
        mockupData: boolean('mockupData', true),
        displayArea: text('displayArea', 'palindrome'),
    	palindromeSize : number('palindromeSize', 3),
	displaySides : boolean('displaySides', true),
        displayMode: text('displayMode', 'dynamic'),
	displayLayers : boolean('displayLayers', true),
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
        data: object('data', multiData())
    };

    const container = document.createElement('div');
    palindrome(container, JSON.parse(JSON.stringify(config)));

    return container;
};


export const MultiAPL = ()  => {
    const config = { 
        mockupData: boolean('mockupData', true),
        displayArea: text('displayArea', 'palindrome'),
    	palindromeSize : number('palindromeSize', 3),
	displaySides : boolean('displaySides', true),
        displayMode: text('displayMode', 'dynamic'),
	displayLayers : boolean('displayLayers', true),
        layerDisplayMode: text('layerDisplayMode', 'dynamic'),
	displayLabels : boolean('displayLabels', true),
	displayLabelsAll : boolean('displayLabelsAll', false),
        displayGrid: boolean('displayGrid', false),
        gridSize: number('gridSize', 50),
        gridDivisions: number('gridDivisions', 50),
        metricMagnifier: number('metricMagnifier', 10),
        layerStatusControl: boolean('layerStatusControl', true),
        layerMidColor: color('layerMidColor', '#FF2C00'),
        mainAppColor: color('mainAppColor', '#7AEDF3'),
        subAppColor: color('subAppColor', '#FFFFFF'),
        statusRange: {
            low: number('statusRange low', '0'),
            med: number('statusRange med', '25'),
            high: number('statusRange high', '50')
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
        data: object('data', multiDataAPL())
    };

    const container = document.createElement('div');
    palindrome(container, JSON.parse(JSON.stringify(config)));

    return container;
};
export const SingleTwo = () => {
    const config = { 
        mockupData: boolean('mockupData', true),
        displayArea: text('displayArea', 'palindrome'),
    	palindromeSize : number('palindromeSize', 3),
	displaySides : boolean('displaySides', true),
        displayMode: text('displayMode', 'dynamic'),
	displayLayers : boolean('displayLayers', true),
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
        data: object('data', singleLayerTwo())
    };

    const container = document.createElement('div');
    palindrome(container, JSON.parse(JSON.stringify(config)));

    return container;
};

export const SingleThree = ()  => {
    const config = {  
        mockupData: boolean('mockupData', true),
        displayArea: text('displayArea', 'palindrome'),
    	palindromeSize : number('palindromeSize', 3),
	displaySides : boolean('displaySides', true),
        displayMode: text('displayMode', 'dynamic'),
	displayLayers : boolean('displayLayers', true),
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
        data: object('data', singleLayerThree())
    };

    const container = document.createElement('div');
    palindrome(container, JSON.parse(JSON.stringify(config)));

    return container;
};

export const SingleFour = () => {
    const config = { 
        mockupData: boolean('mockupData', true),
        displayArea: text('displayArea', 'palindrome'),
    	palindromeSize : number('palindromeSize', 3),
	displaySides : boolean('displaySides', true),
        displayMode: text('displayMode', 'dynamic'),
	displayLayers : boolean('displayLayers', true),
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
        data: object('data', singleLayerFour())
    };

    const container = document.createElement('div');
    palindrome(container, JSON.parse(JSON.stringify(config)));

    return container;
};

export const DebugThree = () => {
    const config = { 
        mockupData: boolean('mockupData', true),
        displayArea: text('displayArea', 'palindrome'),
    	palindromeSize : number('palindromeSize', 3),
	displaySides : boolean('displaySides', true),
        displayMode: text('displayMode', 'dynamic'),
	displayLayers : boolean('displayLayers', true),
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
        data: object('data', debug())
    };

    const container = document.createElement('div');
    palindrome(container, JSON.parse(JSON.stringify(config)));

    return container;
};

export const DebugTwoLayersFourPoints = () => {
    const config = { 
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
