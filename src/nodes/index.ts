import type { NodeTypes } from '@xyflow/react';
import { EventNode } from './eventNode.tsx'
import { ChoiceNode } from './choiceNode.tsx'
import { IfNode } from './ifNode.tsx';
import { ContextNode } from './contextNode.tsx';
import { ElseNode } from './elseNode.tsx';

export const nodeTypes = {
  'event-node': EventNode,
  'choice-node': ChoiceNode,
  'context-node': ContextNode,
  'if-node': IfNode,
  'else-node': ElseNode,
} satisfies NodeTypes;
