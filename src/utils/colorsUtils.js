/**
 * Return the color corresponding to a given metric value
 *
 * @param {number} value
 * @param {*} conf current palindrome configuration
 */
export var layerColorDecidedByLayerStatus = function (value, conf) {
    let intValue = value.toFixed(0);
    let layerStatusColor = conf.statusColorLow;
    if (conf.layerBehavior === 'ranges') {
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
        if (intValue >= conf.statusRangeLow && intValue < conf.statusRangeMed) {
            return conf.mainStaticColor;
        } else if (intValue >= conf.statusRangeMed && intValue < conf.statusRangeHigh) {
            return adjustHEXLightness(conf.mainStaticColor, -100);
        } else if (intValue >= conf.statusRangeHigh) {
            return adjustHEXLightness(conf.mainStaticColor, -200);
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
export var metricColor = function (value, conf) {
    let cur = value.current;
    let max = value.max;
    let color = conf.sphereColorLow;
    let percentageThreshold = ((cur / max) * 100).toFixed(0);
    if (conf.spheresBehavior === 'ranges') {
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
        if (percentageThreshold >= conf.statusRangeLow && percentageThreshold < conf.statusRangeMed) {
            return conf.mainStaticColor;
        } else if (percentageThreshold >= conf.statusRangeMed && percentageThreshold < conf.statusRangeHigh) {
            return adjustHEXLightness(conf.mainStaticColor, -100);
        } else if (percentageThreshold >= conf.statusRangeHigh) {
            return adjustHEXLightness(conf.mainStaticColor, -200);
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