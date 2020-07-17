import { withKnobs, text, number, boolean, color, object } from "@storybook/addon-knobs";

import palindrome from '../src/index';
import { baseData } from '../src/baseData';

export default {
    title: 'Palindrome Examples',
    decorators: [withKnobs]
};

export const DefaultConfigurable = () => {
    const config = {
        mockupData: boolean('mockupData', true),
        layerStatusControl: boolean('layerStatusControl', true),
        displayOption: text('displayOption', 'one'),
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
            zplaneInitial: number('zplaneInitial', 20),
            zplaneHeight: number('zplaneHeight', 40),
            zplaneMultilayer: number('zplaneMultilayer', 30)
        },
        data: object('data', baseData())
    };

    const container = document.createElement('div');
    palindrome(container, JSON.parse(JSON.stringify(config)));

    return container;
};

export const CustomConfigurable = () => {
    const title = text('Title', 'Pallindrome - type 1');
    const config = {
        mockupData: boolean('mockupData', false),
        layerStatusControl: boolean('layerStatusControl', true),
        displayOption: text('displayOption', 'one'),
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
            zplaneInitial: number('zplaneInitial', 20),
            zplaneHeight: number('zplaneHeight', 40),
            zplaneMultilayer: number('zplaneMultilayer', 30)
        },
        data: object('data', baseData())
    };

    const container = document.createElement('div');
    palindrome(container, JSON.parse(JSON.stringify(config)));

    return container;
};
