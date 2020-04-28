///<reference path="../../dts/misc-types-extend.d.ts" />
import React from "react";
import * as THREE from "three";
import { InfoOverlay, CanvasOverlay } from "../../modules/UI/Overlay";
import { Vector2 } from "three";
import { SimplexNoise } from "three/examples/jsm/math/SimplexNoise";
//import * as Functions from '../resources/catalogs/Functions'

//@todo test what x and y means for canvas,
/**
 * y
 * ^
 * |
 * |____> x
 */
const simplex = new SimplexNoise();

const sinus = (v2: Vector2) =>
  Math.abs(Math.cos(v2.length() / 32) / 4 + 1.4) / 2;
const noise = (p: Vector2) => {
  var p2 = p.clone(); //.multiplyScalar(0.25);
  var freq = [0.0125, 0.025, 0.05, 0.1, 0.2, 0.4, 0.8];
  var noise = 0;
  for (var i = 0; i < freq.length; i++) {
    noise +=
      (simplex.noise4d(p2.x * freq[i], p2.y * freq[i], 0, 0) + 0.5) /
      Math.pow(2, i + 1); //
  }
  return noise;
};
//const heightFunctions = [sinus, sinus2];
const W = 512;
const H = 512;
export default ({ sample }: any) => {
  const heightArr = [...Array(W * H).keys()]
    .map((elt, i) => new Vector2(i % W, Math.floor(i / W)))
    .map(v2 => 0.25 + noise(v2) / 2);
  //console.log(heightArr);
  return (
    <>
      <InfoOverlay sample={sample} />
      <CanvasOverlay width={W} height={H} pointsBuff={heightArr} />
    </>
  );
};
