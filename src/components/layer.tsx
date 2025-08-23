import {
    useState,
    Dispatch,
    useCallback,
    SetStateAction,
} from "react"

import {
    ReactFlow,
    Background,
    Controls,
    Panel,
    MiniMap,
    Node,
    MarkerType,
    Edge,
    addEdge,
    OnNodesChange,
    OnEdgesChange,
    type OnConnect,
} from "@xyflow/react"

import {
    nodeTypes,
} from "../nodes"

import {
    edgeTypes,
} from "../edges"
import { FormatGraph } from "./format_graph";
import { CreateNode } from "./create_node";


export function MainLayer(
    { nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange }: {
        nodes: Node<{ label: string }>[],
        setNodes: Dispatch<SetStateAction<Node<{ label: string }>[]>>,
        onNodesChange: OnNodesChange<Node<{ label: string }>>,
        edges: Edge[],
        setEdges: Dispatch<SetStateAction<Edge[]>>,
        onEdgesChange: OnEdgesChange<Edge>,
    }
) {
    const onConnect = useCallback<OnConnect>(
        (connection) => setEdges((edges) => addEdge({ ...connection, animated: true, markerEnd: { type: MarkerType.Arrow } }, edges)),
        [setEdges]
    );
    const connectionLineStyle = { stroke: 'red' }
    const [isRectangleActive, setIsRectangleActive] = useState(true);
    const [nextId, setNextId] = useState(0);
    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onConnect={onConnect}
            connectionLineStyle={connectionLineStyle}
            onDragOver={(event) => {
                event.preventDefault();
                event.dataTransfer.dropEffect = 'move';
            }}
            fitView
        >
            <Panel position="top-center">
                <div className="xy-theme__button-group">
                    <button
                        className={`xy-theme__button ${isRectangleActive ? 'active' : ''}`}
                        onClick={() => setIsRectangleActive(true)}
                    >
                        Create Mode
                    </button>
                    <button
                        className={`xy-theme__button ${!isRectangleActive ? 'active' : ''}`}
                        onClick={() => setIsRectangleActive(false)}
                    >
                        Select Mode
                    </button>
                </div>
            </Panel>
            {isRectangleActive && <CreateNode nextId={nextId} setNextId={setNextId} />}
            <FormatGraph nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
            <Background />
            <MiniMap />
            <Controls />
        </ReactFlow>
    )
}