import {dcBasicConfiguration} from '../src/data_structures_examples/dc_BasicConfiguration';
import {dcCustomConfiguration} from '../src/data_structures_examples/dc_CustomConfiguration';
import {dcEnergeticEfficiency} from '../src/data_structures_examples/dc_EnergeticEfficiency';
import {dcFullMap} from '../src/data_structures_examples/dc_FullMap';
import {defaultControl} from './controls/default_controls';
import {createPalindrome} from './controls/createPalindrome';

export default {
    title: 'Use Cases/Palindrome/Data Center example',
    argTypes: defaultControls(),
};

export const BasicConfiguration = createPalindrome.bind({});
BasicConfiguration.args = {
    layerMidColor: '#DFDF0B',
    mainAppColor: '#00FF06',
    subAppColor: '#9FC5E8',
    statusColorlow: '#9FC5E8',
    statusColormed: '#00FF00',
    statusColorhigh: '#FF0000',
    data: dcBasicConfiguration(),
};

export const CustomConfiguration = createPalindrome.bind({});
CustomConfiguration.args = {
    layerMidColor: '#FF2C00',
    mainAppColor: '#FFCC00',
    subAppColor: '#FFFFFF',
    statusColorlow: '#9FC5E8',
    statusColormed: '#00FF00',
    statusColorhigh: '#FF0000',
    data: dcCustomConfiguration(),
};

export const FullMap = createPalindrome.bind({});
FullMap.args = {
    layerMidColor: '#FF2C00',
    mainAppColor: '#FFCC00',
    subAppColor: '#FFFFFF',
    statusColorlow: '#9FC5E8',
    statusColormed: '#00FF00',
    statusColorhigh: '#FF0000',
    data: dcFullMap(),
};

export const EnergeticEfficiency = createPalindrome.bind({});
EnergeticEfficiency.args = {
    layerMidColor: '#FF2C00',
    mainAppColor: '#7AEDF3',
    subAppColor: '#FFFFFF',
    statusColorlow: '#9FC5E8',
    statusColormed: '#00FF00',
    statusColorhigh: '#FF0000',
    data: dcEnergeticEfficiency(),
};
