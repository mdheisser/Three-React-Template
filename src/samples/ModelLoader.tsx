///<reference path="../dts/misc-types-extend.d.ts" />
import React, { useState, useRef, useEffect, Suspense } from "react";
import { Box3, Vector3, Matrix4 } from "three";
import { BoxSplitter } from "../components/Utils/BoxUtils";
import { useFrame, useThree, Canvas } from "react-three-fiber";
import { BoxEntityCtrlHlp } from "../components/Helpers/BoxEntityCtrlHlp";
import { useSampleStates } from "../common/SampleStates";
import { InfoOverlay } from "../components/UI/Overlay";
import { Controls, Wrapper, Helpers } from "./BasicDemo";

import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import toto from '../resources/assets/img/sand.jpg'

function Asset({ url }: { url: string }) {
    const gltf = useLoader(GLTFLoader, url)
    return <primitive object={gltf.scene} dispose={null} />
}


export default ({ sample }: any) => {
    return (<>
        <InfoOverlay sample={sample} />
        <Canvas camera={{ position: [100, 50, 100] }}>
            <ambientLight intensity={2} />
            <Helpers size={128} />
            <Wrapper />
            <Controls />
            <Suspense fallback={null}>
                <Asset url="https://github.com/google/model-viewer/blob/master/packages/shared-assets/models/Astronaut.glb?raw=true" />
            </Suspense>
        </Canvas>
    </>)
};