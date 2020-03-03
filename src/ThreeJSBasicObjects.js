import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {CSS2DRenderer} from 'three-css2drender';

function initCamera() {
	const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.set( 50, 50, 150 );
	return camera;
}

function initRenderer() {
	const renderer = new THREE.WebGLRenderer({antialias : true, alpha:true, transparent: true});
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	return renderer;
}

function initLabelsRenderer() {
	const labelsRenderer = new CSS2DRenderer();
	labelsRenderer.setSize( window.innerWidth, window.innerHeight );
	labelsRenderer.domElement.style.position = 'absolute';
	labelsRenderer.domElement.style.top = 0;
	document.body.appendChild( labelsRenderer.domElement );
	return labelsRenderer;	
}

function initControls(camera, labelsRenderer) {
	return new OrbitControls(camera, labelsRenderer.domElement);
}

function initScene() {
	const scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xffffff);
	return scene;
}

export function initThreeObjects() {
	const scene = initScene();
	const camera = initCamera();
	const renderer = initRenderer();
	const labelsRenderer = initLabelsRenderer();
	const controls = initControls(camera, labelsRenderer);

	window.addEventListener( 'resize', function() {
		const width = window.innerWidth;
		const height = window.innerHeight;
		renderer.setSize( width, height);
		labelsRenderer.setSize( width, height);
		camera.aspect = width / height;
		camera.updateProjectionMatrix( );
	});
	return { scene, labelsRenderer, controls, renderer, camera};
}