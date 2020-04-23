///<reference path="../dts/misc-types-extend.d.ts" />
import React, { useRef, useEffect, useCallback, useState } from "react";
import * as THREE from "three";
import { useFrame, extend, useThree, Canvas } from "react-three-fiber";
import { Material, CATALOG } from "../resources/catalogs/Materials";
import { useSampleStates } from "../common/SampleStates";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { InfoOverlay } from "../components/UI/Overlay";
import { InputCtrl } from "../components/Helpers/BoxEntityCtrlHlp";

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
    const orbitRef: any = useRef();

    const { camera, gl }: any = useThree()
    const setControls = useSampleStates(state => state.setControls)

    useFrame(() => {
        orbitRef.current.update();
    })

    useEffect(() => {
        setControls(orbitRef.current)

    }, []);

    return (
        <>
            <orbitControls ref={orbitRef} args={[camera, gl.domElement]} enableDamping dampingFactor={0.1} rotateSpeed={0.5} />
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

export const Helpers = (props: any) => {
    return (<>
        <gridHelper args={[props.size, 10]} />
        <axesHelper args={[props.size / 2]} />
    </>)
}

const Static = () => {
    var grp = [];

    var plane = <mesh rotation-x={Math.PI / 2} receiveShadow>
        <planeGeometry attach="geometry" args={[50, 50]} />
        <Material name={CATALOG.SAND} repeat={1} />
    </mesh>

    grp.push(plane);

    return (<>
        <group>{grp}</group>;
    </>)
}

const Moveable = () => {
    const [isSelected, setIsSelected] = useState(false);
    const cubeRef: any = useRef();

    const onClick = useCallback(
        e => {
            e.stopPropagation();
            setIsSelected(true);
        },
        []
    );

    // assign input control if object is selected
    const inputCtrl = isSelected ? <InputCtrl /*ref={ghostRef}*/ onChange={null} object={cubeRef.current} /> : "";

    return (<>
        {inputCtrl}
        <mesh
            ref={cubeRef}
            position={[0, 0, 0]}
            castShadow
            onClick={e => onClick(e)}
        //   onPointerOver={e => onHover(e, true)}
        //   onPointerOut={e => onHover(e, false)}
        >
            <boxBufferGeometry attach="geometry" args={[10, 10, 10]} />
            <Material name={CATALOG.SAND} repeat={1} />
        </mesh>
    </>)
}

export default ({ sample }: any) => {

    return (
        <>
            <InfoOverlay sample={sample} />
            <Canvas gl2 camera={{ position: [15, 30, 50] }}
            // onCreated={({ gl }) => ((gl.shadowMap.enabled = true), (gl.shadowMap.type = THREE.PCFSoftShadowMap))}>
            >
                <Wrapper />
                <Lights />
                <Helpers size={128} />
                <Controls />
                <Static />
                <Moveable />
            </Canvas>
        </>
    )
};