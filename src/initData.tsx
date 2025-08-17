import { Edge } from '@xyflow/react'

export const initialNodes = [
  // { id: 'event0', type: 'group', data: {label:'遗迹逃生'}, style:{width: 200, height:200}, position:{x:100, y:100}},
  // {id: 'event0-title', type: 'event-node', data: {label:'遗迹逃生'}, position:{x:0, y:0}, parentId:'event0', extent:'parent'},
  // {id: 'event0-choice0', type: 'choice-node', data: {label: '服用红色药物'}, position: {x: 100, y:100}, parentId:'event0', extent:'parent'},
  // {id: 'event0-choice1', type: 'choice-node', data: {label: '服用粉色药物'}, position: {x: 100, y:100}, parentId:'event0', extent:'parent'},
  { id: 'a', type: 'input', position: { x: 0, y: 0 }, data: { label: 'wire' } },
  {
    id: 'b',
    type: 'if-node',
    position: { x: -100, y: 100 },
    data: { label: 'drag me!' },
  },
  {
    id: 'c', type: 'event-node',
    position: { x: 100, y: 100 }, data: { label: 'your ideas' }
  },
  {
    id: 'd',
    type: 'output',
    position: { x: 0, y: 200 },
    data: { label: 'with React Flow' },
  },
  { id: "test", type: "choice-node", position: { x: 200, y: 200 }, data: { label: 'Editable Node' } }
];



export const initialEdges: Edge[] = [
  //{id:'event0-title->choice0', source: 'event0-title', target: 'event0-choice0', animated:true},
  //{id:'event0-title->choice1', source: 'event0-title', target: 'event0-choice1', animated:true},
  { id: 'a->d', source: 'a', target: 'd', animated: true },
  { id: 'b->d', source: 'b', target: 'd', animated: true },
  { id: 'c->d', source: 'c', target: 'd', animated: true },
];


