///<reference path="../dts/misc-types-extend.d.ts" />
import React, { useRef, useEffect, useState } from "react";
import BoxListHlp, { BoxEntity, BOX_SELECT_MODES } from "../components/Helpers/BoxListHlp";
import { Box3, Vector3, Matrix4 } from "three";
import BasicTemplate from "./BasicTemplate";
import { BoxSplitter } from "../components/Utils/BoxUtils";
import { Helpers } from "./DemoFiber";

const makeEntitites = (boxList: any, stateRef: any, stateSetter: any, color=0xffffff) => {
    const onMoveCb = (mat: Matrix4, id: any) => {
        console.log("box moved to: %s %s %s", mat.elements[12], mat.elements[13], mat.elements[14]);
        var box = stateRef.current[id].box;
        const boxDim: any = new Vector3(0, 0, 0);
        box.getSize(boxDim);
        const boxCenter: any = new Vector3()
        boxCenter.applyMatrix4(mat);
        stateRef.current[id].box.setFromCenterAndSize(boxCenter, boxDim);
        stateSetter([...stateRef.current]);
        // entities[id].box.translate(...c.toArray());
        return {};
    }
    // var boxEntList: BoxMovableEntity[] = [boxEnt];
    const boxEntList = boxList.map((box: any, id: number) => {
        return {
            box: box,
            selected: 1,
            color: color,
            onMove: (mat: Matrix4) => onMoveCb(mat, id)
        }
    })
    return boxEntList;
}

const TestBase = ({ initBoxes, splitBoxes }: { initBoxes: Box3[], splitBoxes: Box3[] }) => {
    const [entities, setEntities] = useState();
    const stateRef = useRef(entities);

    useEffect(() => {
        stateRef.current = entities;
    })

    if (!entities) {
        var boxEntList: BoxEntity[] = makeEntitites(initBoxes, stateRef, setEntities);
        var boxEntListOvrlp: BoxEntity[] = makeEntitites(splitBoxes, stateRef, setEntities, 0xff0000);

        setEntities([...boxEntList, ...boxEntListOvrlp]);
    }

    return (<>
        <Helpers size={128} />
        <BoxListHlp boxEntities={entities} selectMode={BOX_SELECT_MODES.ALLORNOT} />
    </>)
}

/**
 * 2 separate boxes
 */
const TestCase = () => {

    var min; var max;

    min = new Vector3(0, 0, -15); max = new Vector3(50, 50, 15);
    var box1 = new Box3(min, max);

    min = new Vector3(0, 0, 30); max = new Vector3(50, 50, 60);
    var box2 = new Box3(min, max);

    var splitBoxes = BoxSplitter.split(box1, [box2.clone().intersect(box1)]);
   
    return (<TestBase initBoxes={[box1, box2]} splitBoxes={splitBoxes} />)
}

/**
 * 2 adjacent boxes
 */
const TestCase2 = () => {
    var min; var max;

    min = new Vector3(-30, 0, 0); max = new Vector3(15, 50, 50);
    var box1 = new Box3(min, max);

    min = new Vector3(0, 0, 0); max = new Vector3(45, 50, 50);
    var box2 = new Box3(min, max);

    var splitBoxes = BoxSplitter.split(box1, [box2.intersect(box1)]);
    return (<TestBase initBoxes={[box1, box2]} splitBoxes={splitBoxes} />)

}

/**
 * Box inclusion: 1 box contained in another
 */
const TestCase3 = () => {
    var min; var max;

    min = new Vector3(-92, -16, 36); max = new Vector3(-36, 80, 92);
    var box1 = new Box3(min, max);

    min = new Vector3(-92, -6.399999999999999, 36); max = new Vector3(-36, 70.4, 92);
    var box2 = new Box3(min, max);

    var splitBoxes = BoxSplitter.split(box1, [box2.intersect(box1)]);
    return (<TestBase initBoxes={[box1, box2]} splitBoxes={splitBoxes} />)

}

const TestCases = [TestCase, TestCase2, TestCase3];


export default ({ caseNb = 1 }) => {
    return (<BasicTemplate Sample={TestCases[caseNb]} />)
};