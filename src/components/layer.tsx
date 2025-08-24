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
    isEditableNode,
    isOnlyOuputType,
    nodeTypes,
} from "../nodes/node_define"

import {
    edgeTypes,
} from "../edges"
import { FormatGraph } from "./format_graph";
import { CreateNode } from "./create_node";
import { IsValidFlowConnection } from "../edges/valid_connection";
import { EditTable } from "./edit_table";

export const initialNodes = [];
export const initialEdges: Edge[] = [];

type LabelNode = Node<{ label: string }>

export function MainLayer(
    { nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange }: {
        nodes: LabelNode[],
        setNodes: Dispatch<SetStateAction<LabelNode[]>>,
        onNodesChange: OnNodesChange<LabelNode>,
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
    const [editingNode, setEditingNode] = useState<LabelNode | null>(null)

    const handleNodeClick = (_event: React.MouseEvent, node: LabelNode) => {
        setEditingNode(null);
        if (!isEditableNode(node.id)) {
            return;
        }
        setEditingNode(node);
    };
    const handleUpdateNode = (id: string, newData: any) => {
        setNodes(prev =>
            prev.map(node =>
                node.id === id ? { ...node, data: { ...node.data, ...newData } } : node
            )
        );
    };
    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onNodeClick={handleNodeClick}
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
            {!isRectangleActive && editingNode && <EditTable node={editingNode} setEditing={setEditingNode} handleUpdataData={handleUpdateNode} />}
            <FormatGraph nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
            <Background />
            <MiniMap />
            <Controls />
        </ReactFlow>
    )
}