import { debugTwoLayersThreePoints } from './src/data_structures_examples/debug_TwoLayersThreePoints';
import {defaultControl} from "./controls/default_controls";
import {createPalindrome} from "./controls/createPalindrome";
export default {
    title: 'Use Cases/Palindrome/Data Center example',
    argTypes: defaultControl(),
};
const twoLayersThreePoints = createPalindrome.bind({});
twoLayersThreePoints.args = {
    TextStyle:1,
    displayUnits: true,
    textSize: 14,
    textColor: '#252c11',
    textBold: true,
    textItalic: false,
    characterFont: 'arial',
    mockupData: true,
    displayArea: 'palindrome',
    palindromeSize: 3,
    displaySides: true,
    displayMode: 'dynamic',
    displayLayers: true,
    layerDisplayMode: 'dynamic',
    displayLabels: true,
    displayLabelsAll: false,
    displayGrid: true,
    gridSize: 100,
    gridDivisions: 100,
    metricMagnifier: 10,
    layerStatusControl: true,
    layerMidColor: '#DFDF0B',
    mainAppColor: '#00FF06',
    subAppColor: '#9FC5E8',
    statusRangelow: 0,
    statusRangemed: 30,
    statusRangehigh: 60,
    statusColorlow: '#9FC5E8',
    statusColormed:  '#00FF00',
    statusColorhigh: '#FF0000',
    lineColor: '#000000',
    lineOpacity: 1,
    lineTranparency: 0.5,
    lineWidth: 3,
    zplaneInitial: 0,
    zplaneHeight: 40,
    zplaneMultilayer: -20,
    data: debugTwoLayersThreePoints(),
};

    const config = {
        mockupData: true,
        displayArea: 'palindrome',
    	palindromeSize : 3,
        displaySides : true,
        displayMode: 'dynamic',
        displayLayers : true,
        displayLayersLines : true,
        layerDisplayMode: 'dynamic',
        displayLabels : true,
        displayLabelsAll : true,
        displayGrid: true,
        gridSize: 100,
        gridDivisions: 100,
        metricMagnifier: 10,
        layerStatusControl: true,
        layerMidColor:'#FF2C00',
        mainAppColor:'#FFCC00',
        subAppColor:'#FFFFFF',
        statusRange: {
            low: '0',
            med: '30',
            high: '60'
        },
        statusColor: {
            low: '#9FC5E8',
            med: '#00FF00',
            high: '#FF0000'
        },
        line: {
            lineColor: '#000000',
            lineOpacity: 1,
            lineTranparency: 0.5,
            lineWidth: 3
        },
        zplane: {
            zplaneInitial: 0,
            zplaneHeight: 40,
            zplaneMultilayer: -20
        },
        data: debugTwoLayersThreePoints()
    };

    const container = document.getElementById('palindrome');
    palindrome(container, JSON.parse(JSON.stringify(config)));

