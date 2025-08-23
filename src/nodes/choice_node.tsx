import { Handle, Position } from '@xyflow/react'

export function ChoiceNode({
  data,
  id,
}: {
  data: { label: string };
  id: string;
}) {

  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <div className="node"
      style={{
        background: '#B2C9B2',
        display: 'flex',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '5px',
        paddingBottom: '5px',
        borderRadius: '10px',
        justifyContent: 'space-around'
      }}>
      <Handle type="target" position={Position.Top} />
      <div
        style={{
          padding: '8px',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        {data.label}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );

}
