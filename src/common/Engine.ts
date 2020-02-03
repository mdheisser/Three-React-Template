///<reference path="../dts/ammo.d.ts" />
import * as THREE from 'three';
import * as Ammo from 'three/examples/js/libs/ammo';
import { ControlManager } from './Controls';
import { getSample } from '../SampleListing';
import { Sample } from './Sample';
import store from '../redux/store'


/**
 * Graphics, Physics engines, 
 * + Controls, Sample loader init.
 * The interface between web and webgl(ThreeJS).
 * From this point no more react stuff (notice file extension changed from TSX to TS)
 */

export class Engine {

    // Wrappers
    static clk = new THREE.Clock();
    static AmmoLib: any;
    static scene: THREE.Scene;
    static camera: THREE.PerspectiveCamera;
    static ctrl: ControlManager;
    static sample: Sample;
    static dynObjs: any[];
    static physWorld: any;


    static start(canvas: HTMLCanvasElement, sampleType: string, sampleName: string){
        Graphics.InitSingleton(canvas);
        window.onresize = Graphics.onWindowResize;
        Engine.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.5, 2000000);
        Engine.scene = new THREE.Scene();
        var phys = new Physics();
        Engine.physWorld = phys.physicsWorld
        Engine.physWorld.setGravity(new Physics.AmmoLib.btVector3(0, - 6, 0));
        Engine.AmmoLib = Physics.AmmoLib;
        Engine.ctrl = new ControlManager(Engine.camera, canvas);
        Engine.sample = getSample(sampleType, sampleName);
        Engine.sample.run(store.getState().DemoSamples.sampleId);   // used for test samples
        Engine.mainLoop();
    }

    /**
     * Infinite loop
     */
    static mainLoop = () => {
        requestAnimationFrame(Engine.mainLoop);
        const deltaTime = Engine.clk.getDelta();
        const elapsedTime = Engine.clk.getElapsedTime();
        Engine.ctrl.update(deltaTime);
        Engine.physWorld.stepSimulation(deltaTime, 10);;     // physical dynamic scene objects updated 
        Engine.sample.animate(deltaTime, elapsedTime);    // scene objects will be updated
        Graphics.Renderer.render(Engine.scene, Engine.camera);
    };

    
}

class Graphics {
    static Renderer: THREE.WebGLRenderer;

    static InitSingleton = (canvas: HTMLCanvasElement) => {
        var context: any = canvas.getContext('webgl2');
        Graphics.Renderer = new THREE.WebGLRenderer({ canvas: canvas, context: context, antialias: true, alpha: true })
        Graphics.Renderer.setSize(window.innerWidth, window.innerHeight);
        const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
        Graphics.Renderer.setPixelRatio(DPR);
        Graphics.Renderer.setClearColor(0x000000);
        Graphics.Renderer.shadowMap.enabled = true;
        Graphics.Renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        // this.renderer.gammaInput = true;
        // this.renderer.gammaOutput = true;
        canvas.style.height = "100%";
        canvas.style.width = "100%";
    }

    static onWindowResize = () => {
        Engine.camera.aspect = window.innerWidth / window.innerHeight;
        Engine.camera.updateProjectionMatrix();

        Graphics.Renderer.setSize(window.innerWidth, window.innerHeight);
        var canvas = Graphics.Renderer.domElement;
        canvas.style.height = "100%";
        canvas.style.width = "100%";
    }
}



class Physics {
    static AmmoLib: any;
    dynamicObj = [];
    // Physics variables
    collisionConfiguration: any;
    dispatcher: any;
    broadphase: any;
    solver: any;
    physicsWorld: any;

    constructor() {
        Physics.load();
        this.init();
    }

    static load = () => {
        Ammo().then((ammo: any) => {
            Physics.AmmoLib = ammo;
            // init();
            // animate();
            console.log("Ammo loaded")
        });
    }

    init() {
        // Physics configuration
        this.collisionConfiguration = new Physics.AmmoLib.btDefaultCollisionConfiguration();
        this.dispatcher = new Physics.AmmoLib.btCollisionDispatcher(this.collisionConfiguration);
        this.broadphase = new Physics.AmmoLib.btDbvtBroadphase();
        this.solver = new Physics.AmmoLib.btSequentialImpulseConstraintSolver();
        this.physicsWorld = new Physics.AmmoLib.btDiscreteDynamicsWorld(this.dispatcher, this.broadphase, this.solver, this.collisionConfiguration);
        this.physicsWorld.setGravity(new Physics.AmmoLib.btVector3(0, - 6, 0));
    }

}
