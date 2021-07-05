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
    layerMidColor: '#DFDF0B',
    mainAppColor: '#00FF06',
    subAppColor: '#9FC5E8',
    statusColorlow: '#9FC5E8',
    statusColormed:  '#00FF00',
    statusColorhigh: '#FF0000',
    data: debugTwoLayersThreePoints(),
};

export const DebugTwoLayersFourPoints = createPalindrome.bind({});
DebugTwoLayersFourPoints.args = {
    layerMidColor: '#FF2C00',
    mainAppColor: '#FFCC00',
    subAppColor: '#FFFFFF',
    statusColorlow: '#9FC5E8',
    statusColormed:  '#00FF00',
    statusColorhigh: '#FF0000',
    data: debugTwoLayersFourPoints(),
};

