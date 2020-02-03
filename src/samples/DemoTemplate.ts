import * as THREE from 'three';
import { SAND } from '../common/catalogs/Materials';
import { Engine } from '../common/Engine';
import { Sample } from '../common/Sample';
import { AxeGridHelper } from '../common/misc/Helpers';
import { ControlManager } from '../common/Controls';
import { CONTROL_TYPE } from '../common/constants';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

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
    mainHlp: THREE.Group = new THREE.Group();

    constructor() {
        super();
        this.initScene();
    }
    // Sample.scene or  SPL.scene
    // Engine.scene
    // Graphics.scene or GFX.scene
    initScene() {
        Engine.camera.position.x = 0;
        Engine.camera.position.y = 32;
        Engine.camera.position.z = 128;
        Engine.scene.add(new THREE.AmbientLight(0xffffff));
        var geometry = new THREE.BoxGeometry(10, 10, 10);
        this.cube = new THREE.Mesh(geometry, SAND(0.5));
        Engine.scene.add(this.cube);
        // Engine.scene.add(AxeGridHelper(128));
        ControlManager.TranformCtrl.attach(this.cube);
    }

    // animate(){
    //     // this.cube
    // }

}