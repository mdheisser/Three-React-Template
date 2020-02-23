///<reference path="../dts/misc-types-extend.d.ts" />
import React, { useRef, useEffect, useCallback, useState } from "react";
import { useFrame, extend, useThree, Canvas } from "react-three-fiber";
import { Material, MAT } from "../resources/catalogs/Materials";
import RaycastHLP from '../components/Helpers/RaycastHlp'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import * as THREE from "three";

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

// Cube
const TestCase = () => {
    var meshRef: any = useRef();
    const [raycasted, setRaycasted]: any = useState({});

    useEffect(() => {
        // console.log(meshRef);
        console.log("face index: %s", raycasted ? raycasted.faceIndex : "");
    }, [raycasted.faceIndex])

    const onHover = useCallback(
        (e, entering?) => {
            const dummy = (entering === undefined) ? "" : (entering ? console.log("Pointer Enters") : console.log("Pointer Leaves"));
            e.stopPropagation();
            setRaycasted(e);
        },
        []
    );

    return (
        <>
            <mesh ref={meshRef} position={[0, 0, 0]}
                onPointerMove={e => onHover(e)}
                onPointerOver={e => onHover(e, true)}
                onPointerOut={e => onHover(e, false)}
            >
                <boxBufferGeometry attach="geometry" args={[10, 10, 10]} />
                <meshBasicMaterial attach="material" color="#000000" wireframe />
            </mesh>
            <RaycastHLP input={raycasted} />
        </>
    );
}
// Sphere
const TestCase2 = () => {
    const [raycasted, setRaycasted] = useState({ index: null });

    const onHover = useCallback(
        (e, value) => {
            e.stopPropagation();
            setRaycasted(e);
        },[]);

    return (
        <>
            <mesh position={[0, 0, 0]} onPointerMove={e => onHover(e, true)}>
                <sphereBufferGeometry attach="geometry" args={[15, 6, 6]} />
                <meshBasicMaterial attach="material" color="#000000" wireframe />
            </mesh>
            <RaycastHLP input={raycasted} />
        </>
    );
}

// Plane
const TestCase3 = () => {
    const [raycasted, setRaycasted] = useState({ index: null });

    const onHover = useCallback(
        (e, value) => {
            e.stopPropagation();
            setRaycasted(e);
        },[]);

    return (
        <>
            <mesh position={[0, 0, 0]} onPointerMove={e => onHover(e, true)}>
                <planeBufferGeometry attach="geometry" args={[16, 16, 4, 4]} />
                <meshBasicMaterial attach="material" color="#000000" wireframe />
            </mesh>
            <RaycastHLP input={raycasted} />
        </>
    );
}

const TestCases = [TestCase, TestCase2, TestCase3];

const Controls = React.forwardRef(
    (props, forwardRef: any) => {
        const orbitRef: any = useRef()
        const { camera, gl } = useThree()
        useFrame(() => {
            orbitRef.current.update();
        })

        useEffect(() => {
            forwardRef.current.addEventListener('dragging-changed', (event: any) =>
                orbitRef.current.enabled = !event.value);
        });

        return (
            <>
                <orbitControls ref={orbitRef} args={[camera, gl.domElement]} enableDamping dampingFactor={0.1} rotateSpeed={0.5} />
                <transformControls ref={forwardRef} args={[camera, gl.domElement]} />
            </>
        )
    });


export default ({ caseNb = 1 }) => {
    const ctrl: any = useRef();
    const TestCase = TestCases[caseNb];

    return (
        <Canvas
            gl2
            camera={{ position: [0, 20, 70] }}
        // onCreated={({ gl }) => ((gl.shadowMap.enabled = true), (gl.shadowMap.type = THREE.PCFSoftShadowMap))}>
        >
            <ambientLight intensity={0.5} />
            <Controls ref={ctrl} />
            <TestCase />
        </Canvas>
    )
};