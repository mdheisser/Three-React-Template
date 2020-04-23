///<reference path="../dts/misc-types-extend.d.ts" />
import React, { Suspense, useEffect } from "react";
import { Canvas, useThree } from "react-three-fiber";
import { InfoOverlay, CaseSelector } from "../components/UI/Overlay";
import { Controls, Wrapper, Helpers } from "./BasicDemo";

import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useSampleStates } from "../common/SampleStates";

import * as Models from '../resources/catalogs/Models'
import { focusOnObjects } from "../common/tools/CamUtils";

function Asset({ url }: { url: string }) {
    const gltf = useLoader(GLTFLoader, url);
    const ctrl = useSampleStates(state => state.controls);
    const cam: any = useThree().camera;
    const sce: any = useThree().scene;

    useEffect(() => {
        focusOnObjects([gltf.scene], 1.2, ctrl, cam);
        console.log(sce)
    })

    return <primitive object={gltf.scene} dispose={null} />
}

export default (/*{ sample }: any*/) => {
    // (async () => {
    //     try {
    //         let response = await fetch(sample.assetUrl, {
    //             mode: 'cors',
    //        });
    //         console.log(response)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // })();
    const sample = useSampleStates(state => state.sample);   // get sample from states instead of from props to subscribe updates
    const caseNb: any = (sample.caseNb !== undefined && sample.caseNb !== null && sample.caseNb !== "") ? sample.caseNb : 1;
    const models: any = Models;
    const caseId: any = Object.keys(Models)[caseNb];
    const model = models[caseId];

    return (<>
        <InfoOverlay sample={sample} />
        <CaseSelector sampleCases={Object.keys(Models)} caseId={caseNb} />
        <Canvas camera={{ position: [100, 50, 100] }}>
            <ambientLight intensity={2} />
            <Helpers size={128} />
            <Wrapper />
            <Controls />
            <Suspense fallback={null}>
                <Asset url={sample.assetUrl ? sample.assetUrl : model} />
            </Suspense>
        </Canvas>
    </>)
};