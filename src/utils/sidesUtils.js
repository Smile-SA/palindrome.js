import {layerColorDecidedByLayerStatus} from "./colorsUtils";
import {SimpleLine, Triangle} from "../threeJSUtils/ThreeJSGeometryObjects";
import {createRenderOrderCounter} from "./cameraUtils";

/**
 * drawing sides lines
 * @param sideDividerEven
 * @param sideSizeEven
 * @param sideDividerOdd
 * @param sideSizeOdd
 * @param previousLayerStatus
 * @param conf
 * @param layerStatus
 * @param meshes
 * @param layer
 * @param lineMaterial
 * @param scene
 */
export function drawSideStraightLine(sideDividers, sideSizes, layerStatuses, conf, meshes, layer, lineMaterial, scene, gradients, layersColors) {
    let {sideDividerEven, sideDividerOdd} = sideDividers;
    let {sideSizeEven, sideSizeOdd} = sideSizes;
    let {previousLayerStatus, layerStatus} = layerStatuses; 
    let {lowValueGradient, highValueGradient, bicolorGradient} = gradients;
    let {layerColor, previousLayerColor} = layersColors;
    for (let i = 0; i < sideDividerEven; i++) {
        let a = sideSizeEven[(i + 1) % sideDividerOdd];
        let b = sideSizeOdd[(i + 1) % sideDividerEven];
        let c = sideSizeEven[(i) % sideDividerOdd];
        let d = sideSizeOdd[(i) % sideDividerEven];
        let colorA = previousLayerColor ? previousLayerColor : layerColorDecidedByLayerStatus(previousLayerStatus, conf, lowValueGradient, highValueGradient, layer);
        let colorB = layerColor ? layerColor : layerColorDecidedByLayerStatus(layerStatus, conf, lowValueGradient, highValueGradient, layer);
        if (meshes['side-straight-line' + layer + i]) {
            // if init done, update
            //meshes['side-bias-line' + layer + i].update(sideSizeOdd[i], a);
            meshes['side-straight-line' + layer + i].update(b, a, lineMaterial);
            meshes['side-straight-line1' + layer + i].update(d, c, lineMaterial);
            meshes['side-top-left-pane' + layer + i].update(c, a, d, colorA, colorB)
            meshes['side-bottom-right-pane' + layer + i].update(d, b, a, colorA, colorB);
        } else {
            //init objects
            //meshes['side-bias-line' + layer + i] = new SimpleLine(sideSizeOdd[i], a, lineMaterialTransparent);
            //scene.add(meshes['side-bias-line' + layer + i]);
            if (!meshes['meshRenderingOrder'] && conf.cameraOptions.indexOf("Flat") !== -1) {
                meshes['meshRenderingOrder'] = createRenderOrderCounter();
            }
            meshes['side-straight-line' + layer + i] = new SimpleLine(b, a, lineMaterial);
            meshes['side-straight-line1' + layer + i] = new SimpleLine(d, c, lineMaterial);
            meshes['side-top-left-pane' + layer + i] = new Triangle(c, a, d, colorA, colorB, null);            
            meshes['side-bottom-right-pane' + layer + i] = new Triangle(d, b, a, colorA, colorB, null);
            
            if(conf.cameraOptions.indexOf("Flat") !== -1) {
                meshes['side-straight-line' + layer + i].renderOrder = meshes['meshRenderingOrder']();
                meshes['side-straight-line1' + layer + i].renderOrder = meshes['meshRenderingOrder']();
                meshes['side-top-left-pane' + layer + i].renderOrder = meshes['meshRenderingOrder']();
                meshes['side-bottom-right-pane' + layer + i].renderOrder = meshes['meshRenderingOrder']();
            }
            scene.add(meshes['side-straight-line1' + layer + i]);
            scene.add(meshes['side-straight-line' + layer + i]);
            scene.add(meshes['side-top-left-pane' + layer + i]);
            scene.add(meshes['side-bottom-right-pane' + layer + i]);
        }
    }
}