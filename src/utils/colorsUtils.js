/**
 * Return the color corresponding to a given metric value
 *
 * @param {number} value
 * @param {*} conf current palindrome configuration
 */

export var layerColorDecidedByLayerStatus = function (value, conf, lowValueGradient, highValueGradient, bicolorGradient) {
    let intValue = value.toFixed(0);
    let layerStatusColor = conf.statusColorLow;
    if (conf.layerBehavior === 'ranges') {
        if(conf.bicolorDisplay){
            return intValue < conf.statusRangeMed ? conf.statusColorLow : conf.statusColorHigh
        }
        if (intValue >= conf.statusRangeLow && intValue < conf.statusRangeMed) {
            return layerStatusColor;
        } else if (intValue >= conf.statusRangeMed && intValue < conf.statusRangeHigh) {
            layerStatusColor = conf.statusColorMed;
            return layerStatusColor;
        } else if (intValue >= conf.statusRangeHigh) {
            layerStatusColor = conf.statusColorHigh;
            return layerStatusColor;
        }
    } else if (conf.layerBehavior === 'static') {
        return conf.mainStaticColor;
    } else if (conf.layerBehavior === 'dynamic') {
        if (conf.bicolorDisplay) {
            let step = (conf.statusRangeHigh - conf.statusRangeLow) / conf.colorSteps;
            let baseValue = conf.statusRangeLow;
    
            //select an index to take a color depending of the value given and return it
            let index = Math.min(Math.floor((intValue - baseValue) / step), conf.colorShadesDepth);
            return bicolorGradient[index];
    } else {
        if(conf.dynamicColorShades){
            //take the difference between the statuses and devide it by 1 if the statusColorBehavior is static, 100 if dynamic
            const lowStep = (conf.statusRangeMed - conf.statusRangeLow) / conf.colorShadesDepth;
            const highStep = (conf.statusRangeHigh - conf.statusRangeMed) / conf.colorShadesDepth;
        
            let colorArray;
            let step;
            let baseValue;
        
            //create multiples colors in between the two status colors
            if (intValue >= conf.statusRangeLow && intValue < conf.statusRangeMed) {
                colorArray = lowValueGradient;
                step = lowStep;
                baseValue = conf.statusRangeLow;
            } else if (intValue >= conf.statusRangeMed) {
                colorArray = highValueGradient;
                step = highStep;
                baseValue = conf.statusRangeMed;
            }
            //select an index to take a color depending of the value given and return it
            let index = Math.min(Math.floor((intValue - baseValue) / step), conf.colorShadesDepth);
            return colorArray[index];
    }
        }

        if (intValue >= conf.statusRangeLow && intValue < conf.statusRangeMed) {
            return conf.statusColorLow;
        } else if (intValue >= conf.statusRangeMed && intValue < conf.statusRangeHigh) {
            return conf.statusColorMed;
        } else if (intValue >= conf.statusRangeHigh) {
            return conf.statusColorHigh;
        }

    } else if (conf.layerBehavior === 'dynamicRanges') {
        let dynamicRangesColor1RGB = hexToRgb(conf.dynamicRangesColor1);
        let dynamicRangesColor2RGB = hexToRgb(conf.dynamicRangesColor2);
        let redDistance = -(dynamicRangesColor1RGB.r - dynamicRangesColor2RGB.r),
            greenDistance = -(dynamicRangesColor1RGB.g - dynamicRangesColor2RGB.g),
            blueDistance = -(dynamicRangesColor1RGB.b - dynamicRangesColor2RGB.b);
        if (intValue >= conf.statusRangeLow && intValue < conf.statusRangeMed) {
            return conf.dynamicRangesColor1;
        } else if (intValue >= conf.statusRangeMed && intValue < conf.statusRangeHigh) {
            return rgbToHex(dynamicRangesColor1RGB.r + parseInt((redDistance / 2).toFixed(0)), dynamicRangesColor1RGB.g + parseInt((greenDistance / 2).toFixed(0)), dynamicRangesColor1RGB.b + parseInt((blueDistance / 2).toFixed(0)));
        } else if (intValue >= conf.statusRangeHigh) {
            return conf.dynamicRangesColor2;
        }
    }
}


/**
 * Get sphere color based on its current value
 *
 * @param {number} value sphere current value
 * @param conf current palindrome configuration
 */
export var metricColor = function (value, conf, lowValueGradient, highValueGradient, bicolorGradient) {
    let cur = value.current;
    let max = value.max;
    let color = conf.sphereColorLow;
    let percentageThreshold = ((cur / max) * 100).toFixed(0);
    if (conf.spheresBehavior === 'ranges') {
        if(conf.bicolorDisplay){
            return percentageThreshold < conf.statusRangeMed ? conf.statusColorLow : conf.statusColorHigh
        }
        if (percentageThreshold >= conf.statusRangeLow && percentageThreshold < conf.statusRangeMed) {
            return color;
        } else if (percentageThreshold >= conf.statusRangeMed && percentageThreshold < conf.statusRangeHigh) {
            color = conf.sphereColorMed;
            return color;
        } else if (percentageThreshold >= conf.statusRangeHigh) {
            color = conf.sphereColorHigh;
            return color;
        }
    } else if (conf.spheresBehavior === 'static') {
        return conf.mainStaticColor;
    } else if (conf.spheresBehavior === 'dynamic') {
        if(conf.dynamicColorShades){
            if (conf.bicolorDisplay) {
                let step = (conf.statusRangeHigh - conf.statusRangeLow) / conf.colorShadesDepth;
                let baseValue = conf.statusRangeLow;
        
                //select an index to take a color depending of the value given and return it
                let index = Math.min(Math.floor((percentageThreshold - baseValue) / step), conf.colorShadesDepth);
                return bicolorGradient[index];
            } else {
                const lowStep = (conf.statusRangeMed - conf.statusRangeLow) / conf.colorShadesDepth;
                const highStep = (conf.statusRangeHigh - conf.statusRangeMed) / conf.colorShadesDepth;
            
                let colorShadesDepth;
                let step;
                let baseValue;
            
                if (percentageThreshold >= conf.statusRangeLow && percentageThreshold < conf.statusRangeMed) {
                    colorShadesDepth = lowValueGradient;
                    step = lowStep;
                    baseValue = conf.statusRangeLow;
                } else if (percentageThreshold >= conf.statusRangeMed) {
                    colorShadesDepth = highValueGradient;
                    step = highStep;
                    baseValue = conf.statusRangeMed;
                }
            
                let index = Math.min(Math.floor((percentageThreshold - baseValue) / step), conf.colorShadesDepth);
                return colorShadesDepth[index];
            } 
    } else {
        if(conf.bicolorDisplay){
            return percentageThreshold < conf.statusRangeMed ? conf.statusColorLow : conf.statusColorHigh
        } else {
            if (percentageThreshold >= conf.statusRangeLow && percentageThreshold < conf.statusRangeMed) {
                return color;
            } else if (percentageThreshold >= conf.statusRangeMed && percentageThreshold < conf.statusRangeHigh) {
                color = conf.sphereColorMed;
                return color;
            } else if (percentageThreshold >= conf.statusRangeHigh) {
                color = conf.sphereColorHigh;
                return color;
            }
        }

    }
}
}


/**
 * Lighten or darken colors by amount
 *
 * @param {string} color
 * @param {number} amount
 */
function adjustHEXLightness(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
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

export function gradient(startColor, endColor, steps) {
    var start = {
        'Hex' : startColor,
        'R' : parseInt(startColor.slice(1,3), 16),
        'G' : parseInt(startColor.slice(3,5), 16),
        'B' : parseInt(startColor.slice(5,7), 16)
    }
    var end = {
        'Hex' : endColor,
        'R' : parseInt(endColor.slice(1,3), 16),
        'G' : parseInt(endColor.slice(3,5), 16),
        'B' : parseInt(endColor.slice(5,7), 16)
    }
    let diffR = end['R'] - start['R'];
    let diffG = end['G'] - start['G'];
    let diffB = end['B'] - start['B'];
    let stepsHex = new Array();
    let stepsR = new Array();
    let stepsG = new Array();
    let stepsB = new Array();
    for(var i = 0; i <= steps; i++) {
        stepsR[i] = start['R'] + ((diffR / steps) * i);
        stepsG[i] = start['G'] + ((diffG / steps) * i);
        stepsB[i] = start['B'] + ((diffB / steps) * i);
        stepsHex[i] = '#' + Math.round(stepsR[i]).toString(16).padStart(2, '0') + '' +
        Math.round(stepsG[i]).toString(16).padStart(2, '0') + '' + Math.round(stepsB[i]).toString(16).padStart(2, '0');
    }
    return stepsHex;
}

