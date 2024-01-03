import { logicBoolean } from '../data-examples/logic_Boolean';
import { logicTernary } from '../data-examples/logic_Ternary';
import { logicFourValued } from '../data-examples/logic_FourValued';
import { logicFiveThreeTwo } from '../data-examples/logic_FiveThreeTwo';
import { defaultControls, defaultValues } from './controls/defaultControls';
import { createPalindrome } from './controls/createPalindrome';

export default {
    title: 'Use Cases/Palindrome/Multi-values logic example',
    argTypes: defaultControls(),
    args: defaultValues(),
};

export const Boolean = createPalindrome.bind({});
Boolean.args = {
    mainStaticColor: '#FFCC00',
    data: logicBoolean(),
};

export const Ternary = createPalindrome.bind({});
Ternary.args = {
    mainStaticColor: '#FFCC00',
    data: logicTernary(),
};

export const FourValued = createPalindrome.bind({});
FourValued.args = {
    mainStaticColor: '#FFCC00',
    data: logicFourValued(),
};

export const FiveThreeTwoPyramid = createPalindrome.bind({});
FiveThreeTwoPyramid.args = {
    mainStaticColor: '#FFCC00',
    data: logicFiveThreeTwo(),
};