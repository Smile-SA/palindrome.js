import { withKnobs, text, number, boolean, color, object } from "@storybook/addon-knobs";

import palindrome from '../src/index';
import { baseData } from '../src/data_examples/baseData';
import { customData } from '../src/data_examples/customData';
import { multiData } from '../src/data_examples/multiData';
import { singleLayer } from '../src/data_examples/singleLayer';

export default {
    title: 'Palindrome Examples',
    decorators: [withKnobs]
};

export const Default = () => {
    const config = {
        mockupData: boolean('mockupData', true),
        layerStatusControl: boolean('layerStatusControl', true),
        displayOption: text('displayOption', 'three'),
	displaySidePanels : boolean('displaySidePanels', false),
        displayGrid: boolean('displayGrid', true),
        displayArea: text('displayArea', 'palindrome'),
        metricMagnifier: number('metricMagnifier', 5),
        layerMidColor: color('layerMidColor', '#DFDF0B'),
        mainAppColor: color('mainAppColor', '#4EC163'),
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
        mockupData: boolean('mockupData', false),
        layerStatusControl: boolean('layerStatusControl', true),
        displayOption: text('displayOption', 'one'),
        displayGrid: boolean('displayGrid', true),
        displayArea: text('displayArea', 'palindrome'),
        metricMagnifier: number('metricMagnifier', 10),
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

export const Multi = () => {
    const config = {
        mockupData: boolean('mockupData', false),
        layerStatusControl: boolean('layerStatusControl', true),
        displayOption: text('displayOption', 'one'),
        displayGrid: boolean('displayGrid', true),
        displayArea: text('displayArea', 'palindrome'),
        metricMagnifier: number('metricMagnifier', 10),
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

export const Single = () => {
    const config = {
        mockupData: boolean('mockupData', false),
        layerStatusControl: boolean('layerStatusControl', true),
        displayOption: text('displayOption', 'three'),
        displayGrid: boolean('displayGrid', true),
        displayArea: text('displayArea', 'palindrome'),
        metricMagnifier: number('metricMagnifier', 10),
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
        data: object('data', singleLayer())
    };

    const container = document.createElement('div');
    palindrome(container, JSON.parse(JSON.stringify(config)));

    return container;
};
