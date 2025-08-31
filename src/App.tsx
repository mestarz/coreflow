import { Edge, useNodesState, useEdgesState } from "@xyflow/react"

import { MainLayer } from './components/layer';
import '@xyflow/react/dist/style.css';

import './index.css';
import { ExportButton } from './components/export_button';
import { ImportButton } from './components/import_button';
import { FlowNodeType } from "./nodes/node_define";

export const initialNodes = [];
export const initialEdges: Edge[] = [];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNodeType>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
      <div style={{ position: 'absolute', zIndex: 10, padding: '10px', left: 0, display: 'flex', gap: '10px' }}>
        <ExportButton nodes={nodes} edges={edges} />
        <ImportButton setNodes={setNodes} setEdges={setEdges} />
      </div>
      <div style={{ flex: 1, minHeight: '100vh' }}>
        <MainLayer
          nodes={nodes}
          setNodes={setNodes}
          onNodesChange={onNodesChange}
          edges={edges}
          setEdges={setEdges}
          onEdgesChange={onEdgesChange}
        />
      </div>
    </div>
  );
}
