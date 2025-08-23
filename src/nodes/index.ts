import type { NodeTypes } from '@xyflow/react';
import { FlowNode } from './flow_node.tsx';

export const nodeTypes = {
  'flow-node': FlowNode,
} satisfies NodeTypes;
