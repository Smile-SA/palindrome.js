import { defaultControls } from '../stories/controls/defaultControls.js';
import { debugTwoLayersThreePoints } from '../src/data_structures_examples/debug_TwoLayersThreePoints';
import {getPalindrome} from "../stories/controls/getPalindrome";

//output the default Storybook controls to the console
//console.log("Palindrome.js : default Storybook controls");
//console.dir(defaultControls())

/**
 * Return a json object including default configuration
 *
 * @param {object} object containing Storybok controls
 */

function controlsToConf (controls) {
    let defaultConfig = {};
    for (var key in controls) {
       defaultConfig[key] = controls[key].defaultValue;
    }
    //output the default configuration to the console
    console.log("Palindrome.js : default configuration");
    console.dir(defaultConfig);
    return defaultConfig;
}

const devConfig = controlsToConf(defaultControls());

//output the configuration in use to the console
console.log("Palindrome.js : configuration in use");
console.dir(devConfig);

//overwrite default parameters
devConfig.displayLabelsAll = false;
devConfig.labelSize = 16;
devConfig.layerMidColor = '#FF2C00';
devConfig.mainAppColor = '#f1c232';
devConfig.data = debugTwoLayersThreePoints();

//instanciate palindrome with configuration
getPalindrome(devConfig);
