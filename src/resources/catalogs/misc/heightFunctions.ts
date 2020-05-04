import { SimplexNoise } from "three/examples/jsm/math/SimplexNoise";
import { Vector2 } from "three";

const simplex = new SimplexNoise();

export const sinusoid = (p: Vector2) => Math.cos(p.length() / 8); //Math.abs(Math.cos(v2.length() / 32) / 4 + 1.4) / 2;

export const noise = (p: Vector2) => {
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
