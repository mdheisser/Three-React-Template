import React, { useMemo } from "react";
import * as THREE from 'three'
import { BufferGeometry, BufferAttribute } from "three";
import { useUpdate } from "react-three-fiber";

export enum RAYCAST_OBJ {
    POINT,
    POLYGON
}

const RaycastHlp = ({ input, type = RAYCAST_OBJ.POLYGON, onClick }: { input: any, type?: RAYCAST_OBJ, onClick?: any }) => {
    // const [locked, setLocked]: any = useState();  // internal state for lock
    // const lockedRef = useRef(locked);

    // useEffect(()=>{
    //     lockedRef.current = locked;
    // })

    const buffAttrRef = useUpdate(
        (vertices: BufferAttribute) => {
            if (input.face) {
                [input.face.a, input.face.b, input.face.c].forEach((faceInd, i) => {
                    const posAttr = input.object.geometry.getAttribute("position");
                    vertices.setXYZ(i, posAttr.getX(faceInd), posAttr.getY(faceInd), posAttr.getZ(faceInd));
                });
            }
            vertices.needsUpdate = true;    // TODO: check why stays undefined
            // console.log(input.faceIndex);
        }, [input.faceIndex] // execute only if these properties change
    )
    const buffGeomRef = useUpdate((self: BufferGeometry) => {
        // mandatory for onClick to work and cursor to be visible everywhere
        self.computeBoundingSphere();
    }, [input.faceIndex]);

    // first time init
    var vertices = useMemo(() => new Float32Array(9), [])
    // console.log(input.faceIndex);

    return (
        <mesh onPointerDown={onClick ? onClick : null}>
            <bufferGeometry ref={buffGeomRef} attach="geometry">
                <bufferAttribute ref={buffAttrRef} attachObject={['attributes', 'position']} count={3} array={vertices} itemSize={3} />
            </bufferGeometry>
            <meshBasicMaterial attach="material" color="red" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
    );
}
// avoid unnecessary refresh
const compare = (prev: any, next: any) => {
    return prev.input && prev.input.face && (prev.input.faceIndex === next.input.faceIndex);
}

export default React.memo(RaycastHlp, compare)