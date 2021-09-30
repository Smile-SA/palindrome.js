import { logicBoolean } from '../src/data_structures_examples/logic_Boolean';
import { logicTernary } from '../src/data_structures_examples/logic_Ternary';
import { logicFourValued } from '../src/data_structures_examples/logic_FourValued';
import { logicFiveThreeTwo } from '../src/data_structures_examples/logic_FiveThreeTwo';
import { defaultControls } from './controls/defaultControls';
import { createPalindrome } from './controls/createPalindrome';

export default {
    title: 'Use Cases/Palindrome/Multi-values logic example',
    argTypes: defaultControls(),
};

export const Boolean = createPalindrome.bind({});
Boolean.args = {
    layerMidColor: '#DFDF0B',
    mainAppColor: '#00FF06',
    subAppColor: '#9FC5E8',
    statusColorLow: '#9FC5E8',
    statusColorMed: '#00FF00',
    statusColorHigh: '#FF0000',
    data: logicBoolean(),
};

export const Ternary = createPalindrome.bind({});
Ternary.args = {
    layerMidColor: '#DFDF0B',
    mainAppColor: '#00FF06',
    subAppColor: '#9FC5E8',
    statusColorLow: '#9FC5E8',
    statusColorMed: '#00FF00',
    statusColorHigh: '#FF0000',
    data: logicTernary(),
};

export const FourValued = createPalindrome.bind({});
FourValued.args = {
    layerMidColor: '#FF2C00',
    mainAppColor: '#FFCC00',
    subAppColor: '#FFFFFF',
    statusColorLow: '#9FC5E8',
    statusColorMed: '#00FF00',
    statusColorHigh: '#FF0000',
    data: logicFourValued(),
};

export const FiveThreeTwoPyramid = createPalindrome.bind({});
FiveThreeTwoPyramid.args = {
    layerMidColor: '#FF2C00',
    mainAppColor: '#FFCC00',
    subAppColor: '#FFFFFF',
    statusColorLow: '#9FC5E8',
    statusColorMed: '#00FF00',
    statusColorHigh: '#FF0000',
    data: logicFiveThreeTwo(),
};