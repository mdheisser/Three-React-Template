import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { FlyControls } from "three/examples/jsm/controls/FlyControls";
import store from '../redux/store';
import watch from 'redux-watch'
import { CONTROL_TYPE } from "./constants";


type Controls = OrbitControls | TransformControls | FlyControls;

export class ControlManager {
    camera: any;
    canvas: HTMLCanvasElement;

    // Controls: {
    //     ORBIT: OrbitControls,
    //     TRANSFORM: TransformControls,
    //     FLY: FlyControls|null
    // }
    ControlCatalog: { [key in CONTROL_TYPE]: Controls }
    static control: Controls;

    constructor(camera: any, canvas: any) {
        this.camera = camera;
        this.canvas = canvas;
        this.ControlCatalog = {
            [CONTROL_TYPE.ORBIT]: this.initOrbit(),
            [CONTROL_TYPE.TRANSFORM]: this.initTransform(),
            // [CONTROL_TYPE.FLY]: this.initFly()
        };
        // get selected control directly from the store
        var ctrl = store.getState().DemoSamples.control;
        ControlManager.control = this.ControlCatalog[ctrl] //ControlManager.CONTROLS.ORBIT;
        this.init();
        this.initStateListener();
    }
    /**
     * Put state here that will pilot controlmanager
     */
    initStateListener = () => {
        var w = watch(store.getState, 'DemoSamples.control');
        store.subscribe(w((newVal: CONTROL_TYPE, oldVal: CONTROL_TYPE, objectPath: string) => {
            console.log("Changing control from %s to %s", oldVal, newVal);
            // if (!(ControlManager.control instanceof FlyControls)) ControlManager.control.enabled = false;
            ControlManager.control = this.ControlCatalog[newVal] //ControlManager.CONTROLS.ORBIT;
            if (!(ControlManager.control instanceof FlyControls)) ControlManager.control.enabled = true;
        }));
    }

    init() {
        window.addEventListener('keydown', (evt) => {
            this.filterEvent(evt);
            // sample.handleControls(evt, 'keydown');
            store.dispatch({
                type: "COMMAND",
                payload: {
                    key: evt.keyCode,
                    isDown: true
                }
            });
        }, false);
        window.addEventListener('keyup', (evt) => {
            this.filterEvent(evt);
            // sample.handleControls(evt, 'keyup');
            store.dispatch({
                type: "COMMAND",
                payload: {
                    key: evt.keyCode,
                    isDown: false
                }
            });
        }, false);

        this.canvas.addEventListener('mousedown', (e) => {
            this.canvas.onmousemove = function (e) {
                store.dispatch({
                    type: "COMMAND",
                    payload: {
                        btn: e.button,
                        moveX: e.movementX,
                        moveY: e.movementY
                    }
                });
            }
            store.dispatch({
                type: "COMMAND",
                payload: {
                    btn: e.button,
                    isDown: true
                }
            });
        }, false);

        this.canvas.addEventListener('mouseup', (e) => {
            store.dispatch({
                type: "COMMAND", payload: {
                    btn: e.button,
                    isDown: false
                }
            });
            this.canvas.onmousemove = null;
        }, false);
    }

    initOrbit() {
        const orbitCtrl = new OrbitControls(this.camera, this.canvas);
        orbitCtrl.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        orbitCtrl.dampingFactor = 0.05;
        orbitCtrl.screenSpacePanning = false;
        orbitCtrl.minDistance = 100;
        orbitCtrl.maxDistance = 500;
        orbitCtrl.maxPolarAngle = Math.PI / 2;
        return orbitCtrl;
    }

    initTransform() {
        const transfCtrl = new TransformControls(this.camera, this.canvas);
        return transfCtrl;
    }

    initFly() {
        const flyCtrl = new FlyControls(this.camera, this.canvas);
        flyCtrl.movementSpeed = 100;
        // flyCtrl.domElement = this.canvas;
        flyCtrl.rollSpeed = Math.PI / 24;
        flyCtrl.autoForward = false;
        flyCtrl.dragToLook = false;
        return flyCtrl;
    }

    // switchControls() {
    //     Object.keys(this.Controls).forEach((val, idx, arrKeys) => {
    //         if (val === this.ctrl) {
    //             this.ctrl = arrKeys[(idx + 1) % (arrKeys.length)];
    //             console.log("switching control from: " + val + " to " + this.ctrl);
    //         }
    //     });
    // }

    /**
     * Used to filter events by stopping their propagation
     * For instance avoid tab from going to browser elements
     * @param event 
     */
    filterEvent(event: KeyboardEvent) {
        switch (event.keyCode) {
            case 9: {
                // event.stopPropagation();
                event.preventDefault();
                break;
            }
            // case 37:
            // case 38:
            // case 39:
            // case 40: {
            //     // console.log(store.getState().Voxels.raycast.locked);
            //     if (store.getState().Voxels.raycast.locked) {
            //         console.log("intercepted key event "+event.keyCode);
            //         event.stopPropagation();
            //         event.preventDefault();
            //     }
            //     break;
            // }
        }
    }

    update(delta: any) {
        // this.switchControls();
        if(ControlManager.control instanceof OrbitControls) ControlManager.control.update();
        // this.CONTROLS.ORBIT.update();
        // this.CONTROLS.FLY.movementSpeed = 0.33 * d;
        // this.CONTROLS.FLY.update(delta);
    }
}