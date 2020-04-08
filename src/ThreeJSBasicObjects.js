import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {CSS2DRenderer} from 'three-css2drender';
import {configuration} from './configuration';

function initCamera() {
	const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.set( 40, 40, 70 );
	return camera;
}

function initRenderer() {
	// if (configuration.displayArea === 'pallindrome') {

	// }
	let pallindromeDiv = document.getElementById("pallindrome");
	console.log('hello world');
	const renderer = new THREE.WebGLRenderer({antialias : true, alpha:true, transparent: true});
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.pallindromeDiv.appendChild( renderer.domElement );
	return renderer;
}

function initLabelsRenderer() {
	const pallindromeDiv = document.getElementById("pallindrome");
	const labelsRenderer = new CSS2DRenderer();
	labelsRenderer.setSize( window.innerWidth, window.innerHeight );
	labelsRenderer.domElement.style.position = 'absolute';
	labelsRenderer.domElement.style.top = 0;
	document.pallindromeDiv.appendChild( labelsRenderer.domElement );
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