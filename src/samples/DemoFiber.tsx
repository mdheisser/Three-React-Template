///<reference path="../dts/misc-types-extend.d.ts" />
import React, { useRef, useCallback, useEffect } from "react";
import { useFrame, extend, useThree, Canvas } from "react-three-fiber";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { Material, MAT } from "../common/catalogs/MaterialsFiber";
import { SampleProps } from "../common/constants";
import InfoOverlay from "../components/UI/InfoOverlay";
import TimelineWidget from "../components/UI/TimelineWidget";

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
        size,                         // Bounds of the view (which stretches 100% and auto-adjusts)
        viewport,                     // Bounds of the viewport in 3d units + factor (size/viewport)
        aspect,                       // Aspect ratio (size.width / size.height)
        mouse,                        // Current 2D mouse coordinates
        clock,                        // THREE.Clock (useful for useFrame deltas)
        invalidate,                   // Invalidates a single frame (for <Canvas invalidateFrameloop />)
        intersect,                    // Calls onMouseMove handlers for objects underneath the cursor
        setDefaultCamera,             // Sets the default camera
    } = useThree();

    gl.setClearColor(0x000000);
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;

    return (<>

    </>)
}

const Helpers = (props: any) => {
    return (<>
        <gridHelper args={[props.size, 10]} />
        <axesHelper args={[props.size / 2]} />
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

const Static = () => {
    var grp = [];

    var plane = <mesh rotation-x={Math.PI / 2} receiveShadow>
        <planeGeometry attach="geometry" args={[50, 50]} />
        <Material name={MAT.SAND} repeat={1} />
    </mesh>

    grp.push(plane);

    return (<>
        <group>{grp}</group>;
    </>)
}

const Moveable = (props: any) => {
    const onClick = useCallback(
        e => {
            e.stopPropagation();
            props.ctrl.current.attach(e.object);
        },
        []
    );

    var grp = [];

    var cube = <mesh
        // ref={mesh}
        position={[0, 0, 0]}
        castShadow
        onClick={e => onClick(e)}
    //   onPointerOver={e => onHover(e, true)}
    //   onPointerOut={e => onHover(e, false)}
    >
        <boxBufferGeometry attach="geometry" args={[10, 10, 10]} />
        <Material name={MAT.SAND} repeat={1} />
    </mesh>

    grp.push(cube);

    return (<>
        <group>{grp}</group>;
    </>)
}



const UI = ({ sample }: SampleProps) => {

    const handleTimelineEvt = (data: any) => {
        console.log(data);
        // this.props.dispatch({
        //     type: "TIMING", payload: {
        //         hour: data.time.getHours(),
        //         min: data.time.getMinutes()
        //     }
        // });
    }

    return (<>
        <InfoOverlay sample={sample} />
        <TimelineWidget className="timeline" onTimeChange={handleTimelineEvt} />
    </>)
}

export default ({ sample }: SampleProps) => {
    const ctrl: any = useRef();

    return (
        <>
            <UI sample={sample} />
            <Canvas
                camera={{ position: [15, 30, 50] }}
            // onCreated={({ gl }) => ((gl.shadowMap.enabled = true), (gl.shadowMap.type = THREE.PCFSoftShadowMap))}>
            >
                <Wrapper />
                <Lights />
                <Helpers size={128} />
                <Controls ref={ctrl} />
                <Static />
                <Moveable ctrl={ctrl} />
            </Canvas>
        </>
    )
};

// export default DemoTemplate;