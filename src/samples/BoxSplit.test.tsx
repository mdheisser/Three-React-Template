///<reference path="../dts/misc-types-extend.d.ts" />
import React, { useRef, useCallback, useEffect } from "react";
import { useFrame, extend, useThree, Canvas } from "react-three-fiber";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { Material, MAT } from "../resources/catalogs/MaterialsFiber";
import BoxListHlp from "../components/Helpers/BoxListHlp";
import { Box3, Vector3 } from "three";

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

const Wrapper = (props: any) => {
    const {
        gl,                           // WebGL renderer
        scene,                        // Default scene
        camera,                       // Default camera
    } = useThree();

    gl.setClearColor(0x000000);
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;

    return (<>

    </>)
}

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
        }, []);

        return (
            <>
                <orbitControls ref={orbitRef} args={[camera, gl.domElement]} enableDamping dampingFactor={0.1} rotateSpeed={0.5} />
                <transformControls ref={forwardRef} args={[camera, gl.domElement]} />
            </>
        )
    });

const Lights = (props: any) => {
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

const TestCase1 = () => {
    var grp = [];

    var min = new Vector3(0, 0, 30);
    var max = new Vector3(50, 50, 60);
    var box = new Box3(min, max);
    // box.applyMatrix4(matrix);
    var min = new Vector3(0, 0, -15);
    var max = new Vector3(50, 50, 15);
    var box2 = new Box3(min, max);

    var boxes: Box3[] = [box, box2];

    return (<>
        <BoxListHlp boxes={boxes} selected={[0, 1]} />
    </>)
}

const TestCase2 = () => {
    var grp = [];

    var min = new Vector3(-92, -16, 36);
    var max = new Vector3(-36, 80, 92);
    var box = new Box3(min, max);
    // box.applyMatrix4(matrix);
    min = new Vector3(-92, -6.399999999999999, 36);
    max = new Vector3(-36, 70.4, 92);
    var box2 = new Box3(min, max);

    var boxes: Box3[] = [box, box2];

    return (<>
        <BoxListHlp boxes={boxes} selected={[0, 1]} />
    </>)
}

const TestCases = [TestCase1];


export default ({ caseNb = 1 }) => {
    const ctrl: any = useRef();
    const TestCase = TestCases[caseNb-1];
    return (
        <Canvas
            gl2
            camera={{ position: [100, 50, 100] }}
        // onCreated={({ gl }) => ((gl.shadowMap.enabled = true), (gl.shadowMap.type = THREE.PCFSoftShadowMap))}>
        >
            <ambientLight intensity={2} />
            <Wrapper />
            <Lights />
            <Controls ref={ctrl} />
            <TestCase/>
        </Canvas>
    )
};

// export default DemoTemplate;