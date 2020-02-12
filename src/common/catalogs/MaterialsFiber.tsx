import React from "react";
import * as THREE from "three";
import * as TextureCatalog from "./Textures";
import * as Shaders from './Shaders';
export enum MAT {
  WATER,
  SAND,
  SHADCOL
}
export type MaterialProps = {
  name: MAT,
  repeat: number
}
export function Material(props: MaterialProps) {
  switch (props.name) {
    case MAT.WATER:
      return (
        <meshStandardMaterial
          attach="material"
          opacity={0.5}
          transparent={true}
          color={0xff0000}
        />);
      break;
    case MAT.SAND:
      return (
        <meshStandardMaterial
          attach="material"
          opacity={0.5}
          transparent={false}
          color={0xffffff}
          side={THREE.DoubleSide}
          metalness={0.2}
          bumpScale={0.0005}
          map={TextureCatalog.sand(props.repeat)}
          normalMap={TextureCatalog.sand_norm(props.repeat)}
        />);
      break;
    case MAT.SHADCOL:
      return (<shaderMaterial
        attach="material"
        vertexShader={Shaders.Color.vertexShader}
        fragmentShader={Shaders.Color.fragmentShader}
      />)
  }
}
