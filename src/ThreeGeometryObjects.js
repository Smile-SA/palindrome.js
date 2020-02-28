import * as THREE from 'three';

export class SimpleLine extends THREE.Line {
	constructor(value1, value2, transparentLineMaterial) {
		const geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(value1[0], value1[2], value1[1]) );
		geometry.vertices.push(new THREE.Vector3(value2[0], value2[2], value2[1]) );
		super(geometry, transparentLineMaterial)
	}
}

export class Triangle extends THREE.Mesh {
	constructor(a, b, c, color, side) {
		const geom1 = new THREE.Geometry();
		var i1 = new THREE.Vector3(a[0], a[2], a[1]);
		var i2 = new THREE.Vector3(b[0], b[2], b[1]);
		var i3 = new THREE.Vector3(c[0], c[2], c[1]);
		var triangle1 = new THREE.Triangle(i1, i2, i3);
		geom1.vertices.push(triangle1.a);
		geom1.vertices.push(triangle1.b);
		geom1.vertices.push(triangle1.c);
		const face = new THREE.Face3( 0, 1, 2);
		geom1.faces.push(face);
		const material = new THREE.MeshBasicMaterial( {color, transparent: true, opacity: 0.5, side} );
	
		super(geom1, material);
	}
}