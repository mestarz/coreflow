import { FlowNodeType } from "../nodes/node_define";

interface Graph {
  nodes: FlowNodeType[];
  edges: any[];
}

export async function sendGraph({ nodes, edges }: Graph) {
  const data = { nodes, edges };
  try {
    const res = await fetch("http://localhost:8080/api/init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`初始化Graph失败: ${res.status}`);
    }
  } catch (err) {
    console.error(err);
  }
}
