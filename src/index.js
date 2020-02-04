import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {CSS2DRenderer, CSS2DObject} from 'three-css2drender';

const myRequest = new Request("data.json");

fetch(myRequest)
	.then(resp => resp.json())
	.then(data => {
		readyToExecute(data)
	});
	//.catch(err => alert('An error occured please check your data file'));

class SimpleLine extends THREE.Line {
	constructor(value1, value2, transparentLineMaterial) {
		const geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(...value1) );
		geometry.vertices.push(new THREE.Vector3(...value2) );
		super(geometry, transparentLineMaterial)
	}
}

class Triangle extends THREE.Mesh {
	constructor(a, b, c) {
		const geom1 = new THREE.Geometry();

		var i1 = new THREE.Vector3(...a);
		var i2 = new THREE.Vector3(...b);
		var i3 = new THREE.Vector3(...c);

		var triangle1 = new THREE.Triangle(i1, i2, i3);

		geom1.vertices.push(triangle1.a);
		geom1.vertices.push(triangle1.b);
		geom1.vertices.push(triangle1.c);

		const face = new THREE.Face3( 0, 1, 2);
		geom1.faces.push(face);

		const material = new THREE.MeshBasicMaterial( {color: 0x4EC163, transparent: true, opacity: 0.5, side: THREE.DoubleSide} );
		super(geom1, material);
		
	}
}

function readyToExecute (data) {
	(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()
	
	/**
	 * STEP 01
	 *
	 * Transfrom readytoExecute to take only ONE varialbe of Metrics by creating a new function called drawLayer
	 * taking the scene (?) and the metric.
	 * DO NOT TOUCH READYTOEXECUTE BEFORE HAVING CODED DRAWLAYER
	 * 
	 *  
	 */
	const { qoeMetrics, systemMetrics } = data; 
	
	const dataValueSystemMetrics = Object.values(systemMetrics).map(e => e.current / e.max);
	const dataTitleSystemMetrics = Object.keys(systemMetrics);
	const dataValueQoeMetrics = Object.values(qoeMetrics).map(e => e.current / e.max);
	const dataTitleQoeMetrics = Object.keys(qoeMetrics);

	//const dataValueSystemMetricsMin = Object.values(systemMetrics).map(e => e.current / e.min);
	//const dataValueSystemMetricsMed = Object.values(systemMetrics).map(e => e.current / e.med);
	
	
	const { scene, labelRenderer, controls, renderer, camera } = initScene();
	
	const material1 = createLineMaterial(0x000000, 1); //0xfffff
	const transparentLineMaterial = createLineMaterial(0x000000, 0);
	//const material3 = createLineMaterial(0xC425B9);
	
	const plane1points = metricPoint(dataValueSystemMetrics, 10);
	const plane2points = metricPoint(dataValueQoeMetrics, -10);;
	const linePoints = [20, 30, 8];
	
	const pointsCount = plane1points.length;
	const pointsCount2 = plane2points.length;

	if (pointsCount >= pointsCount2) {

		for(let i = 0; i < pointsCount; i++) {
			const planeOneLines = new SimpleLine(plane1points[i], plane1points[(i+1)  % pointsCount], material1);
			scene.add(planeOneLines);
		
			const lineAddingBothPlanes = new SimpleLine(plane1points[i], plane2points[(i+1) % pointsCount2], material1);
			scene.add(lineAddingBothPlanes);
	
			const lineAddingBothPlanes2 = new SimpleLine(plane1points[(i+1) % pointsCount], plane2points[(i+1) % pointsCount2], material1);
			scene.add(lineAddingBothPlanes2);

			const triangleFromTopToBottomForUpperLayer = new Triangle(plane1points[i], plane1points[(i+1)  % pointsCount], plane2points[(i+1)  % pointsCount]);
			scene.add(triangleFromTopToBottomForUpperLayer);
			const triangleFromBottomToTopForLowerLayer = new Triangle(plane2points[i], plane2points[(i+1)  % pointsCount], plane1points[(i)  % pointsCount]);
			scene.add(triangleFromBottomToTopForLowerLayer);
			
			const labelForPlane1 = createLabel(dataTitleSystemMetrics[i], plane1points[i]);
			scene.add(labelForPlane1);
			
			const labelForPlane2 = createLabel(dataTitleQoeMetrics[i], plane2points[(i+1) % pointsCount2]);
			scene.add(labelForPlane2);
		
			const planeTwoLines = new SimpleLine(plane2points[(i) % pointsCount2], plane2points[(i+1) % pointsCount2], material1);
			scene.add(planeTwoLines);
		}
		console.log('System Metrics is Working!');
	}

	else {

		for(let i = 0; i < pointsCount2; i++) {
			const planeOneLines = new SimpleLine(plane1points[(i)  % pointsCount], plane1points[(i+1)  % pointsCount], material1);
			scene.add(planeOneLines);
		
			const lineAddingBothPlanes = new SimpleLine(plane2points[i], plane1points[(i+1)  % pointsCount], material1);
			scene.add(lineAddingBothPlanes);
	
			const lineAddingBothPlanes2 = new SimpleLine(plane2points[(i+1) % pointsCount2], plane1points[(i+1) % pointsCount], material1);
			scene.add(lineAddingBothPlanes2);

			const triangleFromTopToBottomForUpperLayer = new Triangle(plane2points[i], plane2points[(i)  % pointsCount2], plane1points[(i)  % pointsCount2]);
			scene.add(triangleFromTopToBottomForUpperLayer);
			const triangleFromBottomToTopForLowerLayer = new Triangle(plane1points[i], plane1points[(i)  % pointsCount2], plane2points[(i)  % pointsCount2]);
			scene.add(triangleFromBottomToTopForLowerLayer);
			
			const labelForPlane1 = createLabel(dataTitleSystemMetrics[i], plane1points[(i+1) % pointsCount]);
			scene.add(labelForPlane1); 
		
			const labelForPlane2 = createLabel(dataTitleQoeMetrics[i], plane2points[i]);
			scene.add(labelForPlane2); 
		
			const planeTwoLines = new SimpleLine(plane2points[i], plane2points[(i+1) % pointsCount2], material1);
			scene.add(planeTwoLines);
		}
		console.log('Qoe Metrics is Working!');
	}
		
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
		requestAnimationFrame(render);
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


	function initScene() {
		const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
		camera.position.set( 0, -100, 20 );
		
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
		//controls.minPolarAngle = 2;
		//controls.target = new THREE.Vector3(1,0,1); //15, 5, 15
		
					
		const scene = new THREE.Scene();
		scene.background = new THREE.Color( 0xf0f0f0 );
		const axesHelper = new THREE.AxesHelper(17);
		scene.add(axesHelper);

		const transparentGeometry = new THREE.PlaneGeometry( 5, 5 ,0 );
		const transparentPlaneMaterial = new THREE.MeshBasicMaterial( {color: 0xA8A8A8, transparent: true, opacity: 0.5, side: THREE.DoubleSide} );
		const transparentPlane = new THREE.Mesh( transparentGeometry, transparentPlaneMaterial);
		scene.add(transparentPlane);
	
		return { scene, labelRenderer, controls, renderer, camera, transparentPlaneMaterial };
	}
	
	function metricPoint(metric, zplane) {
		const planepoints = [];
		for (let i=0; i< metric.length; i++) {
			const points = findNewPoint(i*Math.PI*2/metric.length ,metric[i]*50, zplane);
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