import { debugTwoLayersThreePoints } from '../src/data_structures_examples/debug_TwoLayersThreePoints';
import { debugTwoLayersFourPoints } from '../src/data_structures_examples/debug_TwoLayersFourPoints';
import {defaultControl} from './controls/default_controls';
import {createPalindrome} from './controls/createPalindrome';
export default {
    title: 'Debug/Palindrome/Examples',
    argTypes: defaultControl(),
};
export const DebugTwoLayersThreePoints = createPalindrome.bind({});
DebugTwoLayersThreePoints.args = {
    TextStyle:1,
    displayUnits: true,
    textSize: 14,
    mockupData: true,
    textBold: true,
    textItalic:false,
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
    lineWidth: 0.5,
    zplaneInitial: 0,
    zplaneHeight: 40,
    zplaneMultilayer: -20,
    data: debugTwoLayersThreePoints(),
};

export const DebugTwoLayersFourPoints = createPalindrome.bind({});
DebugTwoLayersFourPoints.args = {
    TextStyle:1,
    displayUnits: true,
    textSize: 14,
    mockupData: true,
    textBold: true,
    textItalic:false,
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
    mainAppColor: '#FFCC00',
    subAppColor: '#FFFFFF',
    statusRangelow: 0,
    statusRangemed: 30,
    statusRangehigh: 60,
    statusColorlow: '#9FC5E8',
    statusColormed:  '#00FF00',
    statusColorhigh: '#FF0000',
    lineColor: '#000000',
    lineOpacity: 1,
    lineWidth: 0.5,
    zplaneInitial: 0,
    zplaneHeight: 40,
    zplaneMultilayer: -20,
    data: debugTwoLayersFourPoints(),
};

