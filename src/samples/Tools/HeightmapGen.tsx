///<reference path="../../dts/misc-types-extend.d.ts" />
import React, { useState } from "react";
import {
  InfoOverlay,
  CanvasOverlay,
  CaseSelector
} from "../../modules/UI/Overlay";
import { Vector2 } from "three";
import * as HeightFunctions from "../../resources/catalogs/misc/heightFunctions";
import { geodata_lerp } from "../../modules/tools/GeoUtils";
// import geoData from "../../resources/assets/oth/geodata.json";

const geoFunc = geodata_lerp(null);
const HEIGHTFUNCS: any = { ...HeightFunctions, geoFunc };
const ALL_CASES = [...Object.keys(HEIGHTFUNCS)];

const W = 256;
const H = 256;
export default ({ sample }: any) => {
  const [currCase, setCurrCase] = useState(0);

  const onCaseChange = (caseId: any) => {
    console.log("switch case to: " + caseId);
    setCurrCase(parseInt(caseId));
  };

  const func = HEIGHTFUNCS[ALL_CASES[currCase]];

  const heightArr = [...Array(W * H).keys()]
    .map((elt, i) => new Vector2(i % W, Math.floor(i / W)))
    .map(v2 => func(v2));
  // .map(v2 => 0.25 + noise(v2) / 2);
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
