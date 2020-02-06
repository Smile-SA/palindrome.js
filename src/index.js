import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {CSS2DRenderer, CSS2DObject} from 'three-css2drender';
import {Triangle, SimpleLine} from './ThreeBasicObjects';

const myRequest = new Request("data.json");

fetch(myRequest)
	.then(resp => resp.json())
	.then(data => {
		readyToExecute(data)
	});



function initScene() {

	const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.set( 10, -230, 150 );
	
	var renderer = new THREE.WebGLRenderer({antialias: true});
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

	calcPosFromLatLonRad(20, 80, 20);
	function calcPosFromLatLonRad(lat,lon,radius){

		var phi   = (90-lat)*(Math.PI/180);
		var theta = (lon+180)*(Math.PI/180);
		
		var x = -((radius) * Math.sin(phi)*Math.cos(theta));
		var z = ((radius) * Math.sin(phi)*Math.sin(theta));
		var y = ((radius) * Math.cos(phi));
		
		console.log([x,y,z]);
		console.log('hey its working');
		   return [x,y,z];
		}
		
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

function readyToExecute (data) {
	(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()
	
	let flag = "up";
	function mockUpAndDown(metric){
		if (flag == "up"){
		  if (Object.values(metric).current < Object.values(metric).max) {
			Object.values(metric).current += 1;
		  } else {
			flag = "down";
		  }
		} else {
		  if (Object.values(metric).current > Object.values(metric).min) {
			Object.values(metric).current -= 1;
		  } else {
			flag = "up";
		  }
		}
		//console.log(flag);
		console.log(Object.values(metric).current);
	  }

	  function callback(){
		mockUpAndDown(Object.values(systemMetrics));
		mockUpAndDown(Object.values(qoeMetrics));
		//mockUpAndDown(otherdataStructure);
		requestAnimationFrame(callback);
	  }
	  
	  //requestAnimationFrame(callback);
	  
	  
	const { qoeMetrics, systemMetrics } = data;
	
	const dataValueSystemMetricsMax = Object.values(systemMetrics).map(e => e.max / e.current);
	const dataValueSystemMetricsMed = Object.values(systemMetrics).map(e => e.med / e.current);
	const dataValueSystemMetricsMin = Object.values(systemMetrics).map(e => e.min / e.current);

	const dataTitleSystemMetrics = Object.keys(systemMetrics);
	const dataTitleQoeMetrics = Object.keys(qoeMetrics);

	const dataValueQoeMetricsMax = Object.values(qoeMetrics).map(e => e.max / e.current);
	const dataValueQoeMetricsMed = Object.values(qoeMetrics).map(e => e.med / e.current);
	const dataValueQoeMetricsMin = Object.values(qoeMetrics).map(e => e.min / e.current);

	
	const { scene, labelRenderer, controls, renderer, camera } = initScene();
	
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

	function drawPlaneLine(planePoint, i) {
		const planeOneMaxLines = new SimpleLine(planePoint[i], planePoint[(i+1)  % numberOfMetricesInTopLayer], lineMaterial);
		scene.add(planeOneMaxLines);
	}

	if (numberOfMetricesInTopLayer >= numberOfMetricesInBottomLayer) {

		const planeTopPoints = [planeTopPointsMin, planeTopPointsMed, planeTopPointsMax];

		for(let i = 0; i < numberOfMetricesInTopLayer; i++) {
			for(let planeTopPoint of planeTopPoints) {
				drawPlaneLine(planeTopPoint, i);
			}

			// lines adding both planes
			const lineAddingBothPlanes = new SimpleLine(planeTopPointsMax[i], planeBottomPointsMax[(i) % numberOfMetricesInBottomLayer], lineMaterial);
			scene.add(lineAddingBothPlanes);

			// Lines adding plane one Max and Med Values
			const lineAddingPlaneOneMaxAndMed = new SimpleLine(planeTopPointsMax[i], planeTopPointsMed[i], transparentLineMaterial);
			scene.add(lineAddingPlaneOneMaxAndMed);

			// Lines adding plane one Med and Min Values
			const lineAddingPlaneOneMedAndMin = new SimpleLine(planeTopPointsMed[i], planeTopPointsMin[i], transparentLineMaterial);
			scene.add(lineAddingPlaneOneMedAndMin);

			// Lines adding plane two Max and Med Values
			const lineAddingPlaneTwoMaxAndMed = new SimpleLine(planeBottomPointsMax[i], planeBottomPointsMed[i], transparentLineMaterial);
			scene.add(lineAddingPlaneTwoMaxAndMed);

			// Lines adding plane two Med and Min Values
			const lineAddingPlaneTwoMedAndMin = new SimpleLine(planeBottomPointsMed[i], planeBottomPointsMin[i], transparentLineMaterial);
			scene.add(lineAddingPlaneTwoMedAndMin);
	
			//const lineAddingBothPlanes2 = new SimpleLine(planeTopPointsMax[(i+1) % numberOfMetricesInTopLayer], planeBottomPointsMax[(i+1) % numberOfMetricesInBottomLayer], lineMaterial);
			//scene.add(lineAddingBothPlanes2);

			// Triangle (two) points from upper layer indexes to lower layer (one) point 
			const triangleFromTopToBottomForUpperLayer = new Triangle(planeTopPointsMax[i], planeTopPointsMax[(i+1)  % numberOfMetricesInTopLayer], planeBottomPointsMax[(i+1)  % numberOfMetricesInTopLayer], 0x4EC163);
			scene.add(triangleFromTopToBottomForUpperLayer);

			// Triangle (two) points from lower layer indexes to upper layer (one) point 
			const triangleFromBottomToTopForLowerLayer = new Triangle(planeBottomPointsMax[i], planeBottomPointsMax[(i+1)  % numberOfMetricesInTopLayer], planeTopPointsMax[(i)  % numberOfMetricesInTopLayer], 0x4EC163);
			scene.add(triangleFromBottomToTopForLowerLayer);

			/////////////////////////////////
			//
			// Place for RED TRIANGLE filled
			// 		  in UPPER LAYER
			//
			////////////////////////////////
			const triangleFromPlaneOneMaxToMed = new Triangle(planeTopPointsMax[i], planeTopPointsMed[i], planeTopPointsMed[(i+1)  % numberOfMetricesInTopLayer], 0xFF0000);
			scene.add(triangleFromPlaneOneMaxToMed);
			const triangleFromPlaneOneMedToMax = new Triangle(planeTopPointsMed[(i+1)  % numberOfMetricesInTopLayer], planeTopPointsMax[(i+1)  % numberOfMetricesInTopLayer], planeTopPointsMax[(i)  % numberOfMetricesInTopLayer], 0xFF0000);
			scene.add(triangleFromPlaneOneMedToMax);

			////////////////////////////////////////
			//
			// Place for DARK GREEN TRIANGLE filled
			// 		  in UPPER LAYER
			//
			//////////////////////////////////////
			const triangleFromPlaneOneMedToMin = new Triangle(planeTopPointsMed[i], planeTopPointsMin[i], planeTopPointsMin[(i+1)  % numberOfMetricesInTopLayer], 0x37B015);
			scene.add(triangleFromPlaneOneMedToMin);
			const triangleFromPlaneOneMinToMed = new Triangle(planeTopPointsMin[(i+1)  % numberOfMetricesInTopLayer], planeTopPointsMed[(i+1)  % numberOfMetricesInTopLayer], planeTopPointsMed[(i)  % numberOfMetricesInTopLayer], 0x37B015);
			scene.add(triangleFromPlaneOneMinToMed);

			/////////////////////////////////
			//
			// Place for RED TRIANGLE filled
			// 		  in LOWER LAYER
			//
			////////////////////////////////
			const triangleFromPlaneTwoMaxToMed = new Triangle(planeBottomPointsMax[i], planeBottomPointsMed[i], planeBottomPointsMed[(i+1)  % numberOfMetricesInTopLayer], 0xFF0000);
			scene.add(triangleFromPlaneTwoMaxToMed);
			const triangleFromPlaneTwoMedToMax = new Triangle(planeBottomPointsMed[(i+1)  % numberOfMetricesInTopLayer], planeBottomPointsMax[(i+1)  % numberOfMetricesInTopLayer], planeBottomPointsMax[(i)  % numberOfMetricesInTopLayer], 0xFF0000);
			scene.add(triangleFromPlaneTwoMedToMax);

			////////////////////////////////////////
			//
			// Place for DARK GREEN TRIANGLE filled
			// 		  in UPPER LAYER
			//
			//////////////////////////////////////
			const triangleFromPlaneTwoMedToMin = new Triangle(planeBottomPointsMed[i], planeBottomPointsMin[i], planeBottomPointsMin[(i+1)  % numberOfMetricesInTopLayer], 0x37B015);
			scene.add(triangleFromPlaneTwoMedToMin);
			const triangleFromPlaneTwoMinToMed = new Triangle(planeBottomPointsMin[(i+1)  % numberOfMetricesInTopLayer], planeBottomPointsMed[(i+1)  % numberOfMetricesInTopLayer], planeBottomPointsMed[(i)  % numberOfMetricesInTopLayer], 0x37B015);
			scene.add(triangleFromPlaneTwoMinToMed);

			
			const labelForPlane1 = createLabel(dataTitleSystemMetrics[i], planeTopPointsMax[i]);
			scene.add(labelForPlane1);
			
			const labelForPlane2 = createLabel(dataTitleQoeMetrics[i], planeBottomPointsMax[i]);
			scene.add(labelForPlane2);
		
			const planeTwoMaxLines = new SimpleLine(planeBottomPointsMax[i], planeBottomPointsMax[(i+1)  % numberOfMetricesInTopLayer], lineMaterial);
			scene.add(planeTwoMaxLines);

			const planeTwoMedLines = new SimpleLine(planeBottomPointsMed[(i) % numberOfMetricesInBottomLayer], planeBottomPointsMed[(i+1) % numberOfMetricesInBottomLayer], lineMaterial);
			scene.add(planeTwoMedLines);

			const planeTwoMinLines = new SimpleLine(planeBottomPointsMin[(i) % numberOfMetricesInBottomLayer], planeBottomPointsMin[(i+1) % numberOfMetricesInBottomLayer], lineMaterial);
			scene.add(planeTwoMinLines);
		}
		console.log('System Metrics is Working!');
	}

	// else {

	// 	for(let i = 0; i < numberOfMetricesInBottomLayer; i++) {
	// 		const planeOneLines = new SimpleLine(planeTopPointsMax[(i)  % numberOfMetricesInTopLayer], planeTopPointsMax[(i+1)  % numberOfMetricesInTopLayer], lineMaterial);
	// 		scene.add(planeOneLines);
		
	// 		const lineAddingBothPlanes = new SimpleLine(planeBottomPointsMax[i], planeTopPointsMax[(i+1)  % numberOfMetricesInTopLayer], lineMaterial);
	// 		scene.add(lineAddingBothPlanes);
	
	// 		const lineAddingBothPlanes2 = new SimpleLine(planeBottomPointsMax[(i+1) % numberOfMetricesInBottomLayer], planeTopPointsMax[(i+1) % numberOfMetricesInTopLayer], lineMaterial);
	// 		scene.add(lineAddingBothPlanes2);

	// 		const triangleFromTopToBottomForUpperLayer = new Triangle(planeBottomPointsMax[i], planeBottomPointsMax[(i)  % numberOfMetricesInBottomLayer], planeTopPointsMax[(i)  % numberOfMetricesInBottomLayer]);
	// 		scene.add(triangleFromTopToBottomForUpperLayer);
	// 		const triangleFromBottomToTopForLowerLayer = new Triangle(planeTopPointsMax[i], planeTopPointsMax[(i)  % numberOfMetricesInBottomLayer], planeBottomPointsMax[(i)  % numberOfMetricesInBottomLayer]);
	// 		scene.add(triangleFromBottomToTopForLowerLayer);
			
	// 		const labelForPlane1 = createLabel(dataTitleSystemMetrics[i], planeTopPointsMax[(i+1) % numberOfMetricesInTopLayer]);
	// 		scene.add(labelForPlane1); 
		
	// 		const labelForPlane2 = createLabel(dataTitleQoeMetrics[i], planeBottomPointsMax[i]);
	// 		scene.add(labelForPlane2); 
		
	// 		const planeTwoLines = new SimpleLine(planeBottomPointsMax[i], planeBottomPointsMax[(i+1) % numberOfMetricesInBottomLayer], lineMaterial);
	// 		scene.add(planeTwoLines);
	// 	}
	// 	console.log('Qoe Metrics is Working!');
	// }
		
	render();
	
	
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

	function render() {
		controls.update();
		renderer.render(scene, camera);
		labelRenderer.render( scene, camera );
		
		mockUpAndDown(Object.values(systemMetrics))

		requestAnimationFrame(render);
		//requestAnimationFrame(callback);
	}
	
	/**
	 * 
	 * @param {number} color takes hexadecimal color as input 
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

}