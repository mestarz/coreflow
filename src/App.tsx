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
  useReactFlow,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { initialNodes, nodeTypes } from './nodes';
import { Node, Edge } from '@xyflow/react';
import './index.css';
import { initialEdges, edgeTypes } from './edges';
import { ExportButton } from './components/ExportButton';
import { ImportButton } from './components/ImportButton';

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<{ label: string }>>(initialNodes);
  const [nextId, setNextId] = useState(5);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback<OnConnect>(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );


  const dragNodeTypes = useMemo(() => ['input', 'output', 'editable-node'], []);

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
            {type === 'input' ? '输入节点' :
              type === 'output' ? '输出节点' : '可编辑节点'}
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
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
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
