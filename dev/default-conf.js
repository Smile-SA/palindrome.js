import palindrome from '../src/index';
import { debugTwoLayersThreePoints } from '../src/data_structures_examples/debug_TwoLayersThreePoints';

const config = {
    labelsRendering:"3D",
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
    layerMidColor: '#FF2C00',
    mainAppColor: '#FF2C00',
    subAppColor: '#FFFFFF',
    statusRangelow: 0,
    statusRangemed: 30,
    statusRangehigh: 60,
    statusColorlow: '#9FC5E8',
    statusColormed:  '#00FF00',
    statusColorhigh: '#FF0000',
    lineColor: '#000000',
    lineOpacity: 1,
    lineWidth: 3,
    zplaneInitial: 0,
    zplaneHeight: 40,
    zplaneMultilayer: -20,
    data: debugTwoLayersThreePoints(),
};

const container = document.getElementById('palindrome');
palindrome(container, JSON.parse(JSON.stringify(config)));

