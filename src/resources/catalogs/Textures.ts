import * as THREE from "three";
import img_sand from "../assets/img/sand.jpg";
import img_sand_norm from "../assets/img/sand_norm.png";

const textureLoader = new THREE.TextureLoader();

const buildTex = (texImg: string, repeat: number) => {
  return textureLoader.load(texImg, (map: THREE.Texture) => {
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 4;
    map.repeat.set(repeat, repeat);
    return map;
  });
};

const sand = (repeat: number) => {
  return buildTex(img_sand, repeat);
};
const sand_norm = (repeat: number) => {
  return buildTex(img_sand_norm, repeat);
};

export { sand, sand_norm };
