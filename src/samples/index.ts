import { lazy } from "react";
import { SAMPLE_TYPE } from "../common/constants";
/** 
 * Sample customization:
 * You can choose to get sample arguments from url params  
 * by putting all supported sample arguments in args
*/

const BasicDemo = {
  tags: [SAMPLE_TYPE.DEMO],
  desc:
    "A demo showing basic scene setup with animation, lights, shadows, controls, .." +
    "click on box to move it",
  args: {},
  comp: lazy(() => import("./BasicDemo"))
};
const ModelLoader = {
  tags: [SAMPLE_TYPE.DEMO],
  desc: "For some models, please allow some time to load. You can see camera autofit on models",
  args: { caseSelect: 1 },
  comp: lazy(() => import("./ModelLoader"))
};
const ModelLoadCustUrl = {
  tags: [SAMPLE_TYPE.DEMO],
  desc: "shows how to preload a model from url parameter. model may take a while to load (1 min or so)",
  args: { extAssetUrl: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Sponza/glTF/Sponza.gltf" },  // add a custom load url
  comp: lazy(() => import("./ModelLoader"))
};
const BoxSplitDemo = {
  tags: [SAMPLE_TYPE.DEMO],
  desc: "Press space key to toggle anim.",
  args: {},
  comp: lazy(() => import("../samples/BoxSplitDemo"))
};
const TestBoxSplit = {
  tags: [SAMPLE_TYPE.TEST],
  desc: "",
  args: {caseSelect: 0},
  comp: lazy(() => import("../samples/BoxSplit.test"))
};
const TestRaycastHlp = {
  tags: [SAMPLE_TYPE.TEST],
  desc: "Use select menu to switch between objects",
  args: {},
  comp: lazy(() => import("../samples/RaycastHlp.test"))
};
const HeightmapGenTool = {
  tags: [SAMPLE_TYPE.TOOL],
  desc: "Generates heightmaps from various height functions",
  args: {caseSelect: 0},
  comp: lazy(() => import("../samples/Tools/HeightmapGen"))
};

export {
  BasicDemo,
  ModelLoader,
  ModelLoadCustUrl,
  BoxSplitDemo,
  HeightmapGenTool,
  TestBoxSplit,
  TestRaycastHlp
};
