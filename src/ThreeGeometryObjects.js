import * as THREE from 'three';

export class SimpleLine extends THREE.Line {
	constructor(value1, value2, transparentLineMaterial) {
		const geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(value1[0], value1[2], value1[1]));
		geometry.vertices.push(new THREE.Vector3(value2[0], value2[2], value2[1]));
		super(geometry, transparentLineMaterial);
	}

	update(a,b){
		this.geometry.vertices[0].set(a[0], a[2], a[1]);
		this.geometry.vertices[1].set(b[0], b[2], b[1]);
		this.geometry.verticesNeedUpdate = true;
	};
}

export class DasheLine extends THREE.Line {
	constructor(value1, value2, transparentLineMaterial) {
		const geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(value1[0], value1[2], value1[1]));
		geometry.vertices.push(new THREE.Vector3(value2[0], value2[2], value2[1]));
		super(geometry, transparentLineMaterial);
		this.computeLineDistances()
	}

	update(a,b){
		this.geometry.vertices[0].set(a[0], a[2], a[1]);
		this.geometry.vertices[1].set(b[0], b[2], b[1]);
		this.geometry.verticesNeedUpdate = true;
	};
}

export class Triangle extends THREE.Mesh {
	constructor(a, b, c, color,opacity) {
		const i1 = new THREE.Vector3(a[0], a[2], a[1]);
		const i2 = new THREE.Vector3(b[0], b[2], b[1]);
		const i3 = new THREE.Vector3(c[0], c[2], c[1]);
		if(!opacity){
			opacity = 0.5;
		}
		const geometry = new THREE.Geometry();
		geometry.vertices.push(i1);
		geometry.vertices.push(i2);
		geometry.vertices.push(i3);

		const center = new THREE.Vector3();
		geometry.computeBoundingBox();
		geometry.boundingBox.getCenter(center);
		geometry.center();
		geometry.verticesNeedUpdate = true;

		const face = new THREE.Face3(0, 1, 2);
		geometry.faces.push(face);

		const material_front = new THREE.MeshBasicMaterial({
			color,
			transparent: true,
			opacity: opacity,
			side: THREE.DoubleSide
		});

		super(geometry, material_front);
		this.position.copy(center);
	}

	update(a, b, c) {
		const geometry = this.geometry;
		geometry.vertices[0].set(a[0], a[2], a[1]);
		geometry.vertices[1].set(b[0], b[2], b[1]);
		geometry.vertices[2].set(c[0], c[2], c[1]);

		const center = new THREE.Vector3();
		geometry.computeBoundingBox();
		geometry.boundingBox.getCenter(center);
		geometry.center();
		geometry.verticesNeedUpdate = true;

		this.position.copy(center);
	}
}
