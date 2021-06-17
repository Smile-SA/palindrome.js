import {dcBasicConfiguration} from '../src/data_structures_examples/dc_BasicConfiguration';
import {dcCustomConfiguration} from '../src/data_structures_examples/dc_CustomConfiguration';
import {dcFullMap} from '../src/data_structures_examples/dc_FullMap';
import {defaultControl} from '../controls/default_controls';
import {createPalindrome} from '../controls/createPalindrome';

export default {
    title: 'Use Cases/Palindrome/Data Center example',
    argTypes: defaultControl(),
};

export const BasicConfiguration = createPalindrome.bind({});
BasicConfiguration.args = {
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
    data: dcBasicConfiguration(),
};

export const CustomConfiguration = createPalindrome.bind({});
CustomConfiguration.args = {
    TextStyle:1,
    displayUnits: true,
    textSize: 14,
    textColor: '#000000',
    textBold: true,
    textItalic: false,
    characterFont: 'Arial',
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
    lineTranparency: 0.5,
    lineWidth: 3,
    zplaneInitial: 0,
    zplaneHeight: 40,
    zplaneMultilayer: -20,
    data: dcCustomConfiguration(),
};

export const FullMap = createPalindrome.bind({});
FullMap.args = {
    TextStyle:1,
    displayUnits: true,
    textSize: 14,
    textColor: '#000000',
    textBold: true,
    textItalic: false,
    characterFont: 'Arial',
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
    lineTranparency: 0.5,
    lineWidth: 3,
    zplaneInitial: 0,
    zplaneHeight: 40,
    zplaneMultilayer: -20,
    data: dcFullMap(),
};

export const EnergeticEfficiency = createPalindrome.bind({});
EnergeticEfficiency.args = {
    TextStyle:1,
    displayUnits: true,
    textSize: 14,
    textColor: '#000000',
    textBold: true,
    textItalic: false,
    characterFont: 'Arial',
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
    mainAppColor: '#7AEDF3',
    subAppColor: '#FFFFFF',
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
    data: dcBasicConfiguration(),
};