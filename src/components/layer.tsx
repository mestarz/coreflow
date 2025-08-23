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
    isOnlyOuputType,
    nodeTypes,
} from "../nodes/node_define"

import {
    edgeTypes,
} from "../edges"
import { FormatGraph } from "./format_graph";
import { CreateNode } from "./create_node";
import { IsValidFlowConnection } from "../edges/valid_connection";

export const initialNodes = [];
export const initialEdges: Edge[] = [];

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
        (connection) => {
            const { source } = connection;
            if (isOnlyOuputType(source) && source) {
                // 对于只有一个输出的节点，删除其他相关输出边
                setEdges((edges) => edges.filter((e) => e.source != source));
            }
            setEdges((edges) => addEdge({ ...connection, animated: true, markerEnd: { type: MarkerType.Arrow } }, edges));
        },
        [setEdges]
    );
    const connectionLineStyle = { stroke: 'red' }
    const [isRectangleActive, setIsRectangleActive] = useState(false);
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
            isValidConnection={IsValidFlowConnection}
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