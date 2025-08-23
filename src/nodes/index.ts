import type { NodeTypes } from '@xyflow/react';
import { EventNode } from './event_node.tsx'
import { ChoiceNode } from './choice_node.tsx'
import { IfNode } from './if_node.tsx';
import { ContentNode } from './content_node.tsx';
import { ElseNode } from './else_node.tsx';
import { IfstmtNode } from './ifstmt_node.tsx';

export const nodeTypes = {
  'event-node': EventNode,
  'choice-node': ChoiceNode,
  'content-node': ContentNode,
  'if-node': IfNode,
  'else-node': ElseNode,
  'ifstmt-node': IfstmtNode,
} satisfies NodeTypes;
