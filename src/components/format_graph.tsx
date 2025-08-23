import dagre from '@dagrejs/dagre';
import { useCallback } from 'react';
import {
    Node,
    Edge,
    Panel,
} from "@xyflow/react"
import {
    Dispatch,
    SetStateAction,
} from "react"

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
var nodeWidth = 300;
var nodeHeight = 100;

const getLayoutedElements = (nodes: any, edges: any, direction = 'TB') => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    if (isHorizontal) {
        nodeWidth = 300;
        nodeHeight = 80;
    } else {
        nodeWidth = 200;
        nodeHeight = 200;
    }

    nodes.forEach((node: any) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge: any) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const newNodes = nodes.map((node: any) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        const newNode = {
            ...node,
            targetPosition: isHorizontal ? 'left' : 'top',
            sourcePosition: isHorizontal ? 'right' : 'bottom',
            // We are shifting the dagre node position (anchor=center center) to the top left
            // so it matches the React Flow node anchor point (top left).
            position: {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            },
        };

        return newNode;
    });

    return { nodes: newNodes, edges };
};


export function FormatGraph(
    { nodes, edges, setNodes, setEdges }: {
        nodes: Node<{ label: string }>[],
        edges: Edge[],
        setNodes: Dispatch<SetStateAction<Node<{ label: string }>[]>>,
        setEdges: Dispatch<SetStateAction<Edge[]>>
    }
) {
    const onLayout = useCallback(
        (direction: any) => {
            const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
                nodes,
                edges,
                direction,
            );
            setNodes([...layoutedNodes]);
            setEdges([...layoutedEdges]);
        },
        [nodes, edges],
    );
    return (
        <Panel position="top-right">
            <button className="xy-theme__button" onClick={() => onLayout('TB')}>
                vertical layout
            </button>
            <button className="xy-theme__button" onClick={() => onLayout('LR')}>
                horizontal layout
            </button>
        </Panel>

    )
}