import type { NodeTypes } from '@xyflow/react';
import { EventNode } from './eventNode.tsx'
import { ChoiceNode } from './choiceNode.tsx'
import { IfNode } from './ifNode.tsx';
import { ContentNode } from './contentNode.tsx';
import { ElseNode } from './elseNode.tsx';
import { IfstmtNode } from './ifstmtNode.tsx';

export const nodeTypes = {
  'event-node': EventNode,
  'choice-node': ChoiceNode,
  'content-node': ContentNode,
  'if-node': IfNode,
  'else-node': ElseNode,
  'ifstmt-node': IfstmtNode,
} satisfies NodeTypes;
