///<reference path="../../dts/misc-types-extend.d.ts" />
import React, { useState, useEffect } from "react";
import {
  InfoOverlay,
  CanvasOverlay,
  CaseSelector
} from "../../modules/UI/Overlay";
import { Vector2 } from "three";
import * as HeightFunctions from "../../resources/catalogs/misc/heightFunctions";
import { projectGeoData, ptsListHeighFn } from "../../modules/tools/GeoUtils";
import geoData from "../../resources/assets/oth/geodata.json";

const W = 256;
const H = 256;
export default ({ sample }: any) => {
  const [currCase, setCurrCase] = useState(0);
  const [func, setFunc]: any = useState();

  let geoFunc = (p: Vector2) => 0;
  //ptsListHeighFn(pts) //geodata_lerp(geoData);
  const HEIGHTFUNCS: any = { ...HeightFunctions, geoFunc };
  const ALL_CASES = [...Object.keys(HEIGHTFUNCS)];


  const onCaseChange = (caseId: any) => {
    console.log("switch to case " + caseId);
    setCurrCase(parseInt(caseId));
    setFunc(HEIGHTFUNCS[ALL_CASES[caseId]])
  };

  // const func = HEIGHTFUNCS[ALL_CASES[currCase]];

  const arr: any = Array(W * H).keys();
  const heightArr = func? [...arr]
    .map((elt, i) => new Vector2(i % W, Math.floor(i / W)))
    .map(v2 => func(v2)):[];
  // .map(v2 => 0.25 + noise(v2) / 2);

  useEffect(() => {
    (async () => {
      const pts = await projectGeoData(geoData);
      geoFunc = ptsListHeighFn(pts);
    })();

  }, [])

  return (
    <>
      <InfoOverlay sample={sample} />
      <CaseSelector
        items={ALL_CASES}
        current={currCase}
        onSelect={onCaseChange}
      />
      <CanvasOverlay width={W} height={H} pointsBuff={heightArr} />
    </>
  );
};
