import { DemoTemplate } from './samples/DemoTemplate';
// import {Test} from './demos/Test';
import BoxSplitTests from './samples/BoxSplit.test';

export const DemoList = {
    Template: DemoTemplate,
    // Other samples goes here
}

export const TestList = {
    BoxSplit: BoxSplitTests
    // Other tests goes here
}

export const getSample = (sampleType, sampleName, testId = "") => {
    return sampleType === "demos" ? new DemoList[sampleName]() : new TestList[sampleName](testId);
    // return (scene, camera, physics) => new DemoTemplate(scene, camera, physics);
}