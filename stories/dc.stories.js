import { dcBasicConfiguration } from '../data-examples/dc_BasicConfiguration';
import { dcCustomConfiguration } from '../data-examples/dc_CustomConfiguration';
import { dcEnergeticEfficiency } from '../data-examples/dc_EnergeticEfficiency';
import { dcFullMap } from '../data-examples/dc_FullMap';
import { dcBasicConfigurationThreeLayers } from '../data-examples/dc_BasicConfigurationThreeLayers';
import { defaultControls, defaultValues } from './controls/defaultControls';
import { createPalindrome } from './controls/createPalindrome';
import { dc_BasicConfigurationLayerColoured } from '../data-examples/dc_BasicConfigurationLayerColoured';
import { dcNegativeValuesConfiguration } from '../data-examples/dc_NegativeValuesConfiguration';
import { dcMetricDirectionConfiguration } from '../data-examples/dc_MetricDirectionConfiguration';
import { dcMetricStates } from '../data-examples/dc_MetricStates';

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

export const NegativeValuesConfiguration = createPalindrome.bind({});
NegativeValuesConfiguration.args = {
    mainStaticColor: '#FFCC00',
    data: dcNegativeValuesConfiguration(),
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

export const BasicConfigurationLayerColoured = createPalindrome.bind({});
BasicConfigurationLayerColoured.args = {
    data: dc_BasicConfigurationLayerColoured(),
};

export const MetricDirectionConfiguration = createPalindrome.bind({});
MetricDirectionConfiguration.args = {
    data: dcMetricDirectionConfiguration(),
};

export const MetricStatesConfig = createPalindrome.bind({});
MetricStatesConfig.args = {
    mainStaticColor: '#FFCC00',
    data: dcMetricStates(),
};