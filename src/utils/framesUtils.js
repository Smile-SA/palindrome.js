import {drawLayerDashLine, drawLayerOutline} from './layersUtils';
import {Triangle} from '../threeJSUtils/ThreeJSGeometryObjects';
import {layerPoints} from "./metricsUtils2D";


let time = 0;
export var animateFrameDashedLine = function (meshs, clock) {
    for (const [key, value] of Object.entries(meshs)) {
        if (key.includes("_rangeDasheline")) {
            time += clock.getDelta() * 3;
            meshs[key].material.uniforms.time.value = time;
        }
    }
}


/**
 * Draw a frame in a plane (layer)
 * @param {[]} framePoints frame points position
 * @param {string} frameName frame name
 * @param globalParams parameters used to draw frames
 */
export var drawFrames = function (framePoints, frameName, globalParams) {
    let {conf, scene, meshs, dashLineMaterial, lineMaterial} = globalParams;
    // card around metrics
    for (let i = 0; i < framePoints[0].length; i++) {
        for (let [index, point] of framePoints.entries()) {
            //draws outside lines
            if (conf.frameDashLineSize > 0) {
                drawLayerDashLine(frameName, point, i, framePoints[0].length, dashLineMaterial, index, scene, meshs, conf)
            } else {
                let globalParams = {meshs, scene};
                drawLayerOutline(frameName, point, i, framePoints[0].length, lineMaterial, index, globalParams);
            }
        }
    }
}


/** Draw a frame background
 * @param {[]} framePoints frame points position
 * @param {string} frameName frame name
 * @param {string} backgroundColor frame background color
 * @param {int} opacity frame opacity
 * @param globalParams parameters used to draw frames background
 */
export var drawFramesBackground = function (framePoints, frameName, backgroundColor, opacity, globalParams) {
    let {meshs, scene} = globalParams;
    let j = 0
    for (let i = 0; i < framePoints.length; i++) {
        if (framePoints[j + 1]) {
            if (framePoints[j + 2]) {
                let a = [framePoints[0][0], framePoints[0][1], framePoints[0][2] - 0.005];
                let b = [framePoints[j + 1][0], framePoints[j + 1][1], framePoints[j + 1][2] - 0.005];
                let c = [framePoints[j + 2][0], framePoints[j + 2][1], framePoints[j + 2][2] - 0.005];
                if (meshs['side-top-left-pane' + frameName + i]) {
                    meshs['side-top-left-pane' + frameName + i].update(a, b, c);
                    meshs['side-bottom-right-pane' + frameName + i + 1].update(a, b, c);
                } else {
                    meshs['side-top-left-pane' + frameName + i] = new Triangle(a, b, c, backgroundColor, null, opacity);
                    scene.add(meshs['side-top-left-pane' + frameName + i]);
                    meshs['side-bottom-right-pane' + frameName + i + 1] = new Triangle(a, b, c, backgroundColor, null, opacity);
                    scene.add(meshs['side-bottom-right-pane' + frameName + i + 1]);
                }
                j = i + 1;
            }
        }
    }
}

/**
 * sets the position of the arrow of the frame
 * @param conf
 * @param positions
 * @param arrowPositions
 * @param layersLabels
 */
export function setArrowPostion(conf, positions, arrowPositions, layersLabels) {
    // set arrow position
    if (conf.displayLayersLabels) {
        let x = positions[positions.length - 1][0],
            z = positions[positions.length - 1][1],
            y = positions[positions.length - 1][2];
        arrowPositions.push([x, z, y]);
        if (conf.layersLabelsOrientation === "Sticky") {
            arrowPositions.push([x, z - (4 * conf.framePadding), y]);
            // set layer label position
            layersLabels.position.set(x, y + 0.5, z - (4 * conf.framePadding));
        } else if (conf.layersLabelsOrientation === "Free") {
            arrowPositions.push([x, z - (4 * conf.framePadding), y + conf.framePadding]);
            // set layer label position
            layersLabels.position.set(x, y + conf.framePadding, z - (4 * conf.framePadding));
        }
    }
}

/**
 * sets the rectangle frame position
 * @param positions
 * @param xTab
 * @param yTab
 * @param zTab
 * @param layersLabels
 * @param conf
 * @param arrowPositions
 * @param resize
 */
export function setRectangleFramePositions(positions, xTab, yTab, zTab, layersLabels, conf, arrowPositions, resize, layerIndex) {
    // create rectangle frame positions
    positions.push([Math.max.apply(Math, xTab) + (conf.framePadding * conf.framePadding), Math.max.apply(Math, yTab) + (conf.framePadding * conf.framePadding), Math.max.apply(Math, zTab)]);
    positions.push([Math.max.apply(Math, xTab) + (conf.framePadding * conf.framePadding), Math.min.apply(Math, yTab) - (conf.framePadding * conf.framePadding), Math.max.apply(Math, zTab)]);
    positions.push([Math.min.apply(Math, xTab) - (conf.framePadding * conf.framePadding), Math.min.apply(Math, yTab) - (conf.framePadding * conf.framePadding), Math.max.apply(Math, zTab)]);
    positions.push([Math.min.apply(Math, xTab) - (conf.framePadding * conf.framePadding), Math.max.apply(Math, yTab) + (conf.framePadding * conf.framePadding), Math.max.apply(Math, zTab)]);
    // set arrow position
    if (layersLabels != null && xTab.length > 0 && yTab.length > 0 && zTab.length > 0 && conf.displayLayersLabels) {
        arrowPositions.push([(Math.max.apply(Math, xTab) + (conf.framePadding * conf.framePadding)), 0, Math.min.apply(Math, zTab)]);
        if (conf.sideLabelDisplay) {
            conf.displayLabelLine = false;
        }
        if (conf.layersLabelsOrientation === "Sticky") {
            arrowPositions.push([(Math.max.apply(Math, xTab) + (conf.framePadding * conf.framePadding)) * conf.framePadding, 0, Math.max.apply(Math, zTab)]);
            layersLabels.position.set((Math.max.apply(Math, xTab) + conf.framePadding) + 5, Math.max.apply(Math, zTab) + (resize), Math.min.apply(Math, yTab) - 5);
            if (conf.sideLabelDisplay) {
                layersLabels.position.set((Math.max.apply(Math, xTab) + conf.framePadding) + 5, Math.max.apply(Math, zTab) + (resize), Math.min.apply(Math, yTab) - 5);
            }
        } else if (conf.layersLabelsOrientation === "Free") {
            arrowPositions.push([(Math.max.apply(Math, xTab) + (conf.framePadding * conf.framePadding)) * conf.framePadding, 0, Math.max.apply(Math, zTab) + (conf.framePadding * conf.framePadding)]);
            layersLabels.position.set((Math.max.apply(Math, xTab) + conf.framePadding) + 5, Math.max.apply(Math, zTab) + (conf.framePadding * conf.framePadding), Math.min.apply(Math, yTab) - 5);
            if (conf.sideLabelDisplay) {
                layersLabels.position.set((Math.max.apply(Math, xTab) + conf.framePadding) + 5, Math.max.apply(Math, zTab) + (conf.framePadding * conf.framePadding), Math.min.apply(Math, yTab) - 5);
            }
        } 
        if (conf.cameraOptions.indexOf("Flat") !== -1) {
            conf.displayLabelLine = false;
            layersLabels.position.set((Math.max.apply(Math, xTab) + (conf.framePadding * conf.framePadding)), Math.max.apply(Math, zTab) + (resize), layerIndex * conf.framePadding);
        }
    }
}

/**
 * display or not the frames and the arrows
 * @param conf
 * @param positions
 * @param frameName
 * @param dashLineMaterial
 * @param lineMaterial
 * @param meshes
 * @param scene
 * @param arrowPositions
 * @param layer
 */
export function displayFramesAndArrows(conf, positions, frameName, dashLineMaterial, lineMaterial, meshes, scene, arrowPositions, layer) {
    if (conf.displayFrames) {
        // display frame line
        if (conf.displayFramesLine) {
            let globalParams = {conf, scene, meshs: meshes, dashLineMaterial, lineMaterial};
            drawFrames([positions], frameName, globalParams);
        }
        // display frame background
        if (conf.displayFramesBackground) {
            let globalParams = {scene, meshs: meshes};
            drawFramesBackground(positions, frameName, conf.frameBackgroundColor, conf.frameOpacity, globalParams);
        }
        // display arrow Line
        if (conf.displayLabelLine) {
            let globalParams = {conf, scene, meshs: meshes, dashLineMaterial, lineMaterial};
            drawFrames([arrowPositions], layer + '_arrow', globalParams);
        }
    }
}