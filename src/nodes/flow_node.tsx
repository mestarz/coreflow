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
    data: { label: string, vertical: boolean };
    id: string;
}) {
    return (
        <div className="node"
            style={getNodeStyle(id)}>
            <Handle type="target" position={data.vertical ? Position.Top : Position.Left} />
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
            <Handle type="source" position={data.vertical ? Position.Bottom : Position.Right} />
        </div>
    );
}
