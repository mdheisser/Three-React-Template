import { lazy } from "react";
import { SAMPLE_TYPE } from "../common/constants";

const BasicDemo = {
  tags: [SAMPLE_TYPE.DEMO],
  Component: lazy(() => import("./BasicDemo"))
};
const ModelLoader = {
  tags: [SAMPLE_TYPE.DEMO],
  Component: lazy(() => import("./ModelLoader"))
};
const BoxSplitDemo = {
  tags: [SAMPLE_TYPE.DEMO],
  Component: lazy(() => import("../samples/BoxSplitDemo"))
};
const TestBoxSplit = {
  tags: [SAMPLE_TYPE.TEST],
  Component: lazy(() => import("../samples/BoxSplit.test"))
};
const TestRaycastHlp = {
  tags: [SAMPLE_TYPE.TEST],
  Component: lazy(() => import("../samples/RaycastHlp.test"))
};
const HeightmapGenTool = {
  tags: [SAMPLE_TYPE.TOOL],
  Component: lazy(() => import("../samples/Tools/HeightmapGen"))
};

export {
  BasicDemo,
  ModelLoader,
  BoxSplitDemo,
  TestBoxSplit,
  TestRaycastHlp,
  HeightmapGenTool
};
