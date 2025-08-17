import { useCallback, useState, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
  MarkerType,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { nodeTypes } from './nodes';
import { Node } from '@xyflow/react';
import './index.css';
import { edgeTypes } from './edges/index';
import { ExportButton } from './components/ExportButton';
import { ImportButton } from './components/ImportButton';
import { initialEdges, initialNodes } from "./initData.tsx"

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<{ label: string }>>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nextId, setNextId] = useState(5);

  const onConnect = useCallback<OnConnect>(
    (connection) => setEdges((edges) => addEdge({ ...connection, animated: true, markerEnd: { type: MarkerType.Arrow } }, edges)),
    [setEdges]
  );


  const dragNodeTypes = useMemo(() => ['event-node', 'choice-node', 'if-node'], []);
  const connectionLineStyle = { stroke: 'red' }


  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
      <div style={{
        width: '300px',
        height: '100vh',
        borderRight: '1px solid #eee',
        padding: '15px',
        background: '#f8f8f8'
      }}>
        <h3 style={{ marginTop: 0 }}>节点面板</h3>
        {dragNodeTypes.map((type) => (
          <div
            key={type}
            style={{
              padding: '10px',
              margin: '10px 0',
              background: '#fff',
              borderRadius: '4px',
              border: '1px solid #ddd',
              cursor: 'grab'
            }}
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData('application/reactflow', type);
              event.dataTransfer.effectAllowed = 'move';
            }}
          >
            {type}
          </div>
        ))}
      </div>
      <div style={{
        position: 'absolute',
        zIndex: 10,
        padding: '10px',
        display: 'flex',
        left: '300px'
      }}>
      </div>
      <div style={{ position: 'absolute', zIndex: 10, padding: '10px', right: 0, display: 'flex', gap: '10px' }}>
        <ExportButton nodes={nodes} edges={edges} />
        <ImportButton setNodes={setNodes} setEdges={setEdges} />
      </div>
      <div style={{ flex: 1, minHeight: '100vh' }}>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}

          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}

          onConnect={onConnect}
          connectionLineStyle={connectionLineStyle}


          // 拖动菜单，创建新节点
          onDrop={(event) => {
            const type = event.dataTransfer.getData('application/reactflow');
            const position = { x: event.clientX - 650, y: event.clientY - 250 };
            console.log('Calculated position:', position);

            const newNode = {
              id: `${nextId}`,
              type,
              position,
              data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
            setNextId(nextId + 1);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
          }}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
