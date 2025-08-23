import { Handle, Position } from '@xyflow/react'
import { styleMap } from './node_define';
import { flowNodeType } from './node_define';


function getNodeStyle(id: string) {
    for (const type of flowNodeType) {
        if (id.startsWith(`${type}-`)) {
            return styleMap[type];
        }
    }
    throw (`未知类型${id}`)
}

export function FlowNode({
    data,
    id,
}: {
    data: { label: string };
    id: string;
}) {
    return (
        // We add this class to use the same styles as React Flow's default nodes.
        <div className="node"
            style={getNodeStyle(id)}>
            <Handle type="target" position={Position.Top} />
            <div
                style={{
                    padding: '8px',
                    cursor: 'pointer',
                    userSelect: 'none',
                    fontSize: 20,
                }}
            >
                {data.label}
            </div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}
