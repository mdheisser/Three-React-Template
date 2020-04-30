import { lazy } from "react";
import { SAMPLE_TYPE } from "../common/constants";

const BasicDemo = {
  tags: [SAMPLE_TYPE.DEMO],
  desc:
    "A demo showing basic scene setup with animation, lights, shadows, controls, .." +
    "click on box to move it",
  Component: lazy(() => import("./BasicDemo"))
};
const ModelLoader = {
  tags: [SAMPLE_TYPE.DEMO],
  desc: "",
  Component: lazy(() => import("./ModelLoader"))
};
const BoxSplitDemo = {
  tags: [SAMPLE_TYPE.DEMO],
  desc: "Press space key to toggle anim.",
  Component: lazy(() => import("../samples/BoxSplitDemo"))
};
const TestBoxSplit = {
  tags: [SAMPLE_TYPE.TEST],
  desc: "",
  Component: lazy(() => import("../samples/BoxSplit.test"))
};
const TestRaycastHlp = {
  tags: [SAMPLE_TYPE.TEST],
  desc: "",
  Component: lazy(() => import("../samples/RaycastHlp.test"))
};
const HeightmapGenTool = {
  tags: [SAMPLE_TYPE.TOOL],
  desc: "",
  Component: lazy(() => import("../samples/Tools/HeightmapGen"))
};

export {
  BasicDemo,
  ModelLoader,
  BoxSplitDemo,
  HeightmapGenTool,
  TestBoxSplit,
  TestRaycastHlp
};
