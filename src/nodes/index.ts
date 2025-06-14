import type { NodeTypes } from '@xyflow/react';
import { EditableNode } from './editableNode';

export const initialNodes = [
  { id: 'a', type: 'input', position: { x: 0, y: 0 }, data: { label: 'wire' } },
  {
    id: 'b',
    type: 'editable-node',
    position: { x: -100, y: 100 },
    data: { label: 'drag me!' },
  },
  { id: 'c', position: { x: 100, y: 100 }, data: { label: 'your ideas' } },
  {
    id: 'd',
    type: 'output',
    position: { x: 0, y: 200 },
    data: { label: 'with React Flow' },
  },
  {id: "test", type: "editable-node", position: { x: 200, y: 200 }, data: { label: 'Editable Node' } }
];

export const nodeTypes = {
  'editable-node': EditableNode,
} satisfies NodeTypes;
