///<reference path="../../dts/ammo.d.ts" />
import React, { Component, Suspense, useRef } from "react";
import * as THREE from 'three';
import { ControlManager } from '../../common/Controls';
import { PhysAmmo, AmmoLib } from "../../common/PhysAmmo"
import { SampleProps, SAMPLE_TYPE } from "../../common/constants";
import { Canvas, useThree, useFrame } from "react-three-fiber";

type EngineState = SampleProps;

export default class Engine extends Component<SampleProps, EngineState> {

    static canvas: any;// HTMLCanvasElement
    static camera: any;
    static scene: THREE.Scene;
    static physWorld: any;
    static ctrl: ControlManager;
    static clk: any;
    static initialized = false;
    static legacyMode: boolean;

    constructor(props: SampleProps) {
        super(props);
        Engine.legacyMode = (props.sample.type === SAMPLE_TYPE.LEGACY)
    }

    runSample(testId: string) {
        // this[testId]();  // doesn't work in TS
    };

    static Init() {
        var phys = new PhysAmmo();
        Engine.physWorld = phys.physicsWorld
        Engine.physWorld.setGravity(new AmmoLib.btVector3(0, - 6, 0));
        Engine.ctrl = new ControlManager(Engine.camera, Engine.canvas);
        Engine.initialized = true;
    }

    componentDidMount() {
        if (Engine.legacyMode && !Engine.initialized) {
            ThreeGraphics.InitSingleton();
            window.onresize = ThreeGraphics.onWindowResize;
            Engine.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.5, 2000000);
            Engine.scene = new THREE.Scene();
            Engine.clk = new THREE.Clock();
            Engine.Init();
            renderLoop();
        }
        setTimeout(() => this.runSample("default"), 100);
    }

    render() {
        if (!Engine.legacyMode) {
            return (
                <Canvas>
                    <FiberEngineWrapper />
                </Canvas>
            )
        } else {
            return (
                <canvas ref={element => Engine.canvas = element} />
            );
        }
        // return (
        //     <canvas ref={element => this.canvasElt = element} />
        // );
    }
}
/**
 * Infinite loop
 */
export const renderLoop = () => {
    requestAnimationFrame(renderLoop);
    mainLoop();
    // Legacy.renderer.render(Legacy.scene, Legacy.camera)
    ThreeGraphics.Renderer.render(Engine.scene, Engine.camera);
};

export const mainLoop = () => {
    const deltaTime = Engine.clk.getDelta();
    const elapsedTime = Engine.clk.getElapsedTime();
    Engine.ctrl.update(deltaTime);
    // Legacy.physWorld.stepSimulation(deltaTime, 10);;     // physical dynamic scene objects updated 
    // Legacy.sample.animate(deltaTime, elapsedTime);    // scene objects will be updated
}

class ThreeGraphics {
    static Renderer: THREE.WebGLRenderer;

    static InitSingleton = () => {
        var canvas = Engine.canvas;
        var context: any = canvas.getContext('webgl2');
        ThreeGraphics.Renderer = new THREE.WebGLRenderer({ canvas: canvas, context: context, antialias: true, alpha: true })
        ThreeGraphics.Renderer.setSize(window.innerWidth, window.innerHeight);
        const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
        ThreeGraphics.Renderer.setPixelRatio(DPR);
        ThreeGraphics.Renderer.setClearColor(0x000000);
        ThreeGraphics.Renderer.shadowMap.enabled = true;
        ThreeGraphics.Renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        // this.renderer.gammaInput = true;
        // this.renderer.gammaOutput = true;
        canvas.style.height = "100%";
        canvas.style.width = "100%";
    }

    static onWindowResize = () => {
        if (Engine.camera instanceof THREE.PerspectiveCamera) {
            Engine.camera.aspect = window.innerWidth / window.innerHeight;
        }
        Engine.camera.updateProjectionMatrix();

        ThreeGraphics.Renderer.setSize(window.innerWidth, window.innerHeight);
        var canvas = ThreeGraphics.Renderer.domElement;
        canvas.style.height = "100%";
        canvas.style.width = "100%";
    }
}

/**
 * populate legacy with hooks from fiber 
 */

const FiberEngineWrapper = () => {
    const {
        gl,                           // WebGL renderer
        scene,                        // Default scene
        camera,                       // Default camera
        size,                         // Bounds of the view (which stretches 100% and auto-adjusts)
        viewport,                     // Bounds of the viewport in 3d units + factor (size/viewport)
        aspect,                       // Aspect ratio (size.width / size.height)
        mouse,                        // Current 2D mouse coordinates
        clock,                        // THREE.Clock (useful for useFrame deltas)
        invalidate,                   // Invalidates a single frame (for <Canvas invalidateFrameloop />)
        intersect,                    // Calls onMouseMove handlers for objects underneath the cursor
        setDefaultCamera,             // Sets the default camera
    } = useThree();

    // init global Legacy 
    if (!Engine.initialized) {
        Engine.canvas = gl.domElement;
        Engine.camera = camera;
        Engine.scene = scene;
        Engine.clk = clock;
        Engine.Init();
        // Engine.runSample("default");
    }

    useFrame(() => {
        mainLoop();
    });

    return (<></>)
}