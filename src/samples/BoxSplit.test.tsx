///<reference path="../dts/misc-types-extend.d.ts" />
import React from "react";
import { BoxEntityCtrlHlp } from "../components/Helpers/BoxEntityCtrlHlp";
import { Box3, Vector3 } from "three";
import { BoxSplitter } from "../common/tools/BoxUtils";
import { Helpers, Controls, Wrapper, Lights } from "./BasicDemo";
import { InfoOverlay, CaseSelector } from "../components/UI/Overlay";
import { Canvas } from "react-three-fiber";
import { useSampleStates } from "../common/SampleStates";

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
        {boxHelpers}
        {boxSplitHelpers}
    </>)
}

// TestCase #0
const SeparateBoxes = () => {

    var min; var max;

    min = new Vector3(0, 0, -15); max = new Vector3(50, 50, 15);
    var box1 = new Box3(min, max);

    min = new Vector3(0, 0, 30); max = new Vector3(50, 50, 60);
    var box2 = new Box3(min, max);

    var splitBoxes = BoxSplitter.split(box1, [box2.clone().intersect(box1)]);

    return (<TestBase initBoxes={[box1, box2]} splitBoxes={splitBoxes} />)
}

// TestCase #1
const AdjacentBoxes = () => {
    var min; var max;

    min = new Vector3(-30, 0, 0); max = new Vector3(15, 50, 50);
    var box1 = new Box3(min, max);

    min = new Vector3(0, 0, 0); max = new Vector3(45, 50, 50);
    var box2 = new Box3(min, max);

    var splitBoxes = BoxSplitter.split(box1, [box2.intersect(box1)]);
    return (<TestBase initBoxes={[box1, box2]} splitBoxes={splitBoxes} />)

}

// TestCase #2: one box inside another
const BoxInclusion = () => {
    var min; var max;

    min = new Vector3(-92, -16, 36); max = new Vector3(-36, 80, 92);
    var box1 = new Box3(min, max);

    min = new Vector3(-92, -6.399999999999999, 36); max = new Vector3(-36, 70.4, 92);
    var box2 = new Box3(min, max);

    var splitBoxes = BoxSplitter.split(box1, [box2.intersect(box1)]);
    return (<TestBase initBoxes={[box1, box2]} splitBoxes={splitBoxes} />)

}

const TestCases = [SeparateBoxes, AdjacentBoxes, BoxInclusion];

export default (/*{ sample }: any*/) => {
    const sample = useSampleStates(state => state.sample);   // get sample from states instead of from props to subscribe updates
    const caseNb = (sample.caseNb !== undefined && sample.caseNb !== null && sample.caseNb !== "") ? sample.caseNb : 0;
    const TestCase = TestCases[caseNb];
    return (
        <>
            <InfoOverlay sample={sample} />
            <CaseSelector sampleCases={TestCases.map(elt=>elt.name)} caseId={caseNb} />
            <Canvas camera={{ position: [100, 50, 100] }}>
                <ambientLight intensity={2} />
                <Wrapper />
                <Helpers size={128} />
                <Controls />
                <TestCase />
            </Canvas>
        </>
    )
};