
const systemMetrics = {
	cpu : {
		label : "CPU",
		unit : "cycle / seconds",
		max : 100000,
		current : 5000
	},
	ram : {
		label : "RAM",
		unit : "GB",
		max : 128,
		current : 32
	},
	ram2 : {
		label : "RAM",
		unit : "GB",
		max : 128,
		current : 32
	},
	hdd : {
		label : "HDD",
		unit : "GB",
		max : 1024,
		current : 150
	},
	bandwidth : {
		label : "BW",
		unit : "MB / seconds",
		max : 10240,
		current : 1500
	}
}

const qoeMetrics = {
	hdd : {
		label : "RAM",
		unit : "GB",
		max : 128,
		current : 32
	},
	bandwidth : {
		label : "BW",
		unit : "MB / seconds",
		max : 10240,
		current : 1500
	},
	bandwidth2 : {
		label : "BW",
		unit : "MB / seconds",
		max : 10240,
		current : 1500
	},
	ram : {
		label : "RAM",
		unit : "GB",
		max : 128,
		current : 32
	},
	io : {
		label : "IO",
		unit : "IO / seconds",
		max : 10240,
		current : 1500
	}
}

class SimpleLine extends THREE.Line {
	constructor(value1, value2, material2) {
		const geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(...value1) );
		geometry.vertices.push(new THREE.Vector3(...value2) );
		super(geometry, material2)
	}
}

const dataValueSystemMetrics = Object.values(systemMetrics).map(e => e.current / e.max);
const dataTitleSystemMetrics = Object.keys(systemMetrics);
const dataValueQoeMetrics = Object.values(qoeMetrics).map(e => e.current / e.max);
const dataTitleQoeMetrics = Object.keys(qoeMetrics);

const { scene, labelRenderer, controls, renderer, camera } = initScene();

const material1 = createLineMaterial(0xffffff);
const material2 = createLineMaterial(0x000000);

const plane1points = [];
const plane2points = [];

loopingOverLayers(plane1points, dataValueSystemMetrics, 10);
loopingOverLayers(plane2points, dataValueQoeMetrics, -10);

const pointsCount = plane1points.length;
for(let i = 0; i < pointsCount; i++) {
	const planeOneLines = new SimpleLine(plane1points[i].toArray(), plane1points[(i+1)  % pointsCount].toArray(), material1);
	scene.add(planeOneLines);

	const lineAddingBothPlanes = new SimpleLine(plane1points[i].toArray(), plane2points[i].toArray(), material1);
	scene.add(lineAddingBothPlanes);

	const labelForPlane1 = createLabel(dataTitleSystemMetrics[i], plane1points[i]);
	scene.add(labelForPlane1); 

	const labelForPlane2 = createLabel(dataTitleQoeMetrics[i], plane2points[i]);
	scene.add(labelForPlane2); 

	const planeTwoLines = new SimpleLine(plane2points[i].toArray(), plane2points[(i+1) % pointsCount].toArray(), material1);
	scene.add(planeTwoLines);
}


//creates labels for all mertics and displays it on their position.
/**
 * 
 * @param {returns labels for your parameters and displays on your 3D plane} textContent 
 * @param {connects x&y coordinates to form lines between points} vector3 
 */
function createLabel(textContent, vector3) {
	const labelDiv = document.createElement( 'div' );
	labelDiv.className = 'label';
	labelDiv.textContent = textContent;

	const metricLabel = new THREE.CSS2DObject( labelDiv );
	metricLabel.position.set(vector3.x, vector3.y + 1, vector3.z);
	
	return metricLabel
}

// display scene
function render() {
	controls.update();
	renderer.render(scene, camera);
	labelRenderer.render( scene, camera );
	
	requestAnimationFrame(render);
}

render();


function createLineMaterial(color) {
	return new THREE.LineDashedMaterial( {
		color,
		linewidth: 3,
		scale: 1,
		dashSize: 3,
		gapSize: 1,
	} );
}

function initScene() {
	const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.set( 0, 20, 100 );
	
	const renderer = new THREE.WebGLRenderer();
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
	
	const labelRenderer = new THREE.CSS2DRenderer();
	labelRenderer.setSize( window.innerWidth, window.innerHeight );
	labelRenderer.domElement.style.position = 'absolute';
	labelRenderer.domElement.style.top = 0;
	document.body.appendChild( labelRenderer.domElement );
	
	const controls = new THREE.OrbitControls(camera, labelRenderer.domElement);
	//controls.autoRotate = true;
	controls.autoRotateSpeed = 5;
	//controls.target = new THREE.Vector3(.5, .5, .5);
				
	const scene = new THREE.Scene();
	const axesHelper = new THREE.AxesHelper(5);
	scene.add(axesHelper);

	labelRenderer.render( scene, camera );

	return { scene, labelRenderer, controls, renderer, camera };
}

function loopingOverLayers (planepoints, planeMetrics, zplaneValues) {
	for (let i=0; i< planeMetrics.length; i++){
		pallindrome(planepoints, planeMetrics, i, zplaneValues)
	}
}
/**
 * Draw a palindrome
 * 
 * @param {Array} coordinates list of coordinates to reuse
 * @param {Array} metricValue list metric of a layer
 * @param {number} i iteration over the array's index
 * @param {number} zplane position on the z axis of the palindrome
 */
function pallindrome(coordinates, metricValue, i, zplane) {
	const pointValue = new SimpleLine([metricValue[i]*50,0,zplane], [0,0,zplane] , material2);
	pointValue.rotateZ(i*Math.PI*2/metricValue.length);
	scene.add(pointValue);
	scene.updateMatrixWorld();
	const points = pointValue.geometry.vertices[0].clone();
	points.applyMatrix4(pointValue.matrixWorld);
	coordinates.push(points);
}
