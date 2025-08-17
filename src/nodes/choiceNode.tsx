import { useState } from 'react'
import { Handle, Position, useReactFlow } from '@xyflow/react'

export function ChoiceNode({
  data,
  id,
}: {
  data: { label: string };
  id: string;
}) {
  const { setNodes } = useReactFlow();
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(data.label || '');

  const handleLabelClick = () => {
    setIsEditing(true)
  };

  const handleSave = () => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              label: editedLabel
            }
          };
        }
        return node;
      })
    );
    setIsEditing(false);
  };

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
      {isEditing ? (
        <div style={{ padding: '8px' }}>
          <input
            value={editedLabel}
            onChange={(e) => setEditedLabel(e.target.value)}
            autoFocus
            style={{ marginRight: '8px' }}
          />
          <button onClick={handleSave}>保存</button>
        </div>
      ) : (
        <div
          onClick={handleLabelClick}
          style={{
            padding: '8px',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          {data.label}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );

}
