import * as THREE from 'three';
import { SAND } from '../resources/catalogs/Materials';
// import { AxeGridHelper } from '../common/misc/Helpers';
import Sample from '../legacy/Sample';
import Engine from '../legacy/Engine';
import { ControlManager } from '../legacy/Controls';

/**
 * Minimal Template
 * 
 * Access shared variable
 * 
 * wrapper.scene: put mesh here
 * wrapper.camera => Graphics.camera (or wrapper.cam)
 * wrapper.ctrl  => Controls.
 * Physics.AmmoLib
 * wrapper.physObj => push dynamic physics objects here
 * Sample.updatable => push object needing animation here
 */
export default class DemoTemplate extends Sample {

    cube: any;
    mainHlp: THREE.Group = new THREE.Group();
    constructor(props: any){
        super(props);
    }

    runSample(testId: string) {
        // this[testId]();  // doesn't work in TS
        this.initScene();
    };

    // Sample.scene or  SPL.scene
    // wrapper.scene
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
        Engine.scene.add( ControlManager.TranformCtrl );
    }

    render(){
        return super.render();
    }

    // animate(){
    //     // this.cube
    // }

}