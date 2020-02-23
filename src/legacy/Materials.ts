import * as THREE from "three";
import * as TextureCatalog from "../resources/catalogs/Textures";
import * as Shaders from '../resources/catalogs/Shaders';

var WATER = () => {
  return new THREE.MeshStandardMaterial({
    opacity: 0.5,
    transparent: true,
    color: 0x2194ce
  });
};

var SAND = (repeat = 8) => {
  return new THREE.MeshStandardMaterial({
    roughness: 0.8,
    color: 0xffffff,
    side: THREE.DoubleSide,
    metalness: 0.2,
    bumpScale: 0.0005,
    map: TextureCatalog.sand(repeat),
    normalMap: TextureCatalog.sand_norm(repeat)
  });
};

var ShaderCol = () => {
  new THREE.ShaderMaterial({
    uniforms: Shaders.Color.uniforms,
    vertexShader: Shaders.Color.vertexShader,
    fragmentShader: Shaders.Color.fragmentShader,
    side: THREE.DoubleSide,
  });
}

export {
  WATER, SAND, ShaderCol
};
