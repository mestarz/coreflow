import { useCallback } from 'react';
import { Node } from '@xyflow/react';

interface ExportButtonProps {
  nodes: Node<{ label: string }>[];
  edges: any[];
}

export function ExportButton({ nodes, edges }: ExportButtonProps) {
  const exportNodes = useCallback(() => {
    const data = { nodes, edges };
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nodes-export.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [nodes]);

  return (
    <button 
      onClick={exportNodes}
      style={{ 
        padding: '8px 16px', 
        background: '#fff', 
        border: '1px solid #ddd', 
        borderRadius: '4px', 
        cursor: 'pointer',
        marginLeft: '10px'
      }}
    >
      导出图表
    </button>
  );
}
