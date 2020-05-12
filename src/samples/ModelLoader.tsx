///<reference path="../dts/misc-types-extend.d.ts" />
import React, {
  Suspense,
  useEffect,
  FormEvent,
  useState
} from "react";
import { Canvas, useThree } from "react-three-fiber";
import { InfoOverlay, CaseSelector } from "../modules/UI/Overlay";
import { Controls, Wrapper, Helpers } from "./BasicDemo";

import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useSampleStates } from "../common/states";

import * as Models from "../resources/catalogs/Models";
import { focusOnObjects } from "../modules/tools/CamUtils";
import { Scene } from "three";

const Asset = ({ url }: { url: string }) => {
  const gltf = useLoader(GLTFLoader, url);
  const ctrl = useSampleStates(state => state.controls);
  const cam: any = useThree().camera;
  const sce: Scene = useThree().scene;

  useEffect(() => {
    focusOnObjects([gltf.scene], 1.2, ctrl, cam);
    console.log(sce.children[3].children[0]);
  });

  return <primitive object={gltf.scene} dispose={null} />;
};

const CustomUrl = ({ onSubmitUrl }: any) => {
  // enter an asset url here (local or external)
  const [url, setUrl] = useState("");
  const handleChange = (event: any) => {
    setUrl(event.target.value);
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmitUrl(url);
  };

  return (
    <>
      <form id="assetUrl" onSubmit={handleSubmit} className="overlay centered">
        <label>
          {/* asset url  &nbsp; */}
          <input
            type="text"
            className="inputField"
            value={url ? url : ""}
            placeholder="Enter asset url here"
            onChange={handleChange}
          />
          &nbsp;&nbsp;
        </label>
        <input type="submit" value="set" className="inputBtn" />
      </form>
    </>
  );
};

const MODELS: any = Models;
const ALL_CASES = ["...custom url", ...Object.keys(MODELS)];

export default ({ args }: any) => {
  const [assetUrl, setAssetUrl] = useState("");
  const [currCase, setCurrCase] = useState(1);

  // const sample = useSampleStates(state => state.sample);   // get sample from global states instead of from props to subscribe updates
  const { sampleName, sampleDesc, caseSelect, extAssetUrl } = args;
  const onCaseChange = (caseId: any) => {
    console.log("switch case to: " + caseId);
    setCurrCase(parseInt(caseId));
  };
  const onAssetUrlChange = (url: string) => {
    console.log("asset url set to: " + url);
    setAssetUrl(url);
  };

  useEffect(() => {
    const caseName: any = ALL_CASES[currCase];
    const url =
      currCase > 0 ? MODELS[caseName] : extAssetUrl ? extAssetUrl : assetUrl;
    setAssetUrl(url);
  }, [currCase]);

  useEffect(() => {
    // check if custom case was provided
    if (
      caseSelect !== undefined &&
      caseSelect !== null &&
      caseSelect !== ""
    ) {
      setCurrCase(caseSelect);
    }
    // check custom asset passed through url params
    else if (extAssetUrl) {
      setCurrCase(0);
    }
  }, []);

  return (
    <>
      <InfoOverlay sampleName={sampleName} sampleDesc={sampleDesc} />
      {currCase === 0 && !extAssetUrl ? (
        <CustomUrl onSubmitUrl={onAssetUrlChange} />
      ) : (
          ""
        )}
      {!extAssetUrl ? (
        <CaseSelector
          items={ALL_CASES}
          current={currCase}
          onSelect={onCaseChange}
        />
      ) : (
          ""
        )}
      <Canvas camera={{ position: [100, 50, 100] }}>
        <ambientLight intensity={2} />
        <Helpers size={128} />
        <Wrapper />
        <Controls />
        {assetUrl ? (
          <Suspense fallback={null}>
            <Asset url={assetUrl} />
          </Suspense>
        ) : (
            ""
          )}
      </Canvas>
    </>
  );
};
