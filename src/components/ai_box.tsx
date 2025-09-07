import { FlowNodeType } from "../nodes/node_define";
import { sendGraph } from "../api/init";

interface Graph {
  nodes: FlowNodeType[];
  edges: any[];
}

export function AIBox({ nodes, edges }: Graph) {
  return (
    <div
      style={{
        position: "fixed", // 固定在视口，不随滚动条滚动
        top: "300px", // 距离顶部 20px，可改为 0
        right: "200px", // 距离右边 20px，可改为 0
        zIndex: 9999, // 保证在最上层
        background: "white", // 避免透明看不清
        padding: "8px 12px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        maxWidth: "100px",
      }}
    >
      <button
        onClick={() => {
          sendGraph({ nodes, edges });
        }}
        style={{
          padding: "8px 16px",
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        同步数据
      </button>
    </div>
  );
}
