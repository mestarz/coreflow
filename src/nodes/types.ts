import { Node, BuiltInNode } from "@xyflow/react";

export type EditableNode = Node<{label: string}, 'editable-node'>;
export type AppNode = BuiltInNode | EditableNode;