///<reference path="../dts/misc-types-extend.d.ts" />
import React, { Suspense, useEffect, ChangeEvent, FormEvent, useState } from "react";
import { Canvas, useThree } from "react-three-fiber";
import { InfoOverlay, CaseSelector } from "../components/UI/Overlay";
import { Controls, Wrapper, Helpers } from "./BasicDemo";

import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useSampleStates } from "../common/SampleStates";

import * as Models from '../resources/catalogs/Models'
import { focusOnObjects } from "../common/tools/CamUtils";
import { Scene } from "three";

const Asset = ({ url }: { url: string }) => {
    const gltf = useLoader(GLTFLoader, url);
    const ctrl = useSampleStates(state => state.controls);
    const cam: any = useThree().camera;
    const sce: Scene = useThree().scene;

    useEffect(() => {
        focusOnObjects([gltf.scene], 1.2, ctrl, cam);
        console.log(sce.children[3].children[0])
    })

    return <primitive object={gltf.scene} dispose={null} />
}

const CustomUrl = ({ initUrl, onSubmitUrl }: any) => {
    // enter an asset url here (local or external)
    const [url, setUrl] = useState(initUrl);
    const handleChange = (event: any) => {
        setUrl(event.target.value);
    }
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onSubmitUrl(url);
    }

    return (<>
        <form onSubmit={handleSubmit} className="overlay centered">
            <label>
                {/* asset url  &nbsp; */}
                <input type="url" id="assetURL" value={url ? url : ""} onChange={handleChange} />
            &nbsp;&nbsp;
            </label>
            <input type="submit" value="custom url" className="inputBtn" />
        </form>
    </>)
}

const DEFAULT_CUSTOM_ASSET_URL = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF/Avocado.gltf";

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
    const onAssetUrlChange = (url: string) => {
        console.log("asset url set to: " + url)
    }
    const sample = useSampleStates(state => state.sample);   // get sample from states instead of from props to subscribe updates
    var caseId: number = 1;
    if (sample.case !== undefined && sample.case !== null && sample.case !== "") {
        caseId = parseInt(sample.case);
    }
    else if (sample.arg) {
        caseId = 0;
    }

    const allCases = ["...custom", ...Object.keys(Models)]
    const models: any = Models;
    const caseName: any = allCases[caseId];
    const assetUrl = caseId ? models[caseName] : sample.arg ? sample.arg : DEFAULT_CUSTOM_ASSET_URL;
    const custUrlInput = caseId ? "" : <CustomUrl initUrl={assetUrl} onSubmitUrl={onAssetUrlChange} />
    return (<>
        <InfoOverlay sample={sample} />
        {custUrlInput}
        <CaseSelector sampleCases={allCases} caseId={caseId} />
        <Canvas camera={{ position: [100, 50, 100] }}>
            <ambientLight intensity={2} />
            <Helpers size={128} />
            <Wrapper />
            <Controls />
            {assetUrl ?
                <Suspense fallback={null}>
                    <Asset url={assetUrl} />
                </Suspense> : ""}
        </Canvas>
    </>)
};