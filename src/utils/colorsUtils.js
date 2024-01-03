/**
 * Gets color gradients
 * @param {*} conf palindrome configuration
 * @returns low and high color gradients
 */
export const getColorGradients = (conf) => {
    const lowValueGradient = gradient(conf.statusColorLow, conf.statusColorMed, conf.colorShadesDepth);
    const highValueGradient = gradient(conf.statusColorMed, conf.statusColorHigh, conf.colorShadesDepth);
    return { lowValueGradient, highValueGradient };
};

/**
 * Return the color corresponding to a given metric value
 *
 * @param {number} value
 * @param {*} conf current palindrome configuration
 */
export var layerColorDecidedByLayerStatus = function (value, conf) {
    const { lowValueGradient, highValueGradient } = getColorGradients(conf);
    let intValue = value.toFixed(0);
    
    const data = conf.data;
    const {layerColorHigh, layerColorLow, layerColorMed, mainColorStatic} = data[layer].layer[`${layer}-layer`];
    const lowColor = layerColorLow ? layerColorLow : conf.statusColorLow;
    const medColor = layerColorMed ? layerColorMed : conf.statusColorMed;
    const highColor = layerColorHigh ? layerColorHigh : conf.statusColorHigh;
    const staticColor = mainColorStatic ? mainColorStatic : conf.mainStaticColor;

    
    if(conf.bicolorDisplay){
        return intValue < conf.statusRangeMed ? lowColor : highColor;
    }
    let layerStatusColor = conf.statusColorLow;
    if (conf.colorsBehavior === 'ranges') {
        if (intValue >= conf.statusRangeLow && intValue < conf.statusRangeMed) {
            return lowColor;
        } else if (intValue >= conf.statusRangeMed && intValue < conf.statusRangeHigh) {
            return medColor;
        } else if (intValue >= conf.statusRangeHigh) {
            return highColor;
        }
    } 
    else if (conf.colorsBehavior === 'static') {
        return conf.mainStaticColor;
    } 
    else if (conf.colorsBehavior === 'dynamic') {
        //take the difference between the statuses and devide it by 1 if the statusColorBehavior is static, 100 if dynamic
        const lowStep = (conf.statusRangeMed - conf.statusRangeLow) / conf.colorsDynamicDepth;
        const highStep = (conf.statusRangeHigh - conf.statusRangeMed) / conf.colorsDynamicDepth;

        let colorArray;
        let step;
        let baseValue;

        //create multiples colors in between the two status colors
        if (intValue >= conf.statusRangeLow && intValue < conf.statusRangeMed) {
            colorArray = lowValueGradient;
            step = lowStep;
            baseValue = conf.statusRangeLow;
        }
        else if (intValue >= conf.statusRangeMed) {
            colorArray = highValueGradient;
            step = highStep;
            baseValue = conf.statusRangeMed;
        }
        //select an index to take a color depending of the value given and return it
        let index = Math.min(Math.floor((intValue - baseValue) / step), conf.colorsDynamicDepth);
        return colorArray[index];

    }
}


/**
 * Get sphere color based on its current value
 *
 * @param {number} value sphere current value
 * @param conf current palindrome configuration
 */
export var metricColor = function (value, conf) {
    const { lowValueGradient, highValueGradient } = getColorGradients(conf);
    let color = conf.sphereColorLow;
    let percentageThreshold = ((value.current - value.min) * 100 / (value.max - value.min)).toFixed(0);
    if (conf.spheresBehavior === 'ranges') {
        if(conf.bicolorDisplay){
            return percentageThreshold < conf.statusRangeMed ? biColorLow : biColorHigh;
        }
        if (percentageThreshold >= conf.statusRangeLow && percentageThreshold < conf.statusRangeMed) {
            return lowColor;
        } else if (percentageThreshold >= conf.statusRangeMed && percentageThreshold < conf.statusRangeHigh) {
            return medColor;
        } else if (percentageThreshold >= conf.statusRangeHigh) {
            return highColor;
        }
    } else if (conf.spheresColorsBehavior === 'static') {
        return conf.mainStaticColor;
    } else if (conf.spheresColorsBehavior === 'dynamic') {

        const lowStep = (conf.statusRangeMed - conf.statusRangeLow) / conf.colorsDynamicDepth;
        const highStep = (conf.statusRangeHigh - conf.statusRangeMed) / conf.colorsDynamicDepth;
    
        let colorsDynamicDepth;
        let step;
        let baseValue;

        if (percentageThreshold >= conf.statusRangeLow && percentageThreshold < conf.statusRangeMed) {
            colorsDynamicDepth = lowValueGradient;
            step = lowStep;
            baseValue = conf.statusRangeLow;
        } else if (percentageThreshold >= conf.statusRangeMed) {
            colorsDynamicDepth = highValueGradient;
            step = highStep;
            baseValue = conf.statusRangeMed;
        }
    
        let index = Math.min(Math.floor((percentageThreshold - baseValue) / step), conf.colorsDynamicDepth);
        return colorsDynamicDepth[index];
    }
}

/**
 * Converting hexValueToRGB
 * @param hex
 * @returns {{r: number, b: number, g: number}|null}
 */
export function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16)
    } : null;
}

/**
 * Utility to convert rgb to hex
 * @param c
 * @returns {string|string}
 */
export function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

/**
 * Converting rgb value to hex
 * @param r
 * @param g
 * @param b
 * @returns {string}
 */
export function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/**
 * Creates a gradient color from startColor to endColor using a number of steps
 * @param {*} startColor the first color
 * @param {*} endColor the second color
 * @param {*} steps the steps between the two colors
 * @returns 
 */
export function gradient(startColor, endColor, steps) {
    var start = {
        'Hex': startColor,
        'R': parseInt(startColor.slice(1, 3), 16),
        'G': parseInt(startColor.slice(3, 5), 16),
        'B': parseInt(startColor.slice(5, 7), 16)
    }
    var end = {
        'Hex': endColor,
        'R': parseInt(endColor.slice(1, 3), 16),
        'G': parseInt(endColor.slice(3, 5), 16),
        'B': parseInt(endColor.slice(5, 7), 16)
    }
    let diffR = end['R'] - start['R'];
    let diffG = end['G'] - start['G'];
    let diffB = end['B'] - start['B'];
    let stepsHex = new Array();
    let stepsR = new Array();
    let stepsG = new Array();
    let stepsB = new Array();
    for (var i = 0; i <= steps; i++) {
        stepsR[i] = start['R'] + ((diffR / steps) * i);
        stepsG[i] = start['G'] + ((diffG / steps) * i);
        stepsB[i] = start['B'] + ((diffB / steps) * i);
        stepsHex[i] = '#' + Math.round(stepsR[i]).toString(16).padStart(2, '0') + '' +
            Math.round(stepsG[i]).toString(16).padStart(2, '0') + '' + Math.round(stepsB[i]).toString(16).padStart(2, '0');
    }
    return stepsHex;
}

/**
 * Match color with opacity
 * @param {*} color the color to test
 * @param {*} colorRanges color ranges available
 * @param {*} conf current config
 * @returns opacity value
 */
export function getColorOpacityBasedOnRanges(color, colorRanges, conf) {
    const {highColor, medColor, lowColor} = colorRanges;
    if (color === highColor) {
        return conf.transparencyHigh;
    } else if (color === medColor) {
        return conf.transparencyMed;
    } else if (color === lowColor) {
        return conf.transparencyLow;
    }
}

