import { debugTwoLayersThreePoints } from '../data-examples/debug_TwoLayersThreePoints';
import { debugTwoLayersFourPoints } from '../data-examples/debug_TwoLayersFourPoints';
import { defaultControls, defaultValues } from './controls/defaultControls';
import { createPalindrome } from './controls/createPalindrome';

export default {
    title: 'Debug/Palindrome/Examples',
    argTypes: defaultControls(),
    args: defaultValues(),
};
export const DebugTwoLayersThreePoints = createPalindrome.bind({});
DebugTwoLayersThreePoints.args = {
    mainStaticColor: '#FFCC00',
    data: debugTwoLayersThreePoints(),
};

export const DebugTwoLayersFourPoints = createPalindrome.bind({});
DebugTwoLayersFourPoints.args = {
    mainStaticColor: '#FFCC00',
    data: debugTwoLayersFourPoints(),
};