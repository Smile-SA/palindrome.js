

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
	},
	bandwidth2 : {
		label : "BW",
		unit : "MB / seconds",
		max : 10240,
		current : 1500
	}
}

const dataValue = [];
for ( const metric in systemMetrics) {
    const value = systemMetrics[metric].current / systemMetrics[metric].max;
    dataValue.push(value);
};


const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
camera.position.set( 0, 20, 100 );
camera.lookAt( 0, 0, 0 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new THREE.OrbitControls(camera, renderer.domElement);
//controls.autoRotate = true;
controls.autoRotateSpeed = 5;
//controls.target = new THREE.Vector3(.5, .5, .5);
			
const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

const material = new THREE.LineDashedMaterial( {
	color: 0xffffff,
	linewidth: 3,
	scale: 1,
	dashSize: 3,
	gapSize: 1,
} );

class SimpleLine extends THREE.Line {
	constructor(value1, value2, material) {
		const geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(...value1) );
		geometry.vertices.push(new THREE.Vector3(...value2) );

		super(geometry, material)
	}
	}

const b = [];


for (let i=0; i< dataValue.length; i++){
    const pointValue = new SimpleLine([dataValue[i]*50,0,0], [0,0,0] , material);
	pointValue.rotateZ(i*Math.PI*2/dataValue.length);
	//console.log(pointValue);

	scene.add(pointValue);
	scene.updateMatrixWorld();

    const points = pointValue.geometry.vertices[0].clone();
	points.applyMatrix4(pointValue.matrixWorld);
	//console.log(points);

	b.push(points);
	

	/*
    for (let j=0; j< dataValue[i]; j++) {
        const value = dataValue.i*50;
        const x = Math.cos(i*Math.PI/2) * value;
        const y = Math.sin(i*Math.PI/2) * value;

        console.log(x);
        console.log(y);

    
        const anwar = new SimpleLine([x,0,0], [0,y,0], material);

        scene.add(anwar);
    
    }

*/
}


for(let i = 0; i < b.length -1; i++) {
	console.log(b[i], b[i+1])
	const autoLines = new SimpleLine(b[i].toArray(), b[i+1].toArray(), material);
	//scene.updateMatrixWorld();
	scene.add(autoLines);
	//console.log(autoLines);
}
const autoLines1 = new SimpleLine(b[b.length - 1].toArray(), b[0].toArray(), material);
scene.add(autoLines1);

/*
const line = new SimpleLine([0,dataValue[0]*50,0], [dataValue[2]*50,0,0], material);
const line2 = new SimpleLine([0,dataValue[1]*-50,0], [dataValue[2]*50,0,0], material);
const line3 = new SimpleLine([dataValue[3]*-50,0,0],[0,dataValue[1]*-50,0],material);
const line4 = new SimpleLine([dataValue[3]*-50,0,0],[0,dataValue[0]*50,0],material);


scene.add(line, line2, line3, line4 );
*/



// display scene
function render() {
	controls.update();
	renderer.render(scene, camera);
	
	requestAnimationFrame(render);
}

render();
/*
// game logic
const update function ( ){

};

// draw scene
const render = function( ) {
	renderer.render( scene, camera );
};

// run game loop (update, render, repeat)
const gameLoop = function ( ) {
	requestAnimationFrame ( gameLoop );

	update( );
	render( );
};

gameLoop();
*/

