///<reference path="../dts/misc-types-extend.d.ts" />
import React, { useRef, useEffect, useState } from "react";
import { useFrame, extend, useThree, Canvas } from "react-three-fiber";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import BoxListHlp, { BoxMovableEntity } from "../components/Helpers/BoxListHlp";
import { Box3, Vector3, Matrix4 } from "three";
import { useSampleStates } from "../common/SampleStates";
import { inherits } from "util";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            orbitControls: any;
            transformControls: any;
        }
    }
}

extend({ OrbitControls })
extend({ TransformControls })

export const Wrapper = (props: any) => {
    const {
        gl,                           // WebGL renderer
        // scene,                        // Default scene
        // camera,                       // Default camera
        // size,                         // Bounds of the view (which stretches 100% and auto-adjusts)
        // viewport,                     // Bounds of the viewport in 3d units + factor (size/viewport)
        // aspect,                       // Aspect ratio (size.width / size.height)
        // mouse,                        // Current 2D mouse coordinates
        // clock,                        // THREE.Clock (useful for useFrame deltas)
        // invalidate,                   // Invalidates a single frame (for <Canvas invalidateFrameloop />)
        // intersect,                    // Calls onMouseMove handlers for objects underneath the cursor
        // setDefaultCamera,             // Sets the default camera
    } = useThree();

    gl.setClearColor(0x000000);
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;

    return (<>

    </>)
}

export const Controls = () => {
    const orbitRef: any = useRef()
    const transfCtrlRef: any = useRef()

    const { camera, gl } = useThree()
    const { setTransfCtrl } = useSampleStates()

    useFrame(() => {
        orbitRef.current.update();
    })

    useEffect(() => {
        setTransfCtrl(transfCtrlRef.current);
        transfCtrlRef.current.addEventListener('dragging-changed', (event: any) =>
            orbitRef.current.enabled = !event.value);
    }, []);

    return (
        <>
            <orbitControls ref={orbitRef} args={[camera, gl.domElement]} enableDamping dampingFactor={0.1} rotateSpeed={0.5} />
            <transformControls ref={transfCtrlRef} args={[camera, gl.domElement]} />
        </>
    )
};

export const Lights = (props: any) => {
    const lt: any = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        // mesh.current.rotation.y += 0.01;
        lt.current.position.x = 50 * Math.sin(time / 2);
        lt.current.position.z = 50 * Math.cos(time / 2);
    });

    return (<>
        <spotLight ref={lt} intensity={1} position={[30, 30, 50]} angle={0.2} penumbra={1} castShadow />
    </>)
}

export default ({ Sample }: { Sample: any }) => {
    // const ctrl: any = useRef();
    return (
        <Canvas
            gl2
            camera={{ position: [100, 50, 100] }}
        // onCreated={({ gl }) => ((gl.shadowMap.enabled = true), (gl.shadowMap.type = THREE.PCFSoftShadowMap))}>
        >
            <ambientLight intensity={2} />
            <Wrapper />
            <Lights />
            <Controls />
            <Sample />
        </Canvas>
    )
};

// export default DemoTemplate;