import React, { useState, Dispatch, useCallback, SetStateAction } from "react";

import {
  XYPosition,
  ReactFlow,
  Background,
  Controls,
  Panel,
  MiniMap,
  MarkerType,
  Edge,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  type OnConnect,
} from "@xyflow/react";

import {
  isEditableNode,
  isOnlyOuputType,
  nodeTypes,
} from "../nodes/node_define";

import { edgeTypes } from "../edges";
import { FormatGraph } from "./format_graph";
import { CreateNode } from "./create_node";
import { IsValidFlowConnection } from "../edges/valid_connection";
import { EditTable } from "./edit_table";
import { FlowNodeType } from "../nodes/node_define";
import { AIBox } from "./ai_box";

export const initialNodes = [];
export const initialEdges: Edge[] = [];

export function MainLayer({
  nodes,
  setNodes,
  onNodesChange,
  edges,
  setEdges,
  onEdgesChange,
}: {
  nodes: FlowNodeType[];
  setNodes: Dispatch<SetStateAction<FlowNodeType[]>>;
  onNodesChange: OnNodesChange<FlowNodeType>;
  edges: Edge[];
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  onEdgesChange: OnEdgesChange<Edge>;
}) {
  const onConnect = useCallback<OnConnect>(
    (connection) => {
      const { source } = connection;
      if (isOnlyOuputType(source) && source) {
        // 对于只有一个输出的节点，删除其他相关输出边
        setEdges((edges) => edges.filter((e) => e.source != source));
      }
      setEdges((edges) =>
        addEdge(
          {
            ...connection,
            animated: true,
            markerEnd: { type: MarkerType.Arrow },
          },
          edges,
        ),
      );
    },
    [setEdges],
  );
  const connectionLineStyle = { stroke: "red" };

  // 切换模式 AI Mode / Edit Mode
  const [isEditMode, setIsEditMode] = useState(true);

  // 创建节点
  const [createWindow, setCreateWindow] = useState(false);
  // 记录节点创建窗口的position
  const [createWindowPos, setCreateWindowPos] = useState<XYPosition>({
    x: 0,
    y: 0,
  });
  // 用于创建节点时给定id
  const [nextId, setNextId] = useState(0);

  // 节点编辑
  const [editingNode, setEditingNode] = useState<FlowNodeType | null>(null);
  const handleNodeClick = (_event: React.MouseEvent, node: FlowNodeType) => {
    setEditingNode(null);
    if (!isEditableNode(node.id)) {
      return;
    }
    setEditingNode(node);
  };
  const handleUpdateNode = (id: string, newData: any) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...newData } } : node,
      ),
    );
  };
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onNodeClick={handleNodeClick}
      onPaneContextMenu={(event) => {
        event.preventDefault();
        setCreateWindow(true);
        setCreateWindowPos({ x: event.pageX, y: event.pageY });
        console.log({ x: event.pageX, y: event.pageY });
      }}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onConnect={onConnect}
      isValidConnection={IsValidFlowConnection}
      connectionLineStyle={connectionLineStyle}
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
      }}
      fitView
    >
      <Panel position="top-center">
        <div className="xy-theme__button-group">
          <button
            className={`xy-theme__button ${!isEditMode ? "active" : ""}`}
            onClick={() => {
              setCreateWindow(false);
              setEditingNode(null);
              setIsEditMode(false);
            }}
          >
            AI Mode
          </button>
          <button
            className={`xy-theme__button ${isEditMode ? "active" : ""}`}
            onClick={() => setIsEditMode(true)}
          >
            Edit Mode
          </button>
        </div>
      </Panel>
      {isEditMode && createWindow && (
        <CreateNode
          nextId={nextId}
          setNextId={setNextId}
          pos={createWindowPos}
          closeWindow={() => {
            setCreateWindow(false);
          }}
        />
      )}
      {isEditMode && editingNode && (
        <EditTable
          node={editingNode}
          setEditing={setEditingNode}
          handleUpdataData={handleUpdateNode}
        />
      )}
      {!isEditMode && <AIBox nodes={nodes} edges={edges} />}
      <FormatGraph
        nodes={nodes}
        edges={edges}
        setNodes={setNodes}
        setEdges={setEdges}
      />
      <Background />
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
}
