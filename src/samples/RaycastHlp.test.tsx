///<reference path="../dts/misc-types-extend.d.ts" />
import React, { useRef, useEffect, useCallback, useState } from "react";
import { extend, Canvas } from "react-three-fiber";
import RaycastHLP from '../components/Helpers/RaycastHlp'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { InfoOverlay, CaseSelector } from "../components/UI/Overlay";
import { Controls } from "./BasicDemo";
import { useSampleStates } from "../common/SampleStates";

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

// TestCase #0
const Cube = () => {
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
// TestCase #1
const Sphere = () => {
    const [raycasted, setRaycasted] = useState({ index: null });

    const onHover = useCallback(
        (e, value) => {
            // e.stopPropagation();
            setRaycasted(e);
        }, []);

    return (
        <>
            <RaycastHLP input={raycasted} />
            <mesh position={[0, 0, 0]} onPointerMove={e => onHover(e, true)}>
                <sphereBufferGeometry attach="geometry" args={[15, 6, 6]} />
                <meshBasicMaterial attach="material" color="#000000" wireframe />
            </mesh>
        </>
    );
}

// TestCase #2
const Plane = () => {
    const [raycasted, setRaycasted] = useState({ index: null });

    const onHover = useCallback(
        (e, value) => {
            e.stopPropagation();
            setRaycasted(e);
        }, []);

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

const TestCases = [Cube, Sphere, Plane];

export default (/*{ sample }: any*/) => {
    const sample = useSampleStates(state => state.sample);   // get sample from states instead of from props to subscribe updates
    const caseNb = (sample.caseNb !== undefined && sample.caseNb !== null && sample.caseNb !== "") ? sample.caseNb : 0;
    const TestCase = TestCases[caseNb];

    return (
        <>
            <InfoOverlay sample={sample} />
            <CaseSelector sampleCases={TestCases.map(elt=>elt.name)} caseId={caseNb} />
            <Canvas gl2 camera={{ position: [50, 25, 50] }}>
                <Controls />
                <TestCase />
            </Canvas>
        </>
    )
};