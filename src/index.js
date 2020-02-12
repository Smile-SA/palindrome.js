import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {CSS2DRenderer, CSS2DObject} from 'three-css2drender';
import {Triangle, SimpleLine} from './ThreeBasicObjects';
import { dataGenerator } from './mockupData';

const myRequest = new Request("data.json");

fetch(myRequest)
	.then(resp => resp.json())
	.then(data => render(data));



function initScene() {

	const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.set( 10, -230, 150 );
	
	const renderer = new THREE.WebGLRenderer({antialias : true});
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	
	window.addEventListener( 'resize', function() {
		const width = window.innerWidth;
		const height = window.innerHeight;
		renderer.setSize( width, height);
		labelRenderer.setSize( width, height);
		camera.aspect = width / height;
		camera.updateProjectionMatrix( );
	});

	const labelRenderer = new CSS2DRenderer();
	labelRenderer.setSize( window.innerWidth, window.innerHeight );
	labelRenderer.domElement.style.position = 'absolute';
	labelRenderer.domElement.style.top = 0;
	document.body.appendChild( labelRenderer.domElement );
	
	const controls = new OrbitControls(camera, labelRenderer.domElement);
	//controls.autoRotate = true;
	controls.autoRotateSpeed = 5;
	controls.minPolarAngle = 2;
	//controls.minAzimuthAngle = Math.PI;
	//controls.maxPolarAngle = 12;
	//controls.target = new THREE.Vector3(1,0,1); //15, 5, 15
		
	const scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xf0f0f0 );
	const axesHelper = new THREE.AxesHelper(30);
	scene.add(axesHelper);

	const transparentGeometry = new THREE.PlaneGeometry( 5, 5 ,0 );
	const transparentPlaneMaterial = new THREE.MeshBasicMaterial( {color: 0xA8A8A8, transparent: true, opacity: 0.5, side: THREE.DoubleSide} );
	const transparentPlane = new THREE.Mesh( transparentGeometry, transparentPlaneMaterial);
	scene.add(transparentPlane);

	return { scene, labelRenderer, controls, renderer, camera, transparentPlaneMaterial };
}

const { scene, labelRenderer, controls, renderer, camera } = initScene();

function readyToExecute (data) {
	(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()
	
	const dataIterator = dataGenerator(data);
	const nextData = dataIterator.next().value;
	//console.log(nextData)
	const { qoeMetrics, systemMetrics } = nextData;
	
	
	const dataValueSystemMetricsMax = Object.values(systemMetrics).map(e => e.max / e.current);
	const dataValueSystemMetricsMed = Object.values(systemMetrics).map(e => e.med / e.current);
	const dataValueSystemMetricsMin = Object.values(systemMetrics).map(e => e.min / e.current);

	const dataTitleSystemMetrics = Object.keys(systemMetrics);
	const dataTitleQoeMetrics = Object.keys(qoeMetrics);

	const dataValueQoeMetricsMax = Object.values(qoeMetrics).map(e => e.max / e.current);
	const dataValueQoeMetricsMed = Object.values(qoeMetrics).map(e => e.med / e.current);
	const dataValueQoeMetricsMin = Object.values(qoeMetrics).map(e => e.min / e.current);
	
	const lineMaterial = createLineMaterial(0x000000, 1); //0xfffff
	const transparentLineMaterial = createLineMaterial(0x000000, 0);
	
	const planeTopPointsMax = metricPoint(dataValueSystemMetricsMax, 20);
	const planeTopPointsMed = metricPoint(dataValueSystemMetricsMed, 20);
	const planeTopPointsMin = metricPoint(dataValueSystemMetricsMin, 20);

	const planeBottomPointsMax = metricPoint(dataValueQoeMetricsMax, -20);
	const planeBottomPointsMed = metricPoint(dataValueQoeMetricsMed, -20);
	const planeBottomPointsMin = metricPoint(dataValueQoeMetricsMin, -20);

	const numberOfMetricesInTopLayer = planeTopPointsMax.length;
	const numberOfMetricesInBottomLayer = planeBottomPointsMax.length;

	const planeTopPoints = [planeTopPointsMin, planeTopPointsMed, planeTopPointsMax];
	const planeBottomPoints = [planeBottomPointsMax, planeBottomPointsMed, planeBottomPointsMin];

	for(let i = 0; i < numberOfMetricesInTopLayer; i++) {
		for(let planeTopPoint of planeTopPoints) {
			drawPlaneLine(planeTopPoint, i, numberOfMetricesInTopLayer, lineMaterial);
			drawPlaneConnectingLine(planeTopPoint, planeTopPoint, i, numberOfMetricesInTopLayer, lineMaterial);
		}
		for(let planeBottomPoint of planeBottomPoints) {
			drawPlaneLine(planeBottomPoint, i, numberOfMetricesInTopLayer, lineMaterial);
			drawPlaneConnectingLine(planeBottomPoint, planeBottomPoint, i, numberOfMetricesInTopLayer, lineMaterial);
			drawPlaneConnectingLine(planeTopPointsMax, planeBottomPointsMax, i, numberOfMetricesInTopLayer, lineMaterial);
		}
		
		const labelForPlane1 = createLabel(dataTitleSystemMetrics[i], planeTopPointsMax[i]);
		scene.add(labelForPlane1);
		const labelForPlane2 = createLabel(dataTitleQoeMetrics[i], planeBottomPointsMax[i]);
		scene.add(labelForPlane2);

		const triangleFromTopToBottomForUpperLayer = new Triangle(planeTopPointsMax[i], planeTopPointsMax[(i+1)  % numberOfMetricesInTopLayer], planeBottomPointsMax[(i+1)  % numberOfMetricesInTopLayer], 0x4EC163);
		scene.add(triangleFromTopToBottomForUpperLayer);
		const triangleFromBottomToTopForLowerLayer = new Triangle(planeBottomPointsMax[i], planeBottomPointsMax[(i+1)  % numberOfMetricesInTopLayer], planeTopPointsMax[(i)  % numberOfMetricesInTopLayer], 0x4EC163);
		scene.add(triangleFromBottomToTopForLowerLayer);

		drawTrianglesInALayer(planeTopPointsMax, planeTopPointsMed, i,numberOfMetricesInTopLayer, 0xFF0000);
		drawTrianglesInALayer(planeTopPointsMed, planeTopPointsMin, i,numberOfMetricesInTopLayer, 0x37B015);
		drawTrianglesInALayer(planeBottomPointsMax, planeBottomPointsMed, i,numberOfMetricesInTopLayer, 0xFF0000);
		drawTrianglesInALayer(planeBottomPointsMed, planeBottomPointsMin, i,numberOfMetricesInTopLayer, 0x37B015);
	}
	console.log('System Metrics is Working!');
	return nextData;
}

function drawPlaneLine(planePoint, i, planePointLength, material) {
	const allPlaneLinesOfLayer = new SimpleLine(planePoint[i], planePoint[(i+1)  % planePointLength], material);
	scene.add(allPlaneLinesOfLayer);
}

function drawPlaneConnectingLine(planePropertyFrom, planePropertyTo, i, planePointLength, material) {
	const allPlaneConnectingLines = new SimpleLine(planePropertyFrom[i], planePropertyTo[(i) % planePointLength], material);
	scene.add(allPlaneConnectingLines);
}

function drawTrianglesInALayer(planePointOne, planePointTwo, i, planePointLength, color) {
	const triangleFromPlaneOneToTwo = new Triangle(planePointOne[i], planePointTwo[i], planePointTwo[(i+1)  % planePointLength], color);
	scene.add(triangleFromPlaneOneToTwo);
	const triangleFromPlaneTwoToOne = new Triangle(planePointTwo[(i+1)  % planePointLength], planePointOne[(i+1)  % planePointLength], planePointOne[(i)  % planePointLength], color);
	scene.add(triangleFromPlaneTwoToOne);
}
//creates labels for all mertics and displays it on their position.
 /**
  * 
  * @param {string} textContent returns labels for your parameters and displays on your 3D plane
  * @param {number} vector3 connects x&y coordinates to form lines between points
  */
function createLabel(textContent, vector3) {
	const labelDiv = document.createElement( 'div' );
	labelDiv.className = 'label';
	labelDiv.textContent = textContent;
	const metricLabel = new CSS2DObject( labelDiv );
	metricLabel.position.set(vector3[0], vector3[1] + 1, vector3[2]);
	return metricLabel
}

function render(data) {
	data = readyToExecute(data);
	
	controls.update();
	renderer.render(scene, camera);
	//remove old shit
	for( var i = scene.children.length - 1; i >= 0; i--) { 
		var obj = scene.children[i];
		scene.remove(obj);
	}
	labelRenderer.render( scene, camera );
	//console.log(dataIterator.next().value.systemMetrics.cpu.current);
	requestAnimationFrame(() => render(data));
}

/**
 * 
 * @param {number} color takes hexadecimal color as input 
 * @param {number} opacity take float number between 1 & 0
*/
function createLineMaterial(color, opacity) {
	return new THREE.LineDashedMaterial( {
		color,
		linewidth: 3,
		transparent: true,
		opacity
	} );
}

function createTriangleMaterial(color) {
	return new THREE.MeshBasicMaterial( {
		color,
		transparent: true,
		opacity: 0.5,
		side: THREE.DoubleSide
	} );
}

function metricPoint(metric, zplane) {
	const planepoints = [];
	for (let i=0; i< metric.length; i++) {
		const points = findNewPoint(i*Math.PI*2/metric.length ,metric[i]*3, zplane);
		planepoints.push(points);
	}
	return planepoints;
}

/**
 * 
 * @param {number} angle angle for calculating x,y,z points on axis. 
 * @param {number} radius data values considered as radius for accuracy of coordinates
 * @param {number} zplane values for Z-axis
 */
function findNewPoint( angle, radius, zplane) {
	const x = radius * Math.cos(angle);
	const y = radius * Math.sin(angle);
	const z = zplane;
	const result = [x, y, z];
	return result;
}