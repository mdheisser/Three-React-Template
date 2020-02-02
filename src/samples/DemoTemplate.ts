import * as THREE from 'three';
import { SAND } from '../common/catalogs/Materials';
import { Engine } from '../common/Engine';
import { Sample } from '../common/Sample';

/**
 * Minimal Template
 * 
 * Access shared variable
 * 
 * Sample.scene => Graphics.scene (or Engine.sce): put mesh here
 * Sample.camera => Graphics.camera (or Engine.cam)
 * Engine.ctrl  => Controls.
 * Physics.AmmoLib
 * Engine.physObj => push dynamic physics objects here
 * Sample.updatable => push object needing animation here
 */
export class DemoTemplate extends Sample {

    cube: any;

    constructor() {
        super();
        this.initScene();
    }
    // Sample.scene or  SPL.scene
    // Engine.scene
    // Graphics.scene or GFX.scene
    initScene() {
        Engine.scene.add(new THREE.AmbientLight(0xffffff));
        var geometry = new THREE.BoxGeometry(10, 10, 10);
        this.cube = new THREE.Mesh(geometry, SAND(0.5));
        Engine.scene.add(this.cube);
        this.initHelpers()
    }

    initPhys(){

    }

    initHelpers(){

    }

    animate(){
        // this.cube
    }

}