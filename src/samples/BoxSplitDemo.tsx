///<reference path="../dts/misc-types-extend.d.ts" />
import React, { useRef, useEffect, useState } from "react";
import BoxListHlp, { BoxMovableEntity } from "../components/Helpers/BoxListHlp";
import { Box3, Vector3, Matrix4 } from "three";
import BasicTemplate from "./BasicTemplate";
import { inherits } from "util";
import { BoxSplitter } from "../components/Utils/BoxUtils";

const makeEntitites = (boxList: any, stateRef: any, stateSetter: any) => {
    const onMoveCb = (mat: Matrix4, id: any) => {
        console.log("box moved to: %s %s %s", mat.elements[12], mat.elements[13], mat.elements[14]);
        var box = stateRef.current[id].box;
        const boxDim: any = new Vector3(0, 0, 0);
        box.getSize(boxDim);
        const boxCenter: any = new Vector3()
        boxCenter.applyMatrix4(mat);
        var box1 = stateRef.current[0].box;
        var box2 = stateRef.current[1].box;
        stateRef.current[id].box.setFromCenterAndSize(boxCenter, boxDim);
        var splitEntities = [];
        if (box2.intersectsBox(box)) {
            var splitBoxes = BoxSplitter.split(box1, [box2.clone().intersect(box1)]);
            splitEntities = splitBoxes.map((box: any) => ({ box: box, selected: true, color: 0xff0000 }))
        }
        stateSetter([stateRef.current[0], stateRef.current[1], ...splitEntities]);
        // entities[id].box.translate(...c.toArray());
        return {};
    }
    // var boxEntList: BoxMovableEntity[] = [boxEnt];
    const boxEntList = boxList.map((box: any, id: number) => {
        return {
            box: box,
            onMove: (mat: Matrix4) => onMoveCb(mat, id)
        }
    })
    return boxEntList;
}


const EntryPoint = () => {

    const [entities, setEntities] = useState();
    const stateRef = useRef(entities);

    useEffect(() => {
        stateRef.current = entities;
    })

    const initBoxes = () => {
        var boxList = []; var min; var max; var box;

        min = new Vector3(0, 0, 30); max = new Vector3(50, 50, 60);
        box = new Box3(min, max);
        boxList.push(box);

        min = new Vector3(0, 0, -15); max = new Vector3(50, 50, 15);
        box = new Box3(min, max);
        boxList.push(box);
        return boxList
    }

    if (!entities) {
        var boxEntList: BoxMovableEntity[] = makeEntitites(initBoxes(), stateRef, setEntities);

        setEntities(boxEntList);
    }

    return (<>
        <BoxListHlp boxEntities={entities} />
    </>)
}


export default ({ caseNb = 1 }) => {
    // const ctrl: any = useRef();
    return (<BasicTemplate Sample={EntryPoint} />)
};

// export default DemoTemplate;