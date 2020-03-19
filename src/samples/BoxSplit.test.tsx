///<reference path="../dts/misc-types-extend.d.ts" />
import React from "react";
import { BoxEntityCtrlHlp } from "../components/Helpers/BoxEntityCtrlHlp";
import { Box3, Vector3 } from "three";
import BasicTemplate from "./BasicTemplate";
import { BoxSplitter } from "../components/Utils/BoxUtils";
import { Helpers } from "./DemoFiber";

const OverlapBoxStyle = {
    default: {
        color: "red",
        alpha: 1,
        ghostColor: "red",
        ghostAlpha: 0.1
    }
}

const SplitBoxesStyle = {
    default: {
        color: "green",
        alpha: 1,
        ghostColor: "green",
        ghostAlpha: 0.1
    }
}

const TestBase = ({ initBoxes, splitBoxes }: { initBoxes: Box3[], splitBoxes: Box3[] }) => {

    var boxHelpers = initBoxes.map((box: any, id: number) => {
        const boxEnt = {
            box: box,
            selected: false,
        }
        return <BoxEntityCtrlHlp boxEnt={boxEnt} boxStyle={OverlapBoxStyle} />
    })
    var boxSplitHelpers = splitBoxes.map((box: any, id: number) => {
        const boxEnt = {
            box: box,
            selected: false,
        }
        return <BoxEntityCtrlHlp boxEnt={boxEnt} boxStyle={SplitBoxesStyle} />
    })

    return (<>
        <Helpers size={128} />
        {boxHelpers}
        {boxSplitHelpers}
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
 * Box inclusion: 1 box inside another
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