import palindrome from '../src/index';
import { defaultControls } from '../stories/controls/default_controls.js';
import { debugTwoLayersThreePoints } from '../src/data_structures_examples/debug_TwoLayersThreePoints';

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
devConfig.labelSize = 18;
devConfig.layerMidColor = '#FF2C00';
devConfig.mainAppColor = '#f1c232';
devConfig.data = debugTwoLayersThreePoints();

//instanciate palindrome with configuration
const container = document.getElementById('palindrome');
palindrome(container, JSON.parse(JSON.stringify(devConfig)));

