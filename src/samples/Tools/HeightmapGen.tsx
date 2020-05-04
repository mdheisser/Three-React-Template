///<reference path="../../dts/misc-types-extend.d.ts" />
import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import {
  InfoOverlay,
  CaseSelector,
} from "../../modules/UI/Overlay";
import { Vector2 } from "three";
import * as HeightFunctions from "../../resources/catalogs/misc/heightFunctions";
import { projectGeoData, ptsListHeighFn, DEFAULT_GEODATA_INPUT } from "../../modules/Geo/GeoTools";
import { TextBox } from "../../modules/Geo/UI/input";
import { CanvasOverlay } from "../../modules/Heightmap/UI/canvas";
// import geoData from "../../resources/assets/oth/geodata.json";

const W = 256;
const H = 256;
let geoFunc = (v: Vector2) => 0;  // dummy func until set later
const HEIGHTFUNCS: any = { ...HeightFunctions, geoFunc };
const ALL_CASES = [...Object.keys(HEIGHTFUNCS)];


export default ({ sample }: any) => {
  const [currCase, setCurrCase] = useState(0);

  const selectCase = ALL_CASES[currCase]
  const currFunc = HEIGHTFUNCS[selectCase]

  const onCaseChange = (caseId: any) => {
    console.log("switch to case " + caseId);
    setCurrCase(parseInt(caseId));
  };

  const handleSubmit = (evt: ChangeEvent, txt: string) => {
    evt.preventDefault();
    const data = JSON.parse(txt);
    processCustData(data);
  }

  const processCustData = async (inputData: any) => {
    const pts = await projectGeoData(inputData);
    let geoFunc = ptsListHeighFn(pts); // generate HeightFunc from geodata list
    HEIGHTFUNCS['geoFunc'] = geoFunc; // update geoFunc in HEIGHTFUNC catalog
    // force refresh
    setCurrCase(0);
    setCurrCase(currCase);
  }

  useEffect(() => {
    // (async () => {
    //   const pts = await projectGeoData(geoData);  
    //   let geoFunc = ptsListHeighFn(pts); // generate HeightFunc from geodata list
    //   HEIGHTFUNCS['geoFunc'] = geoFunc; // update geoFunc in HEIGHTFUNC catalog
    // })();

  }, [])

  // compute the height arr that will fill canvas
  const arr: any = Array(W * H).keys();
  const heightArr = [...arr]
    .map((elt, i) => new Vector2(i % W, Math.floor(i / W)))
    .map(pt => currFunc(pt));
  // .map(v2 => 0.25 + noise(v2) / 2);

  return (
    <>
      <InfoOverlay sample={sample} />
      <CaseSelector
        items={ALL_CASES}
        current={currCase}
        onSelect={onCaseChange}
      />
      {selectCase === "geoFunc" ? <TextBox handleSubmit={handleSubmit} defaultValue={JSON.stringify(DEFAULT_GEODATA_INPUT, null, 4)} />: ""}
      <CanvasOverlay width={W} height={H} pointsBuff={heightArr} />
    </>
  );
};
