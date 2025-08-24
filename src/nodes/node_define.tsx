import type { NodeTypes } from '@xyflow/react';
import { FlowNode } from './flow_node.tsx';

export const nodeTypes = {
    'flow-node': FlowNode,
} satisfies NodeTypes;

type FlowNodeStyle = Record<string, string>
// 所有的节点类型
export const flowNodeType = ["choice", "case", "content", "else", "if", "ifstmt", "event"];
// 只有一条输出边的节点
export const onlyOuputType = ["case", "content", "else", "ifstmt", "event"]
// 可编辑节点
export const editableNode = ["content", "if", "event", "case"]

export function getNodeType(id: string) {
    for (const type of flowNodeType) {
        if (id.startsWith(`${type}-`)) {
            return type;
        }
    }
    throw (`未知类型${id}`)
}

export function isOnlyOuputType(id: string) {
    return onlyOuputType.includes(getNodeType(id))
}

export function isEditableNode(id: string) {
    return editableNode.includes(getNodeType(id))
}

export const styleMap: Record<string, FlowNodeStyle> = {
    choice: {
        background: '#B2C9B2',
        display: 'flex',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '5px',
        paddingBottom: '5px',
        borderRadius: '10px',
        justifyContent: 'space-around'
    },
    case: {
        background: '#70C870',
        display: 'flex',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '5px',
        paddingBottom: '5px',
        borderRadius: '10px',
        justifyContent: 'space-around',
        maxWidth: '40ch',
    },
    content: {
        background: '#B0D8E8',
        display: 'flex',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '5px',
        paddingBottom: '5px',
        borderRadius: '10px',
        justifyContent: 'space-around',
        maxWidth: '40ch',
    },
    else: {
        background: '#3CB371',
        display: 'flex',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '5px',
        paddingBottom: '5px',
        borderRadius: '10px',
        justifyContent: 'space-around'
    },
    if: {
        background: '#3CB371',
        display: 'flex',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '5px',
        paddingBottom: '5px',
        borderRadius: '10px',
        justifyContent: 'space-around'
    },
    ifstmt: {
        background: '#3CB371',
        display: 'flex',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '5px',
        paddingBottom: '5px',
        borderRadius: '10px',
        justifyContent: 'space-around'
    },
    event: {
        background: '#B34B43',
        display: 'flex',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '5px',
        paddingBottom: '5px',
        borderRadius: '10px',
        justifyContent: 'space-around'
    }
};