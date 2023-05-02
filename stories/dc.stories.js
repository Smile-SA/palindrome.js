import {dcBasicConfiguration} from '../data-examples/dc_BasicConfiguration';
import {dcCustomConfiguration} from '../data-examples/dc_CustomConfiguration';
import {dcEnergeticEfficiency} from '../data-examples/dc_EnergeticEfficiency';
import {dcFullMap} from '../data-examples/dc_FullMap';
import {defaultControls, defaultValues} from './controls/defaultControls';
import {createPalindrome} from './controls/createPalindrome';
import { dcBasicConfigurationThreeLayers } from '../data-examples/dc_BasicConfigurationThreeLayers';

export default {
    title: 'Use Cases/Palindrome/Data Center example',
    argTypes: defaultControls(),
    args: defaultValues(),
};

export const BasicConfiguration = createPalindrome.bind({});
BasicConfiguration.args = {
    mainStaticColor: '#FFCC00',
    data: dcBasicConfiguration(),
};

export const CustomConfiguration = createPalindrome.bind({});
CustomConfiguration.args = {
    layerMidColor: '#FF2C00',
    mainStaticColor: '#b700ff',
    subAppColor: '#FFFFFF',
    statusColorLow: '#e8e49f',
    statusColorMed: '#8400ff',
    statusColorHigh: '#FF0000',
    statusColorVeryHigh: '#FF0000',
    sphereColorLow: '#9b317d',
    sphereColorMed: '#f3c60a',
    sphereColorHigh: '#FF0000',
    data: dcCustomConfiguration(),
};

export const BasicConfigurationThreeLayers = createPalindrome.bind({});
BasicConfigurationThreeLayers.args = {
    mainStaticColor: '#FFCC00',
    data: dcBasicConfigurationThreeLayers(),
};


export const FullMap = createPalindrome.bind({});
FullMap.args = {
    mainStaticColor: '#FFCC00',
    data: dcFullMap(),
};

export const EnergeticEfficiency = createPalindrome.bind({});
EnergeticEfficiency.args = {
    mainStaticColor: '#FFCC00',
    data: dcEnergeticEfficiency(),
};

