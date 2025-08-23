import { Connection, Edge } from "@xyflow/react";

const validMap: Record<string, string[]> = {
    event: ["content", "choice", "if"],
    choice: ["case"],
    if: ["ifstmt", "else"],
    ifstmt: ["content", "choice", "if"],
    else: ["content", "choice", "if"],
    content: ["-", 'case'],
    case: ["event"],
}

export function IsValidFlowConnection(connection: Connection | Edge): boolean {
    for (const [key, values] of Object.entries(validMap)) {
        if (connection.source.startsWith(`${key}-`)) {
            // * 表示所有节点都可以连接
            if (values.length == 1 && values[0] == "*") {
                return true;
            }

            // 黑名单模式
            if (values.length > 0 && values[0] == "-") {
                for (const value of values) {
                    if (connection.target.startsWith(`${value}-`)) {
                        return false;
                    }
                }
                return true;
            }

            // 白名单模式
            for (const value of values) {
                if (connection.target.startsWith(`${value}-`)) {
                    return true;
                }
            }
            return false;
        }
    }
    return false;
}