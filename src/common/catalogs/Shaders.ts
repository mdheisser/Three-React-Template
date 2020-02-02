// import { Vector4, Uniform } from "three/build/three.module";
// import * as TextureCatalog from "./TextureCatalog";

var Color = {

    uniforms: {
    },

    vertexShader: [
        "attribute vec3 color;",
        "varying vec3 col;",
        "void main()",
        "{",
        "   col = color;",
        "	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
        "	gl_Position = projectionMatrix * mvPosition;",
        "}"
    ].join("\n"),

    fragmentShader: [
        "in vec3 col;",
        "void main( void ) {",
        "	gl_FragColor = vec4(col.r,col.g,col.b,1.0);",
        "}"
    ].join("\n")

};

export { Color};
