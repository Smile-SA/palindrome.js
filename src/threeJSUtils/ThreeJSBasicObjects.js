import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {CSS2DRenderer} from "three/examples/jsm/renderers/CSS2DRenderer";

/**
 * Creates and intializes the camera
 */
function initCamera(conf) {
    let camera;
    if (conf.innerWidth > 0 && conf.innerHeight > 0) {
        camera = new THREE.PerspectiveCamera(45, conf.innerWidth / conf.innerHeight, 1, 5000);
    } else {
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000);
    }
    camera.position.set(50, 40, 70);
    return camera;
}

function initRenderer(conf) {
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        transparent: true,
        powerPreference: "high-performance",
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    if (conf.innerWidth > 0 && conf.innerHeight > 0) {
        renderer.setSize(conf.innerWidth, conf.innerHeight);
        return renderer;
    }
    renderer.setSize(window.innerWidth, window.innerHeight);

    return renderer;
}

function initLabelsRenderer() {
    const labelsRenderer = new CSS2DRenderer();
    labelsRenderer.setSize(window.innerWidth, window.innerHeight);
    labelsRenderer.domElement.style.position = 'absolute';
    labelsRenderer.domElement.style.top = 0;
    return labelsRenderer;
}

function initControls(camera, labelsRenderer) {
    return new OrbitControls(camera, labelsRenderer.domElement);
}

function initScene(conf) {
    const scene = new THREE.Scene();
    if (conf.isDarkGrafana) {
        scene.background = new THREE.Color(conf.grafanaColor);
    }
    else {
        scene.background = new THREE.Color(0xffffff);
    }
    return scene;
}


export function initThreeObjects(conf) {
    const scene = initScene(conf);
    const camera = initCamera(conf);
    const renderer = initRenderer(conf);
    const labelsRenderer = initLabelsRenderer();
    const controls = initControls(camera, labelsRenderer);


    window.addEventListener('resize', function () {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        labelsRenderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    return {
        scene,
        labelsRenderer,
        controls,
        renderer,
        camera
    };
}


export function sphereHoverInit(meshs, camera, scene, conf) {
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    var hoveredObjects = {};
    window.addEventListener('mousemove',
        function (event) {

            event.preventDefault();

            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            var intersects = raycaster.intersectObjects(scene.children, true);
            var hoveredObjectUuids = intersects.filter(e => e.object.name.includes("_sphereHoverRegion")).map(el => el.object.uuid);
            for (var i = 0; i < intersects.length; i++) {

                if (intersects[i].object.name.includes("_sphereHoverRegion")) {
                    let name = intersects[i].object.name;
                    name = name.replace('_sphereHoverRegion', '_text');
                    var hoveredObj = intersects[i].object;
                    meshs[name].visible = true;
                    if (conf.metricsLabelsRenderingMode === "2D") {
                        meshs[name].element.style.display = "";
                    }
                    if (hoveredObjects[hoveredObj.uuid]) {
                        continue; // this object was hovered and still hovered
                    }
                    hoveredObjects[hoveredObj.uuid] = hoveredObj;


                }

            }

            for (let uuid of Object.keys(hoveredObjects)) {
                let idx = hoveredObjectUuids.indexOf(uuid);
                if (idx === -1) {
                    // object with given uuid was unhovered
                    let unhoveredObj = hoveredObjects[uuid];
                    let name = unhoveredObj.name;
                    name = name.replace('_sphereHoverRegion', '_text');
                    if (meshs[name]) {
                        meshs[name].visible = false;
                        if (conf.metricsLabelsRenderingMode === "2D") {
                            meshs[name].element.style.display = "none";
                        }
                    }


                    delete hoveredObjects[uuid];

                }
            }
        }
    );
}

/**
 * Adds a grid at Z = 0
 *
 * @param {number} size  (conf.gridSize)
 * @param {number} divisions (conf.gridDivisions)
 */
export var displayGrid = function (size, divisions, scene) {
    let gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);
}