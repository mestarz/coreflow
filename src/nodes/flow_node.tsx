import { Handle, Position } from '@xyflow/react'
import { styleMap } from './node_define';
import { getNodeType } from './node_define';

function getNodeStyle(id: string) {
    return styleMap[getNodeType(id)]
}

export function FlowNode({
    data,
    id,
}: {
    data: { label: string };
    id: string;
}) {
    return (
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
