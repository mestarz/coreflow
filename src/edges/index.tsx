import type { Edge, EdgeTypes } from '@xyflow/react';
import { AnimatedSVGEdge } from './svgEdge';

export const initialEdges: Edge[] = [
  { id: 'a->c', source: 'a', target: 'c', animated: true },
  { id: 'b->d', source: 'b', target: 'd', animated: true },
  { id: 'c->d', source: 'c', target: 'd', animated: true },
];


export const edgeTypes = {
  default: AnimatedSVGEdge 
} satisfies EdgeTypes;
