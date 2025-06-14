import { useCallback, ChangeEvent } from 'react';
import { Node } from '@xyflow/react';

interface ImportButtonProps {
  setNodes: (nodes: Node<{ label: string }>[]) => void;
  setEdges: (edges: any[]) => void;
}

export function ImportButton({ setNodes, setEdges }: ImportButtonProps) {
  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        if (data && Array.isArray(data.nodes) && Array.isArray(data.edges)) {
          setNodes(data.nodes);
          setEdges(data.edges);
        }
      } catch (error) {
        console.error('解析JSON文件失败:', error);
        alert('导入失败: 文件格式不正确');
      }
    };
    reader.readAsText(file);
  }, [setNodes]);

  return (
    <div style={{ marginLeft: '10px' }}>
      <input
        type="file"
        id="import-file"
        accept=".json"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button
        onClick={() => document.getElementById('import-file')?.click()}
        style={{
          padding: '8px 16px',
          background: '#fff',
          border: '1px solid #ddd',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
      导入图表
      </button>
    </div>
  );
}
