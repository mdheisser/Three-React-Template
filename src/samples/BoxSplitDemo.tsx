///<reference path="../dts/misc-types-extend.d.ts" />
import React, { useRef, useEffect, useState, useCallback } from "react";
import { Box3, Vector3, Matrix4 } from "three";
import BasicTemplate from "./BasicTemplate";
import { BoxSplitter } from "../components/Utils/BoxUtils";
import { useFrame, useThree } from "react-three-fiber";

const StaticBoxStyle = {
    default: {
        color: "white",
        alpha: "0.2",
        ghostColor: "white",
        ghostAlpha: "0"
    },
    hovered: {
        color: "orange",
        alpha: "0.4",
        ghostColor: "white",
        ghostAlpha: "0"
    },
    selected: {
        color: "white",
        alpha: "0.6",
        ghostColor: "white",
        ghostAlpha: "0"
    }
}

const MovingBoxStyle = {
    default: {
        color: "white",
        alpha: "0.2",
        ghostColor: "white",
        ghostAlpha: "0"
    },
    hovered: {
        color: "orange",
        alpha: "0.4",
        ghostColor: "white",
        ghostAlpha: "0"
    },
    selected: {
        color: "white",
        alpha: "0.6",
        ghostColor: "white",
        ghostAlpha: "0"
    }
}

const OverlapBoxStyle = {
    default: {
        color: "red",
        alpha: "1",
        ghostColor: "red",
        ghostAlpha: "0.1"
    }
}

const SplitBoxesStyle = {
    default: {
        color: "green",
        alpha: "1",
        ghostColor: "green",
        ghostAlpha: "0.1"
    }
}

const orig = new Vector3(0, 0, 0);
var orig2 = new Vector3(20, 30, 40);
const dim = new Vector3(50, 50, 50);
const dim2 = new Vector3(51, 51, 25);
const staticBox = new Box3(orig, dim);
const movingBox = new Box3(orig2, orig2.clone().add(dim2));

const EntryPoint = () => {

    const [entities, setEntities] = useState();
    const moveCbRef: any = useRef();

    const staticBoxEnt = {
        box: staticBox,
        style: StaticBoxStyle
    }

    const movingBoxEnt = {
        box: movingBox,
        style: MovingBoxStyle,
        selected: true,
        onMove: (mat: Matrix4) => moveCbRef.current(mat), // enable movement
    }

    const onMoveCb = useCallback((mat: Matrix4) => {
        var movingBox = movingBoxEnt.box;
        const boxDim: any = new Vector3(0, 0, 0);
        movingBox.getSize(boxDim);
        const boxCenter: any = new Vector3()
        boxCenter.applyMatrix4(mat);
        movingBoxEnt.box.setFromCenterAndSize(boxCenter, boxDim);
        var splitEntities = [];
        if (movingBox.intersectsBox(staticBox)) {
            var overlapBox = movingBox.clone().intersect(staticBox);
            var overlapEnt = {
                box: overlapBox,
                style: OverlapBoxStyle
            }
            var splitBoxes = BoxSplitter.split(staticBox, [overlapBox]);
            splitEntities = splitBoxes.map((box: any) => ({
                box: box,
                style: SplitBoxesStyle
            }))
            splitEntities.push(overlapEnt);
        }
        setEntities([staticBoxEnt, movingBoxEnt, ...splitEntities]);
        // entities[id].box.translate(...c.toArray());
        return {};
    }, [entities]);

    moveCbRef.current = onMoveCb;


    if (!entities) setEntities([staticBoxEnt, movingBoxEnt])

    const clk = useThree().clock


    useFrame(() => {
        var mat = new Matrix4()
        const statBoxCenter = new Vector3(0, 0, 0);
        staticBox.getCenter(statBoxCenter);
        const movBoxCenter = new Vector3(0, 0, 0);
        movingBox.getCenter(movBoxCenter);
        mat.makeTranslation(statBoxCenter.x / 2 * (1 + Math.cos(clk.elapsedTime / 4) * 2),
            25 * (1 + Math.sin(clk.elapsedTime / 4) * 2),
            movBoxCenter.z);
        // movingBoxEnt.onMove(mat);
    })


    return (<>
        {/* <BoxListHlp boxEntities={entities} /> */}
    </>)
}


export default () => {
    // const ctrl: any = useRef();
    return (<BasicTemplate Sample={EntryPoint} />)
};

// export default DemoTemplate;