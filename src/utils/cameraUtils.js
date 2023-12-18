import * as THREE from 'three';

/**
 * Camera view options
 * @param {*} meshes three.js mesh
 * @param camera
 * @param conf
 */

export var cameraViewOptions = function (meshes, camera, conf) {

    let tabX = [],
        tabY = [],
        tabZ = [];

    //get min fov
    let vFoV = camera.getEffectiveFOV(),
        hFoV = camera.fov * camera.aspect,
        FoV = Math.min(vFoV, hFoV) / 2;

    //get the center of position of objects
    for (let key in meshes) {
        if (!key.includes("_text") && !key.includes("_group"))
            if (meshes[key].visible) {
                let object = meshes[key];
                object.geometry.computeBoundingSphere();
                let bs = object.geometry.boundingSphere;
                let vector = bs.center.clone();
                tabX.push(vector.x);
                tabY.push(vector.y);
                tabZ.push(vector.z);
            }
    }
    
    // calculate the center of objects
    let xMax = (Math.max.apply(Math, tabX)),
        xMin = (Math.min.apply(Math, tabX)),
        yMax = (Math.max.apply(Math, tabY)),
        yMin = (Math.min.apply(Math, tabY)),
        zMax = (Math.max.apply(Math, tabZ)),
        zMin = (Math.min.apply(Math, tabZ));

    let cameraDir = new THREE.Vector3(),
        centerMaxVector = new THREE.Vector3(xMax, yMax, zMax),
        centerMinVector = new THREE.Vector3(xMin, yMin, zMax),
        dis = centerMaxVector.distanceTo(centerMinVector),
        sin = Math.sin(FoV * Math.PI / 160);
    if (dis < 36) {
        dis = 36
    }
    const grafanaZoom = conf?.grafanaZoom??1;
    let scale = dis / (grafanaZoom * sin);
    // calculate the center of objects
    if (conf.cameraOptions.indexOf("Fit") !== -1) {
        camera.getWorldDirection(cameraDir);
        let cameraOffs = cameraDir.clone();
        cameraOffs.multiplyScalar(-scale);
        let newCameraPos = centerMaxVector.clone().add(cameraOffs);
        camera.position.copy(newCameraPos);
    }
    if (conf.cameraOptions.indexOf("Top") !== -1) {
        // set camera position
        camera.position.set(0, scale, 0);
        camera.lookAt(0, 0, 0);
    }
    if (conf.cameraOptions.indexOf("Flat") !== -1) {
        conf.zPlaneMultilayer = 0;
    }

}

/**
 * A function that returns that increments the rendering order by one every time it being called
 * @returns rendering order
 */
export const createRenderOrderCounter = () => {
    let staticVariable = 0;
  
    return function() {
      staticVariable++;
      return staticVariable;
    };
}