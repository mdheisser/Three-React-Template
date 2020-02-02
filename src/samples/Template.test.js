import * as THREE from 'three/build/three.module';
import { Sample } from '../Sample';

export class Test extends Sample {

    constructor(scene, camera, ammo) {
        super(scene, camera, ammo);
        super.initPhysics();
        this.initScene();
    }

    initScene() {
        this.scene.add(new THREE.AmbientLight(0xffffff));

        var cube = new THREE.Mesh(new THREE.BoxBufferGeometry(100, 100, 100),
            new THREE.MeshStandardMaterial({ color: 0xffffff, }));
        // this.scene.add(cube);

    }

}