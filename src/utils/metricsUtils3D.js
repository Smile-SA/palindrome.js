/**
 * Return a 3d point from polar coordinates in the z plane
 *
 * @param {number} angle
 * @param {number} radius
 * @param {number} zPlaneValue
 */
export var polarTo3DPoint = function (angle, radius, zPlaneValue) {
    return [radius * Math.cos(angle), radius * Math.sin(angle), zPlaneValue];
}