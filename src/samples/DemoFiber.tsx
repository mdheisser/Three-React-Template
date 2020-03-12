///<reference path="../dts/misc-types-extend.d.ts" />
import React, { useRef, useCallback, useEffect } from "react";
import { Canvas } from "react-three-fiber";
import { Material, CATALOG } from "../resources/catalogs/Materials";
import { SampleProps } from "../legacy/constants";
import InfoOverlay from "../components/UI/InfoOverlay";
import TimelineWidget from "../components/UI/TimelineWidget";
import { Wrapper, Lights, Controls } from "./BasicTemplate";
import { useSampleStates } from "../common/SampleStates";



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

const Moveable = (props: any) => {
    const { transfCtrl } = useSampleStates();

    const onClick = useCallback(
        e => {
            e.stopPropagation();
            transfCtrl.attach(e.object);
        },
        [transfCtrl]
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
        <Material name={CATALOG.SAND} repeat={1} />
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
                <Controls/>
                <Static />
                <Moveable />
            </Canvas>
        </>
    )
};

// export default DemoTemplate;