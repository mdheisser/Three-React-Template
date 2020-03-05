import { lazy } from 'react'
import { SAMPLE_TYPE } from '../legacy/constants';

const FiberDemo = { tags: [SAMPLE_TYPE.FIBER], Component: lazy(() => import('./DemoFiber')) };
const BoxSplitDemo = { tags: [SAMPLE_TYPE.FIBER], Component: lazy(() => import('../samples/BoxSplitDemo')) };
const TestBoxSplit = { tags: [SAMPLE_TYPE.FIBER], Component: lazy(() => import('../samples/BoxSplit.test')) };
const TestRaycastHlp = { tags: [SAMPLE_TYPE.FIBER], Component: lazy(() => import('../samples/RaycastHlp.test')) };
const HybridDemo = { tags: [SAMPLE_TYPE.HYBRID], Component: lazy(() => import('../legacy/DemoTemplate')) };
const LegacyDemo = { tags: [SAMPLE_TYPE.LEGACY], Component: lazy(() => import('../legacy/DemoTemplate')) };

export {
  FiberDemo,
  BoxSplitDemo,
  TestBoxSplit,
  TestRaycastHlp,
  HybridDemo,
  LegacyDemo,
}