import React, {
    useCallback,
    useMemo,
} from "react";
import * as THREE from 'three'
import { BufferGeometry, BufferAttribute } from "three";
import { useUpdate } from "react-three-fiber";


export enum RAYCAST_OBJ {
    POINT,
    POLYGON
}

export default ({ input, type = RAYCAST_OBJ.POLYGON }: { input: any, type?: RAYCAST_OBJ }) => {

    const buffAttrRef = useUpdate(
        (vertices: BufferAttribute) => {
            if (input.face) {
                [input.face.a, input.face.b, input.face.c].forEach((faceInd, i) => {
                    const posAttr = input.object.geometry.getAttribute("position");
                    vertices.setXYZ(i, posAttr.getX(faceInd), posAttr.getY(faceInd), posAttr.getZ(faceInd));
                });
            }
            vertices.needsUpdate = true;
            // console.log(input.faceIndex);
        },
        [input.faceIndex] // execute only if these properties change
    )
    const buffGeomRef = useUpdate((self: BufferGeometry) => {
        // console.log(self.attributes.position.array);
    }, [input.faceIndex]);

    var vertices = useMemo(() => new Float32Array(9), [])

    const onClick = useCallback(
        e => {
            e.stopPropagation();
            //   if (e.button === 1)
            console.log("OnClick: TODO");
        },[]);

    return (
        <mesh onClick={e => onClick(e)}>
            <bufferGeometry ref={buffGeomRef} attach="geometry">
                <bufferAttribute ref={buffAttrRef} attachObject={['attributes', 'position']} count={3} array={vertices} itemSize={3} />
            </bufferGeometry>
            <meshBasicMaterial attach="material" color="red" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
    );
}
